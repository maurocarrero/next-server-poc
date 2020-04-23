const dotEnvResult = require('dotenv-safe').config({
  allowEmptyValues: true
});

if (dotEnvResult.error) {
  console.warn('[DOTENV] an error occurred:', dotEnvResult.error.message);
}

const serverRuntimeConfig = dotEnvResult.required;

console.log('serverRuntimeConfig', serverRuntimeConfig);

module.exports = {
  serverRuntimeConfig
};
