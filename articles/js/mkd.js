const start = (async (cf, data) => {
    const buf = await menneu.render(Array.from(document.querySelectorAll('script[type="text/markdown"]'), x => x.innerHTML).join(' '), data || {}, Object.assign({
        rawInput: true,
        inputFormat: 'md',
        outputFormat: 'html',
        title: 'Markdown',
        markdownBodyStyle: 'font-family: "Yu Gothic Medium", YuGothic, meiryo, "Microsoft JhengHei", "Microsoft YaHei", "SimHei", helvetica, arial, sans-serif;',
    }, (typeof cf === 'function' ? cf(menneu.getAppEnv()) : cf) || {}));
    document.write(buf.toString());
    document.close();
});