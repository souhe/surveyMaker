module.exports = {
//    entry: 'app/index.js',
//    output: {
//        path: 'dist/',
//        filename: 'bundle.js',
//    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
  }
};