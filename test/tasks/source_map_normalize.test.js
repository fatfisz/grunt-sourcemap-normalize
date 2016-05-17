'use strict';

const mockery = require('mockery');
const should = require('should/as-function');
const sinon = require('sinon');


describe('Touch task registration function', () => {
  let fixMapFile;
  let registerTask;

  beforeEach(() => {
    fixMapFile = sinon.stub();

    mockery.registerMock('../fix_map_file.js', fixMapFile);

    registerTask = require('../../tmp/tasks/source_map_normalize');
  });

  afterEach(() => {
    mockery.deregisterAll();
  });

  it('should register a multi task', () => {
    const grunt = {
      registerMultiTask: sinon.spy(),
    };

    registerTask(grunt);

    should(grunt.registerMultiTask).be.calledOnce();
    should(grunt.registerMultiTask).be.calledWithExactly(
      'sourceMapNormalize',
      'Normalize source map sources',
      sinon.match.func
    );
  });

  describe('The task function', () => {
    let grunt;
    let taskFunction;
    let taskThis;

    beforeEach(() => {
      grunt = {
        registerMultiTask(name, info, task) {
          taskFunction = task;
        },
      };

      registerTask(grunt);

      taskThis = {
        filesSrc: [],
        options: sinon.stub(),
      };
    });

    it('should set proper default options', () => {
      taskFunction.call(taskThis);

      should(taskThis.options).be.calledOnce();
      should(taskThis.options).be.calledWithExactly({
        rootPath: process.cwd(),
      });
    });

    it('should call `fixMapFile` for each file src', () => {
      const fileSrc1 = Symbol();
      const fileSrc2 = Symbol();
      const fileSrc3 = Symbol();
      const options = Symbol();
      taskThis.filesSrc = [fileSrc1, fileSrc2, fileSrc3];
      taskThis.options.returns(options);

      taskFunction.call(taskThis);

      should(fixMapFile).be.calledThrice();
      should(fixMapFile).be.calledWithExactly(grunt, fileSrc1, options);
      should(fixMapFile).be.calledWithExactly(grunt, fileSrc2, options);
      should(fixMapFile).be.calledWithExactly(grunt, fileSrc3, options);
    });
  });
});
