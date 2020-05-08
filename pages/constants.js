import getConfig from 'next/config';

const { nextConstants } = getConfig().publicRuntimeConfig;

const Constants = () => {
  return (
    <section className="container">
      <h3>{`next/constants content`}</h3>
      <pre>{JSON.stringify(nextConstants, null, 2)}</pre>
    </section>
  );
};

export default Constants;
