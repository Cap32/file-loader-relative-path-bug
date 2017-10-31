# file-loader-relative-path-bug

This repo shows some bugs in [file-loader](https://github.com/webpack-contrib/file-loader) when `useRelativePath: true`.

To run this repo, please clone this repo and run `npm install`, and then run `npm run build`.

If multi entries imported the same file (`./images/1.jpg` in this example), and if their issuer contexts are different (`./html/foo/` and `./html/` in this example), the compiled urls are wrong.


### Src

```
|-- html
|   |-- bar.html
|   `-- foo
|       `-- foo.html
`-- images
    `-- 1.jpg
```


### Build `foo.html` only

```
|-- foo.js
|-- html
|   `-- foo
|       `-- foo.html
`-- images
    `-- 1.jpg
```

`./html/foo/foo.html` content is ✅

```html
<img src="../../images/1.jpg" />
```


### Build `bar.html` only

```
|-- bar.js
|-- html
|   `-- bar.html
`-- images
    `-- 1.jpg
```

`./html/bar.html` content is ✅

```html
<img src="../images/1.jpg" />
```


### Build both `foo.html` and `bar.html`

```
|-- bar.js
|-- foo.js
|-- html
|   |-- bar.html
|   `-- foo
|       `-- foo.html
`-- images
    `-- 1.jpg
```

**Sometimes the results are:**

`./html/foo/foo.html` content is ✅

```html
<img src="../../images/1.jpg" />
```

`./html/bar.html` content is ❌

```html
<img src="../../images/1.jpg" />
```


**And sometimes are:**

`./html/foo/foo.html` content is ❌

```html
<img src="../images/1.jpg" />
```

`./html/bar.html` content is ✅

```html
<img src="../images/1.jpg" />
```


