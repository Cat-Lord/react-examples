const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env) => {

  let analyzerModeValue;
  if (env.debug == null)
    analyzerModeValue = "disabled";
  else
    analyzerModeValue = "server";

  return {
    mode: 'development',

    // devtools are used to create mapping which helps with tracking the bundle to original 
    // source code so we dont get errors like 'error X in app.bungle.js on line 15125' but
    // rather 'error in Comment.tsx on line 25'
    devtool: 'cheap-module-source-map',

    devServer: {
      port: 3001,
      client: { overlay: true },
      historyApiFallback: true,   // handle deep links with react router
      hot: true                   // hot module replacement. Depends on HotModuleReplacementPlugin
    },

    plugins: [
      new WebpackBundleAnalyzer({

        // pass in 'debug' environment variable to open bundle analysis
        // only if the debug value is present
        analyzerMode: analyzerModeValue
      }),

      // create a environment variable accessible from code
      // new webpack.DefinePlugin({
      //   'process.env.name': JSON.stringify('Kittie')
      // }),

      new ReactRefreshPlugin()
    ]
  };
};