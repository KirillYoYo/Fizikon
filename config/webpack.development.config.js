import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('config/webpack.base.config.js').merge({
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'react-hot-loader/patch',
		__dirname + '/../client/index.js',
	],
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/../public',
		publicPath: '/'
	},
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
							localIdentName: "[local]__[hash:base64:5]",
							minimize: false
						}
					},
				]
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	devServer: {
		publicPath: "/",
		//contentBase: path.join(__dirname, "./../build"),
		hot: true,
		inline: true,
		historyApiFallback: true,
		quiet: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				// postcss: [
				// 	autoprefixer(),
				// ]
			}
		})
	]
});