import fixSourceMap from './fix_source_map.js';


export default function fixMapFile(grunt, filePath, options) {
  const sourceMap = grunt.file.readJSON(filePath);

  fixSourceMap(sourceMap, options);

  grunt.file.write(filePath, JSON.stringify(sourceMap));
}
