
const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const createConfig = ({ name, entry, outputPath }) => ({
	name,
	entry,
	context: resolve('src'),
	output: {
		filename: '[name].js',
		path: outputPath,
	},
	module: {
		rules: [
			{
				test: /\.jpg$/,
				include: resolve('src'),
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							publicPath: '',
							name: '[name].[ext]',

							// NOTE:
							// well, this is another bug `https://github.com/webpack-contrib/file-loader/issues/149`
							// so don't emit file here, just override the url
							emitFile: false,
						},
					},


					// NOTE: to prevent the bug above
					{
						loader: 'file-loader',
						options: {
							publicPath: '',
							name: `[path][name].[ext]`,
						},
					},
				],
			},
			{
				test: /\.html$/,
				include: resolve('src'),
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
					'extract-loader',
					'html-loader',
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(outputPath, { verbose: false }),
	],
});

module.exports = [
	createConfig({
		name: 'foo',
		entry: {
			foo: './html/foo/foo.html',
		},
		outputPath: resolve('dist', 'foo'),
	}),
	createConfig({
		name: 'bar',
		entry: {
			bar: './html/bar.html',
		},
		outputPath: resolve('dist', 'bar'),
	}),
	createConfig({
		name: 'both',
		entry: {
			foo: './html/foo/foo.html',
			bar: './html/bar.html',
		},
		outputPath: resolve('dist', 'both'),
	}),
];
