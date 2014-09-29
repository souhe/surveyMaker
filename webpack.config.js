module.exports = {
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    },
    devtool: "inline-source-map"
};