const next = require('next');
const getConfig = require('next/config').default;

const bootServer = require('./express-server');
const dataSource = require('./data-source');

const { serverRuntimeConfig: { NODE_ENV, PORT } = {} } = getConfig() || {};
const dev = NODE_ENV !== 'production';

const nextJSApp = next({ dev });
const handle = nextJSApp.getRequestHandler();

(async () => {
  try {
    await nextJSApp.prepare();
    await dataSource.connect();

    const expressServer = await bootServer();

    expressServer.all('*', (req, res) => handle(req, res));

    expressServer.listen(PORT || 3000, () => {
      console.log(`Server listening on http://localhost:${PORT || 3000}`);
    });
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
})();
