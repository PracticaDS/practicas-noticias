var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/frontend/bootstrap.js',
    output: {
        path: __dirname + '/dist/frontend',
        filename: 'bundle.js'
    },

    module: {
      loaders: [
        // load and compile javascript
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },

        { test: /\.json$/, loader: "json-loader" },
        { test: /\.css$/, loader: "css-loader" },
        { test: /\.html$/, exclude: /node_modules/, loader: "raw-loader" }
      ]
    },

    // inject js reference bundle to index.html
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/frontend/index.html',
        inject: 'body',
        minify: false
      }
    )],

    devtool: '#inline-source-map'
}
