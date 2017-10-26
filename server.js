import express from 'express';
import path from 'path';

const PORT = 7700;
const PUBLIC_PATH = __dirname + '/public';
const SRC_PATH = __dirname + '/client';
const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';


if (isDevelopment) {
	const webpack = require('webpack');
	const WebpackDevServer = require('webpack-dev-server')
	const webpackDevServerConfig = require('./config/wr.dev.config')
	const compiler = webpack(webpackDevServerConfig);
	const host = "localhost"
	const port = 7700;

	new WebpackDevServer(compiler, webpackDevServerConfig.devServer)
		.listen(port, host, function (err, result) {
			if (err) {
				console.log(err);
			}
			console.log(`Listening at http://${host}:${port}`);
		});
} else {
	app.use(express.static(PUBLIC_PATH));
	app.all("*", function(req, res) {
		res.sendFile(path.resolve(SRC_PATH, 'index.html'));
	});

	app.listen(PORT, function() {
		console.log('http://localhost:7700/');
	});
}
