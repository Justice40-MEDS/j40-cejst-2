module.exports = {
  presets: [
    'babel-preset-gatsby',
    ['@babel/preset-env', {
      targets: {
        node: '14',
      },
    }],
  ],
  plugins: [
    '@babel/plugin-transform-logical-assignment-operators',
    ['@babel/plugin-proposal-private-methods', {loose: true}],
  ],
};
