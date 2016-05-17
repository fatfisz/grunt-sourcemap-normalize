import getFixedPath from './get_fixed_path.js';


export default function fixSourceMap(sourceMap, { rootPath }) {
  sourceMap.sources =
    sourceMap.sources.map((source) => getFixedPath(rootPath, source));
}
