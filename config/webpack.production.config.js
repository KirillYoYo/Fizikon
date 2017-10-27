import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('config/webpack.base.config.js').merge({
    entry: ['babel-polyfill', './client/index.js'],
	output: {
		filename: 'bundle.min.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[hash:base64:10]",
							minimize: true
						}
					},
				]
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			},
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader' , "less-loader"]
            }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: true
			}
		})]
});