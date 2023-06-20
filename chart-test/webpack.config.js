/* eslint-disable */
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var pckg = require('./package.json');

module.exports = (env, argv) => {
	// настройка объекта config приложения
	let goal = env.goal;
	let isDev = argv.mode === "development";
	let config = {
		isDev,
		buildMode: goal === "local" ? "" : goal,
		packageVersion: pckg.version,
		packageName: pckg.name,
		localStoragePrefix: "AdminAev",

		apiUrl: "/api/v1/security",

		baseNameDev: "/",
		apiUrlDev: "/api/v1/security",
	};
	const capitalize = (s) => {
		if (typeof s !== "string") return "";
		return s.charAt(0).toUpperCase() + s.slice(1);
	};
	let baseName = isDev ? "" : config["baseName" + capitalize(goal)];
	let filename = isDev ? "index_bundle.js" : "[name].[contenthash].js";
	let publicPath =  isDev ? "/" : baseName + "/";

	// остальные настройки
	return {
		devtool: "source-map",
		entry: "./src/index.jsx",
		output: {
			path: path.join(__dirname, "/public/build"),
			filename,
			publicPath
		},
		module: {
			rules: [
				{
					test: /\.(jsx)$/,
					include: [
						path.resolve(__dirname, "src"),
					],
					loader: "babel-loader",
					options: {
						babelrcRoots: ["."],
					},
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
					include: [
						path.resolve(__dirname, "src"),
					],
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "images/",
							},
						},
					],
				},
				{
					test: /\.scss$/,
					use: ["style-loader", "css-loader", "sass-loader"],
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "fonts/",
							},
						},
					],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
		],
		devServer: {
			historyApiFallback: true,
			proxy: {
				"/api/v1/security": "http://superset.kopr:8088",
			},
		},
		externals: {
			config: JSON.stringify(config),
		},
		resolve: {
			alias: {},
			extensions: [".js", ".jsx"],
		},
	};
};
