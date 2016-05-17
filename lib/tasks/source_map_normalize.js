import fixMapFile from '../fix_map_file.js';


export default function registerTask(grunt) {
  function srcmapNormalizeTask() {
    const task = this;
    const options = task.options({
      rootPath: process.cwd(),
    });

    task.filesSrc.forEach((filePath) => fixMapFile(grunt, filePath, options));
  }

  grunt.registerMultiTask(
    'sourceMapNormalize',
    'Normalize source map sources',
    srcmapNormalizeTask
  );
}
