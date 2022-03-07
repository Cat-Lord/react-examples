const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// obtain environment variable which is 
// dev or prod in our case
module.exports = ( { environment } ) => {
  console.log(`Using ${environment} environment`);
  const currentConfig = require(`./webpack.${environment}.js`);

  const config = merge(commonConfig, currentConfig);
  return config;
}