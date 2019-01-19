
# Ménneu Markdown Notebook

#### Edit markdown locally w/o installing any apps.

Using [Ménneu](https://github.com/shellyln/menneu) document processor to render the markdowns.



## Getting started

1. Download this repository as zip archive, and extract it.
1. Initialize the git repository on the extracted folder.
    ```bash
    $ git init
    ```
1. Copy article template from `./articles/*.html` and open from the editor you like.
    * `Article-1.html` : Normal markdown format.
    * `ScriptableArticle-1.html` : Markdown format that Lisp [LSX](https://github.com/shellyln/liyad#what-is-lsx) script expansion is enabled.
    * `Notebook-1.html` : JS Notebook markdown format.
        * Lisp LSX script expansion is enabled.
1. Preview the markdown by opening the browser.
1. Save your contents and commit to the repository.


## Playground

https://shellyln.github.io/menneu/playground.html


## Use via CDN

Replace `*.js` URLs in the `<script>` tags of `./articles/*.html` .

https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/menneu.min.js  
https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/mkd+lsx.js  
https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/mkd.js  
https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/notebook.js  

* `Article-1.html`
```html
<!DOCTYPE html><head><meta charset="UTF-8"></head><body><script type="text/markdown">

# Hello!

</script>
<script src="https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/mkd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/menneu.min.js" onload="start({title: 'My Notebook 1'})"></script>
</body>
```

* `ScriptableArticle-1.html`
```html
<!DOCTYPE html><head><meta charset="UTF-8"></head><body><script type="text/markdown">

# Hello!

</script>
<script src="https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/mkd+lsx.js"></script>
<script src="https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/menneu.min.js" onload="start({title: 'My Notebook 1'})"></script>
</body>
```

* `Notebook-1.html`
```html
<!DOCTYPE html><head><meta charset="UTF-8">
<!-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.13.0"></script> -->
</head><body><script type="text/markdown">

# JS Notebook

%%%(script (@ (src "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML") (crossorigin "anonymous") (async)))
</script>
<script src="https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/notebook.js"></script>
<script src="https://cdn.jsdelivr.net/npm/menneu-md-notebook@0.0.9/articles/js/menneu.min.js" onload="start({title: 'My Notebook 1'})"></script>
</body>
```

## Notes

* To save the repository size, move `articles/js/menneu.min.js` and `articles/js/menneu.min.js.map` outside the repository.
* You should escape some characters if script expansion is enabled.  
  See [this document](https://github.com/shellyln/menneu/#lisp-block-expansion).

## Gallery

![notebook1](https://shellyln.github.io/menneu/assets/image/notebook1.png)

![notebook1](https://shellyln.github.io/menneu/assets/image/notebook2.png)

![notebook1](https://shellyln.github.io/menneu/assets/image/notebook3.png)

![notebook1](https://shellyln.github.io/menneu/assets/image/notebook4.png)

----


## License
[ISC](https://github.com/shellyln/menneu-md-notebook/blob/master/LICENSE.md)  
Copyright (c) 2018, Shellyl_N and Authors.
