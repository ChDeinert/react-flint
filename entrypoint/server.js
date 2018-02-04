const express = require('express');
const fs = require('fs');
const routing = require('../src/server/routing');

const dotEnvPath = process.env.DOT_ENV_PATH || '.env';
fs.exists(dotEnvPath, exists =>
  // eslint-disable-next-line no-console
  console.log(exists ? 'Info: Using %s' : 'Info: %s not found, using defaults', dotEnvPath));
require('dotenv').load({ path: dotEnvPath, silent: true });

const app = express();

routing(app);

app.listen(process.env.APP_PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log('listening at http://localhost:%s', process.env.APP_PORT || 8080);
});
