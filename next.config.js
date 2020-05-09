const { PHASE_PRODUCTION_SERVER } = require('next/constants');

const dotEnvResult = require('dotenv-safe').config({
  allowEmptyValues: true
});

if (dotEnvResult.error) {
  console.warn('[DOTENV] an error occurred:', dotEnvResult.error.message);
}

module.exports = (phase) => ({
  serverRuntimeConfig: dotEnvResult.required,
  publicRuntimeConfig: {
    phase,
    NODE_ENV: phase === PHASE_PRODUCTION_SERVER ? 'production' : 'development',
    staticFolder: '/static',
    appName: process.env.npm_package_name
  }
});
