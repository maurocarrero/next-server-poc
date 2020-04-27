import App from 'next/app';
import { Layout } from '../components/layout';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    console.log(
      'No serverRuntimeConfig in client: ',
      JSON.stringify(serverRuntimeConfig)
    );

    return (
      <Layout>
        <header className="app-header">
          <div>
            {`process.env.phase (BUILD): `}
            <strong>{process.env.phase}</strong>
          </div>
          <div>
            {`process.env.stage (BUILD):`}
            <strong>{process.env.stage}</strong>
          </div>
          <div>
            {`publicRuntimeConfig.stage (RUN) `}
            <strong>{publicRuntimeConfig.stage}</strong>
          </div>
          <div>
            {`process.env.appName (BUILD): `}
            <strong>{process.env.appName}</strong>
          </div>
          <div>
            {`publicRuntimeConfig.appName (RUN): `}
            <strong>{publicRuntimeConfig.appName}</strong>
          </div>
        </header>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
