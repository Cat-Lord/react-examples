const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  output: { 
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js'
  },

  // devtools are used to create mapping which helps with tracking the bundle to original 
  // source code so we dont get errors like 'error X in app.bungle.js on line 15125' but
  // rather 'error in Comment.tsx on line 25'
  devtool: 'cheap-module-source-map',

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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // '?:' means non-capturing group, so the results are not addressable with $1, $2, ...
        test: /\.(?:ico|gif|png|jpe?g)$/i,
        type: 'asset/resource'
      },
      // handling fonts and svg files
      // {
      //   test: /\.(?:woff(2)?|eof|ttf|svg|otf)$/i,
      //   type: 'asset/inline'
      // },
    ]
  },

  devServer: {                // is serving from '/public' by default
    open: true,               // open default browser when server starts
    port: 3001
  },

  // handles also the <script ... /> tags inside the `index.html`
  plugins: [ new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '..', './src/index.html')
  }) ]
}