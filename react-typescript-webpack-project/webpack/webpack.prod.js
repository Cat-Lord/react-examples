const webpack = require('webpack');

module.exports = {
  mode: 'production',
  // devtool: 'eval-source-map',

  // optimize for production with bigger entry bundle size
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  
  // create a environment variable accessible from code
  plugins: [ 
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Cat')
    }) 
  ]
}