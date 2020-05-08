import App from 'next/app';
import { Layout } from '../components/layout';
import Link from 'next/link';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <header className="app-header">
          <ul>
            <li>
              <Link href="/">{`Movies`}</Link>
            </li>
            <li>
              <Link href="/constants">{`next/constants`}</Link>
            </li>
          </ul>
        </header>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
