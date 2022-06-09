const { merge } = require('webpack-merge');

// obtain environment variable which is 
// dev or prod in our case
module.exports = ( env ) => {
  console.log(`Using ${env.environment} environment`);
  const configMode = require(`./webpack.${env.environment}.js`);

  // forward environment into the configurations (dev/prod and common config)
  const currentConfig = configMode(env);
  const commonConfig = require('./webpack.common.js')(env);

  const config = merge(commonConfig, currentConfig);
  return config;
}