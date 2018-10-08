
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
    * `ScriptableArticle-1.html` : Markdown format that [LSX](https://github.com/shellyln/liyad#what-is-lsx) script expansion is enabled.
    * `Notebook-1.html` : JS Notebook markdown format.
        * LSX script expansion is enabled.
1. Preview the markdown by opening the browser.
1. Save your contents and commit to the repository.


## Playground

https://shellyln.github.io/menneu/playground.html


## Use via CDN

Replace `*.js` URLs in the `<script>` tags of `./articles/*.html` .

https://cdn.rawgit.com/shellyln/menneu-md-notebook/5c634a30/articles/js/menneu.min.js
https://cdn.rawgit.com/shellyln/menneu-md-notebook/5c634a30/articles/js/mkd%2Blsx.js
https://cdn.rawgit.com/shellyln/menneu-md-notebook/5c634a30/articles/js/mkd.js
https://cdn.rawgit.com/shellyln/menneu-md-notebook/5c634a30/articles/js/notebook.js


## Notes

* To save the repository size, move `articles/js/menneu.min.js` and `articles/js/menneu.min.js.map` outside the repository.
* You should escape some characters if script expansion is enabled.  
  See [this document](https://github.com/shellyln/menneu/#lisp-block-expansion).

----


## License
[ISC](https://github.com/shellyln/menneu-md-notebook/blob/master/LICENSE.md)  
Copyright (c) 2018, Shellyl_N and Authors.
