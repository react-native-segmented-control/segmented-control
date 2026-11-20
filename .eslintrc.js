module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parserOptions: {
        // @react-native/babel-preset swaps Babel's parser for flow-parser,
        // whose tokens @babel/eslint-parser cannot convert. Lint with the
        // standard Flow + React presets instead of the project Babel config.
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-flow', '@babel/preset-react'],
        },
      },
    },
  ],
};
