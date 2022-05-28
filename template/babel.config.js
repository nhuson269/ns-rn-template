module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {
      plugins: ["transform-remove-console"], //removing consoles.log from app during release (production) versions
    },
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".ios.js", ".android.js"],
        alias: {
          components: "./src/components",
          config: "./src/config",
          hooks: "./src/hooks",
          languages: "./src/languages",
          models: "./src/models",
          navigators: "./src/navigators",
          screens: "./src/screens",
          services: "./src/services",
          stores: "./src/stores",
          theme: "./src/theme",
          utils: "./src/utils",
        },
      },
      "react-native-reanimated/plugin",
    ],
  ],
};
