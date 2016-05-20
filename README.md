# PostCSS Substitute Optional Required [![Build Status][ci-img]][ci] [![dependencies](https://david-dm.org/MattDiMu/postcss-substitute-optional-required.svg)] (https://david-dm.org/MattDiMu/postcss-substitute-optional-required) [![devDependencies](https://david-dm.org/MattDiMu/postcss-substitute-optional-required/dev-status.svg)](https://david-dm.org/MattDiMu/postcss-substitute-optional-required)

[PostCSS] plugin to shim the pseudo-selectors :required and :optional by using negation (:not) and therefore slightly increase their browser support.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/MattDiMu/postcss-substitute-optional-required.svg
[ci]:      https://travis-ci.org/MattDiMu/postcss-substitute-optional-required

```css
/* input */
input:required::after {
    content: '*'
}
textarea:optional::after {
    content: '(optional)';
}

/* output */
input:not(:optional),
input:required::after {
    content: '*'
}

textarea:not(:required)::after,
textarea:optional::after {
    content: '(optional)';
}
```

```css
/* input, option { method: 'shim-required' } */
:required {
    color: hotpink;
}
:optional {
    color: indianred;
}
/* output, option { method: 'shim-required' } */
:not(:optional),
:required {
    color: hotpink;
}
:optional {
    color: indianred;
}
```

```css
/* input, option { method: 'shim-optional' } */
:required {
    color: hotpink;
}
:optional {
    color: indianred;
}
/* output, option { method: 'shim-optional' } */
:required {
    color: hotpink;
}
:not(:required),
:optional {
    color: indianred;
}
```

##Options
The only available option is `method`, with the possible values `shim-all` (default), `shim-optional` and `shim-required`:


## Usage

```js
postcss([ require('postcss-substitute-optional-required') ])
```
```js
postcss([ require('postcss-substitute-optional-required') ])({ method: 'shim-required' }) //shim only the :required selector
```
See [PostCSS] docs for examples for your environment.
