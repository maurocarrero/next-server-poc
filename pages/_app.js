import App from 'next/app';
import { Layout } from '../components/layout';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <header className="app-header">
          <section>
            <h4>{`Env`}</h4>
            <div>
              {`process.env.phase (BUILD): `}
              <strong>{process.env.phase}</strong>
            </div>
            <div>
              {`process.env.stage (BUILD):`}
              <strong>{process.env.stage}</strong>
            </div>
            <div>
              {`process.env.appName (BUILD): `}
              <strong>{process.env.appName}</strong>
            </div>
          </section>
          <section>
            <h4>{`Configuration`}</h4>
            <div>
              {`publicRuntimeConfig.stage (RUN) `}
              <strong>{publicRuntimeConfig.stage}</strong>
            </div>
            <div>
              {`publicRuntimeConfig.appName (RUN): `}
              <strong>{publicRuntimeConfig.appName}</strong>
            </div>
          </section>
        </header>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
