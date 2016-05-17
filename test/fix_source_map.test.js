'use strict';

const mockery = require('mockery');
const should = require('should/as-function');
const sinon = require('sinon');


describe('`fixSourceMap` function', () => {
  let fixSourceMap;
  let getFixedPath;

  beforeEach(() => {
    getFixedPath = sinon.stub();

    mockery.registerMock('./get_fixed_path.js', getFixedPath);

    fixSourceMap = require('../tmp/fix_source_map');
  });

  afterEach(() => {
    mockery.deregisterAll();
  });

  it('should export a function that accepts two arguments', () => {
    should(fixSourceMap).be.a.Function();
    should(fixSourceMap).have.length(2);
  });

  it('should map `sourceMap.sources` using the passed root path', () => {
    const source1 = Symbol();
    const source2 = Symbol();
    const source3 = Symbol();
    const sourceMap = {
      sources: [source1, source2, source3],
    };
    const rootPath = Symbol();
    const options = { rootPath };
    const result1 = Symbol();
    const result2 = Symbol();
    const result3 = Symbol();

    getFixedPath
      .withArgs(rootPath, source1).returns(result1)
      .withArgs(rootPath, source2).returns(result2)
      .withArgs(rootPath, source3).returns(result3);

    fixSourceMap(sourceMap, options);

    should(sourceMap.sources).be.eql([result1, result2, result3]);
  });
});
