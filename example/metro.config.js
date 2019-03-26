/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const reactNativeSegmentedControl = path.resolve(__dirname, '..');

module.exports = {
  watchFolders: [
    path.resolve(__dirname, 'node_modules'),
    reactNativeSegmentedControl,
  ],
  resolver: {
    blacklistRE: blacklist([
      new RegExp(`${reactNativeSegmentedControl}/node_modules/react-native/.*`),
    ]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
