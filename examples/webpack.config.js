var path = require('path')
var RabbitModulesSizeAnalyzer = require('./../')

console.log(RabbitModulesSizeAnalyzer.toString())

module.exports = {
    entry: path.resolve(__dirname, '../', 'src/index.js'),
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
