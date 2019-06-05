const dotEnvPath = process.env.DOT_ENV_PATH || '.env';
require('dotenv').config({ path: dotEnvPath, silent: true });

module.exports = {
  htmlTitle: 'react-flint',
  appPort: process.env.APP_PORT || 8080,
  publicPath: '/assets/',
};
