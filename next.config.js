const nextConstants = require('next/constants');

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
    nextConstants,
    staticFolder: '/static',
    appName: process.env.npm_package_name
  }
});
