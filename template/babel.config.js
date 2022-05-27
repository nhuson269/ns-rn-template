module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          components: "/components",
          config: "/config",
          languages: "/languages",
          models: "/models",
          navigators: "/navigators",
          screens: "/screens",
          services: "/services",
          stores: "/stores",
          theme: "/theme",
          utils: "/utils",
        },
      },
      "react-native-reanimated/plugin",
    ],
  ],
};
