const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const dotEnvResult = require('dotenv-safe').config({
  allowEmptyValues: true
});

if (dotEnvResult.error) {
  console.warn('[DOTENV] an error occurred:', dotEnvResult.error.message);
}

/* https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63 */
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /* Configuration options only for development */
    return {
      env: {
        phase,
        /* 
        Next.js will replace process.env.stage that will be available at runtime
        with the value of the actual process.env.stage at build time.
        */
        stage: process.env.stage,
        appName: process.env.npm_package_name
      },
      /* Runtime configuration server side */
      serverRuntimeConfig: dotEnvResult.required,
      /* Runtime configuration both server and client */
      publicRuntimeConfig: {
        staticFolder: '/static',
        appName: process.env.npm_package_name,
        stage: process.env.stage
      }
    };
  }

  /* Configuration options for all phases except development, which is defined above */
  return {
    env: {
      phase,
      stage: process.env.stage,
      appName: process.env.package_name
    },
    serverRuntimeConfig: dotEnvResult.required,
    publicRuntimeConfig: {
      staticFolder: '/static',
      appName: process.env.npm_package_name,
      stage: process.env.stage
    }
  };
};
