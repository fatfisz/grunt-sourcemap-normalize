'use strict';

const childProcess = require('child_process');
const fs = require('fs');

const should = require('should/as-function');


describe('Grunt task test', function () {
  this.timeout(0);

  it('should fire the grunt task and get fixed source map files', () => {
    fs.mkdirSync('tmp/exhibits');

    fs.writeFileSync(
      'tmp/exhibits/a.map',
      JSON.stringify({ sources: [] })
    );

    fs.writeFileSync(
      'tmp/exhibits/b.map',
      JSON.stringify({ sources: ['some\\path'] })
    );

    if (process.argv.indexOf('--verbose') === -1) {
      childProcess.execSync('grunt sourceMapNormalize');
    } else {
      childProcess.execSync('grunt sourceMapNormalize --stack', { stdio: 'inherit' });
    }

    should(fs.readFileSync('tmp/exhibits/a.map', 'utf8'))
      .be.equal(JSON.stringify({ sources: [] }));

    should(fs.readFileSync('tmp/exhibits/b.map', 'utf8'))
      .be.equal(JSON.stringify({ sources: ['/some/path'] }));
  });
});
