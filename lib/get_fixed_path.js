import { relative } from 'path';


export default function getFixedPath(rootPath, filePath) {
  return `/${relative(rootPath, filePath).replace(/\\/g, '/')}`;
}
