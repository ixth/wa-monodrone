const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new EnvironmentPlugin({ NODE_ENV: 'production' })
    ],
});
