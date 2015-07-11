# eddywashere.com [![Build Status](http://img.shields.io/travis/eddywashere/eddywashere.com/master.svg)](https://travis-ci.org/eddywashere/eddywashere.com)

This site is built with [metalsmith](http://www.metalsmith.io/) and a little something I'm calling ironsmith that packages up common metalsmith plugins.

Features include

- simple layouts
- swig templating - includes ability to have templates in markdown (posts)
- default posts collection
- page collection
- tags - list page & individual tag pages
- posts collection in json available at `/posts/index.json`

Install dependencies

```
npm install gulp -g
npm install
```

Run local server on http://localhost:8000

```
gulp preview
```

Build files

```
gulp build
```

Deploy to github pages with

```
gulp deploy
```