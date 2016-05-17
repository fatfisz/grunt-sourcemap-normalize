'use strict';

const mockery = require('mockery');
const should = require('should/as-function');
const sinon = require('sinon');


describe('`getFixedPath` function', () => {
  let getFixedPath;
  let path;

  beforeEach(() => {
    path = {
      relative: sinon.stub().returns(''),
    };

    mockery.registerMock('path', path);

    getFixedPath = require('../tmp/get_fixed_path');
  });

  afterEach(() => {
    mockery.deregisterAll();
  });

  it('should export a function that accepts two arguments', () => {
    should(getFixedPath).be.a.Function();
    should(getFixedPath).have.length(2);
  });

  it('should call `path.relative` with appropriate arguments', () => {
    const rootPath = Symbol();
    const filePath = Symbol();

    getFixedPath(rootPath, filePath);

    should(path.relative).be.calledOnce();
    should(path.relative).be.calledWithExactly(rootPath, filePath);
  });

  it('should change backslashes to slashes and prepend a slash', () => {
    path.relative.returns('path/to\\file');

    const result = getFixedPath(Symbol(), Symbol());

    should(result).be.equal('/path/to/file');
  });
});
