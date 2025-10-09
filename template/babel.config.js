module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'], // Removing consoles.log from app during release (production) versions
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.ios.js', '.android.js'],
        alias: {
          components: '/components',
          config: './config',
          hooks: './hooks',
          languages: './languages',
          modals: './modals',
          models: './models',
          navigators: './navigators',
          features: './features',
          services: './services',
          stores: './stores',
          theme: './theme',
          utils: './utils',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
