const fs = require('fs');

const dotEnvPath = process.env.DOT_ENV_PATH || '.env';
fs.exists(dotEnvPath, exists =>
  // eslint-disable-next-line no-console
  console.log(exists ? 'Info: Using %s' : 'Info: %s not found, using defaults', dotEnvPath));
require('dotenv').load({ path: dotEnvPath, silent: true });

module.exports = {
  appPort: process.env.APP_PORT || 8080,
  publicPath: '/assets',
};
