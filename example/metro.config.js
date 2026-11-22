const path = require('path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');

// The library itself lives at the repository root. Resolve it from there
// (rather than through the example/node_modules symlink, which points back
// up at the root) and let Metro watch the root so edits are picked up.
const libraryRoot = path.resolve(__dirname, '..');
const libraryName = require('../package.json').name;

module.exports = makeMetroConfig({
  watchFolders: [libraryRoot],
  resolver: {
    extraNodeModules: {
      [libraryName]: libraryRoot,
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
