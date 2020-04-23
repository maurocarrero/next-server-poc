const dotEnvResult = require('dotenv-safe').config({
  allowEmptyValues: true
});

if (dotEnvResult.error) {
  console.warn('[DOTENV] an error occurred:', dotEnvResult.error.message);
}

module.exports = {
  serverRuntimeConfig: dotEnvResult.required
};
