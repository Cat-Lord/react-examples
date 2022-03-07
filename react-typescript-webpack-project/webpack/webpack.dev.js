const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  devServer: {
    port: 3001,
    hot: true
  },

  // create a environment variable accessible from code
  plugins: [ 
    new WebpackBundleAnalyzer({
      openAnalyzer: false         // dont open it by default
    }),

    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Kittie')
    }),
    
    new ReactRefreshPlugin()
  ]
}