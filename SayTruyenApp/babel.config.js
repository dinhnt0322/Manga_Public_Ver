const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.ios.js', '.android.js', '.json'],
    alias: {
      '@src': ['./src'],
      '@Asset': ['./src/assets'],
      '@Component': ['./src/components'],
      '@Service': ['./src/service'],
      '@Config': ['./src/config'],
      '@Screen': ['./src/screens'],
      '@Redux': ['./src/redux'],
      '@ReduxSaga': ['./src/reduxSaga'],
      '@Helper': ['./src/helpers'],
      '@Constants': ['./src/constants'],
      '@Themes': ['./src/themes'],
      '@Graphql': ['./src/graphql'],
      '@Common': ['./src/common'],
      '@Skin': ['./src/skins'],
    },
  },
];

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [MODULE_RESOLVER],
  };
};
