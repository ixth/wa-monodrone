const path = require('path');

const srcRoot = path.resolve(__dirname, 'src');

module.exports = {
    entry: ['index'],
    output: {
        clean: true,
        filename: 'js/[name].js',
    },
    resolve: {
        modules: [srcRoot, 'node_modules'],
        extensions: ['.js', '.ts'],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /(?:(?<!\.d)\.ts|\.js)$/,
                include: srcRoot,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: srcRoot,
                loader: 'source-map-loader',
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
    },
};
