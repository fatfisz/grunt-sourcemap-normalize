'use strict';

var path = require('path');

function getFixedPath(rootPath, filePath) {
  return ("/" + (path.relative(rootPath, filePath).replace(/\\/g, '/')));
}

function fixSourceMap(sourceMap, ref) {
  sourceMap.sources =
    sourceMap.sources.map(function (source) { return getFixedPath(ref.rootPath, source); });
}

function fixMapFile(grunt, filePath, options) {
  var sourceMap = grunt.file.readJSON(filePath);

  fixSourceMap(sourceMap, options);

  grunt.file.write(filePath, JSON.stringify(sourceMap));
}

function registerTask(grunt) {
  function srcmapNormalizeTask() {
    var task = this;
    var options = task.options({
      rootPath: process.cwd(),
    });

    task.filesSrc.forEach(function (filePath) { return fixMapFile(grunt, filePath, options); });
  }

  grunt.registerMultiTask(
    'sourceMapNormalize',
    'Normalize source map sources',
    srcmapNormalizeTask
  );
}

module.exports = registerTask;