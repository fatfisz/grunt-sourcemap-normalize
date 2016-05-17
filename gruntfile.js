'use strict';

const path = require('path');

const loadGruntTasks = require('load-grunt-tasks');
const rollupPluginBuble = require('rollup-plugin-buble');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');


module.exports = function register(grunt) {
  grunt.loadTasks('tasks');
  loadGruntTasks(grunt);

  const external = ['path'];
  const libFiles = grunt.file.expand('lib/**/*.js')
    .map((filePath) => path.resolve(filePath));

  grunt.initConfig({
    eslint: {
      all: ['lib', 'test'],
    },

    clean: {
      all: ['tasks', 'tmp'],
    },

    rollup: {
      options: {
        external,
        plugins: [
          rollupPluginNodeResolve({ extensions: [] }),
          rollupPluginBuble(),
        ],
        format: 'cjs',
      },
      dist: {
        files: {
          'tasks/source_map_normalize.js': 'lib/tasks/source_map_normalize.js',
        },
      },
      test: {
        options: {
          external: [].concat(external, libFiles),
        },
        files: [{
          expand: true,
          cwd: 'lib/',
          src: '**/*.js',
          dest: 'tmp/',
        }],
      },
    },

    mochaTest: {
      test: {
        options: {
          timeout: 500,
        },
        src: [
          'test/boot.js',
          'test/**/*.test.js',
        ],
      },
    },

    sourceMapNormalize: {
      all: 'tmp/exhibits/*.map',
    },
  });

  grunt.registerTask('prepublish', ['eslint', 'clean', 'rollup:dist']);
  grunt.registerTask('test', ['prepublish', 'rollup:test', 'mochaTest']);

  grunt.registerTask('default', ['test']);
};
