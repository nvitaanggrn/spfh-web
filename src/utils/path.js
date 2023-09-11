const path = {};
path.trim = path => path.replace(/^\//, '').replace(/\/$/, '');
path.compose = paths => paths.map(p => path.trim(p)).filter(p => p).join('/');
path.absolute = paths => '/' + path.compose(paths);
export default path;