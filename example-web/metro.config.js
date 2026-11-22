const path = require('path');
const {getDefaultConfig} = require('expo/metro-config');

const projectRoot = __dirname;
// The library itself lives at the repository root, and the app code is
// shared with ../example. Watch the root and resolve the library from it.
const repoRoot = path.resolve(projectRoot, '..');
const libraryName = require('../package.json').name;

const config = getDefaultConfig(projectRoot);

config.watchFolders = [repoRoot];
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  [libraryName]: repoRoot,
};

module.exports = config;
