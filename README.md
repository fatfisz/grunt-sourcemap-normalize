# grunt-sourcemap-normalize

> Normalize source map paths for cross-platform usage

## What is this?

A Grunt task. A spiritual successor to [source-map-path-normalizer](https://github.com/fatfisz/source-map-path-normalizer) and [source-map-path-normalizify](https://github.com/fatfisz/source-map-path-normalizify).

It turns out it's 2016 and some tools still can't get the Windows paths in source maps right - the backslashes are left intact and the effect looks horrible in the DevTools.

This task is a remedy for that situation - it normalizes the paths wrt the current working directory (or some other one - it's configurable). Set up once and forget.

## Install

```shell
npm install grunt-sourcemap-normalize --save-dev
```

## Usage

```js
grunt.loadNpmTasks('grunt-sourcemap-normalize');

grunt.initConfig({
  sourceMapNormalize: ['source.js.map'],
});
```

## Options

The following option is supported:

### rootPath
Type: `String`
Default value: `process.cwd()`

By default the paths are normalized wrt the current working directory.
Setting this option changes that.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2016 Rafał Ruciński. Licensed under the MIT license.
