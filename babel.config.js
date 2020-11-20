module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          views: './src/views',
          components: './src/components',
          utils: './src/utils',
          configs: './src/configs',
          apis: './src/apis',
          assets: './src/assets',
        },
      },
    ],
  ],

};
