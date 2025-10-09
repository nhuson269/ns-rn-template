module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      typescript: {}, // Cho ESLint hiểu alias từ tsconfig.json
    },
  },
};
