const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, './src/index.tsx'),
  output: { 
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  // handles also the <script ... /> tags inside the `index.html`
  plugins: [ new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./src/index.html")
  }) ]
}