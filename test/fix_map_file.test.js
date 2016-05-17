'use strict';

const mockery = require('mockery');
const sinon = require('sinon');
const should = require('should/as-function');


describe('`fixMapFile` function', () => {
  let fixMapFile;
  let fixSourceMap;
  let grunt;
  let sources;

  beforeEach(() => {
    fixSourceMap = sinon.spy((sourceMap) => {
      sourceMap.sources = sources;
    });

    mockery.registerMock('./fix_source_map.js', fixSourceMap);

    fixMapFile = require('../tmp/fix_map_file');

    grunt = {
      file: {
        readJSON: sinon.stub().returns({}),
        write: sinon.spy(),
      },
    };
  });

  afterEach(() => {
    mockery.deregisterAll();
  });

  it('should export a function that accepts three arguments', () => {
    should(fixMapFile).be.a.Function();
    should(fixMapFile).have.length(3);
  });

  it('should read the contents of the JSON file at the passed file path', () => {
    const filePath = Symbol();
    const options = Symbol();

    fixMapFile(grunt, filePath, options);

    should(grunt.file.readJSON).be.calledOnce();
    should(grunt.file.readJSON).be.calledWithExactly(filePath);
  });

  it('should fix the source map using the `fixSourceMap` function', () => {
    const filePath = Symbol();
    const options = Symbol();
    const readJSONResult = {};

    grunt.file.readJSON.returns(readJSONResult);

    fixMapFile(grunt, filePath, options);

    should(fixSourceMap).be.calledOnce();
    should(fixSourceMap).be.calledWithExactly(readJSONResult, options);
  });

  it('should write the result to the file at the passed file path', () => {
    const filePath = Symbol();
    const options = Symbol();

    sources = 'new sources';
    const newFileContents = JSON.stringify({ sources });

    fixMapFile(grunt, filePath, options);

    should(grunt.file.write).be.calledOnce();
    should(grunt.file.write).be.calledWithExactly(filePath, newFileContents);
  });
});
