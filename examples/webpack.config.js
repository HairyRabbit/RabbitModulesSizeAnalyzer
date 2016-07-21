var path = require('path')
var RabbitModulesSizeAnalyzer = require('./').default

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
	path: __dirname,
	filename: 'index.js',
	libraryTarget: 'commonjs2'
    },
    module: {
	loaders: [
	    { test: /\.js$/, loader: 'babel' }
	]
    },
    target: 'node',
    plugins: [
	new RabbitModulesSizeAnalyzer({
	    threshold: 5000
	})
    ]
}
