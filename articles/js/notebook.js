
let lisp = null;

const start = (async (cf, data) => {

    const env = menneu.getAppEnv();
    const dom = env.RedAgate.createElement;

    // for Notebook
    const jsModuleDict = {};
    const jsRequire = (name) => jsModuleDict[name].exports;
    if (!lisp) {
        // TODO: bug?: When calling following code twice or more,
        //             cause the error "TypeError: Cannot read property 'map' of undefined" on liyad/s-expression.ts of
        //             "macroMap: new Map<string, SxMacroInfo>(config.macros.map(x => [x.name, x] as [string, SxMacroInfo]))".
        lisp = (() => {
            let config = null;
            env.Liyad.lisp.install((cf) => {
                config = Object.assign({}, cf);
            });
            return env.Liyad.SExpression(config);
        })();
    }

    class NotebookCodeComponent extends env.RedAgate.RedAgateComponent {
        earlyConstruct() {}
        transform() {
            return dom('p', null,
                dom('p', null,
                    this.props.module ? [
                        dom('span', { style: { display: 'inline-block', width: '4em' } }, 'Module: '),
                        dom('code', null, this.props.module), dom('br')
                    ] : null,
                    dom('span', { style: { display: 'inline-block', width: '4em' } }, 'Result: '),
                    dom('code', this.error ? { style: { backgroundColor: '#FF9999' } } : null, typeof this.result === 'object' ? JSON.stringify(this.result) : String(this.result)),
                ),
                dom(env.components.Facet, { dangerouslySetInnerHTML: { __html: '\n\n```' + (this.language || '') + '\n' + this.code + '\n```\n\n' } }),
            );
        }
    }

    const buf = await menneu.render(Array.from(document.querySelectorAll('script[type="text/markdown"]'), x => x.innerHTML).join(' '), data || {}, Object.assign({
        rawInput: false,
        inputFormat: 'md',
        outputFormat: 'html',
        title: 'Notebook',
        markdownBodyStyle: 'font-family: "Yu Gothic Medium", YuGothic, meiryo, "Microsoft JhengHei", "Microsoft YaHei", "SimHei", helvetica, arial, sans-serif;',

        globals: {
            // for Demo
            '$now': () => (new Date).toLocaleDateString('en-US'),

            // for Notebook
            '$require': jsRequire,

            // for Billing
            '$to-locale-string': (...args) => args.slice(-1)[0].toLocaleString(...(args.slice(0, -1))),

            // for debug
            '$dir': (...args) => console.dir(...args),
            'qwerty': 'asdfgh',
        },

        components: {
            Greeting: (props) => `Hello, ${props.to}! ${props.children}`,

            Notebook: env.components.Facet,

            Js: class NotebookJsComponent extends NotebookCodeComponent {
                constructor(props) {
                    super(props);

                    this.language = 'javascript';

                    let c = env.RedAgate.renderAsHtml_noDefer(
                        dom(env.components.RawHtml, {}, props.children)).trim();
                    let m = c.match(/^```(?:javascript|js)\s+([^]*)\s+```$/i);
                    if (m) {
                        c = m[1].trim();
                    }
                    const s = `(function(exports, require, module, __filename, __dirname) {${c}});`;
    
                    const jsModule = { exports: {} };
                    let f = null,
                        r = null;
    
                    try {
                        // throw new Error('Execution of the content is cancelled for security reason.');
                        f = eval(s);
                        r = f(jsModule.exports, jsRequire, jsModule, '', '');
                    } catch (e) {
                        r = String(e);
                        this.error = true;
                    }
                    if (props.module && !jsModuleDict[props.module]) {
                        jsModuleDict[props.module] = jsModule;
                    }

                    this.code = c;
                    this.result = r;
                }
            },

            Lisp: class NotebookLispComponent extends NotebookCodeComponent {
                constructor(props) {
                    super(props);

                    this.language = 'lisp';

                    let c = env.RedAgate.renderAsHtml_noDefer(
                        dom(env.components.RawHtml, {}, props.children)).trim();
                    // TODO: Many markdown editors cannot hiliting 'lisp' syntax. You can type 'js' to hilight the lisp block.
                    let m = c.match(/^```(?:lisp|javascript|js)\s+([^]*)\s+```$/i);
                    if (m) {
                        c = m[1].trim();
                    }
    
                    const jsModule = { exports: {} };
                    let r = null;
    
                    try {
                        r = lisp.setGlobals({
                            '$require': jsRequire,
                            '$module': jsModule,
                            '$exports': jsModule.exports,
                        })(c);
                    } catch (e) {
                        r = String(e);
                        this.error = true;
                    }
                    if (props.module && !jsModuleDict[props.module]) {
                        jsModuleDict[props.module] = jsModule;
                    }

                    this.code = c;
                    this.result = r;
                }
            },
        },
    }, (typeof cf === 'function' ? cf(menneu.getAppEnv()) : cf) || {}));
    document.write(buf.toString());
    document.close();
});