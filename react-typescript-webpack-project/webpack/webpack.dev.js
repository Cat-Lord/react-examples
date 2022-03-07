const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  devServer: {
    port: 3001
  },

  // create a environment variable accessible from code
  plugins: [ 
    new WebpackBundleAnalyzer({
      openAnalyzer: false         // dont open it by default
    }),

    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Kittie')
    }) 
  ]
}