const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

  return {
    mode: 'development',

    entry: path.resolve(__dirname, '..', './src/public/index.tsx'),
    output: {
      path: path.resolve(__dirname, '..', './build'),
      filename: '[name].js'
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

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    // handles also the <script ... /> tags inside the `index.html`
    plugins: [new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/public/index.html'),
      favicon: path.resolve(__dirname, '..', './src/public/favicon.ico')
    })]
  };
};