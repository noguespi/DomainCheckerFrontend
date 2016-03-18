const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    modules: path.join(__dirname, 'node_modules'),
    app: path.join(__dirname, 'app'),
    build: path.join('/work/java/domaining/DomainChecker/src/main/resources/static')
};
process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/, // Test expects a RegExp! Note the slashes!
                loaders: ['style', 'css'],
                include: [PATHS.app, PATHS.modules] // Include accepts either a path or an array of paths.
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'], // caching improve performances
                include: PATHS.app
            }
        ]
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            proxy: {
                "/afnic*": "http://localhost:10777",
            },
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"dev"'
            })
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"prod"'
            })
        ]
    });
}
