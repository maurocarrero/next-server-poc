const axios = require('axios');
const { array } = require('prop-types');

function HomePage({ movies }) {
  return (
    <section className="container">
      <header>
        <h1>Movies</h1>
      </header>
      <section className="row">
        {movies.length &&
          movies.map(({ plot, title }, idx) => (
            <article key={idx}>
              <h3>{title}</h3>
              <p>{plot}</p>
            </article>
          ))}
      </section>
    </section>
  );
}

HomePage.getInitialProps = async () => {
  let movies = [];
  try {
    const { data } = await axios.get('http://localhost:3000/api/movies');
    movies = data;
  } catch (err) {
    console.error(err.message);
  }
  return { movies };
};

HomePage.propTypes = {
  movies: array
};

HomePage.defaultProps = {
  movies: []
};

export default HomePage;
