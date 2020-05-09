import { useRouter } from 'next/router';
import axios from 'axios';
import { array } from 'prop-types';
import useSWR from 'swr';

const __fetchMovies = async () => {
  let movies = [];
  try {
    console.time('Fetching');
    const { data } = await axios.get('http://localhost:3000/api/movies');
    console.timeEnd('Fetching', data);
    movies = data;
  } catch (err) {
    console.error(err.message);
  }
  return movies;
};

function HomePage({ movies }) {
  const router = useRouter();

  const { data: allMovies = movies || [], error } = useSWR(
    !movies ? 'http://localhost:3000/api/movies' : null,
    __fetchMovies,
    {
      initialData: movies,
      revalidateOnFocus: false
    }
  );

  const navigateToDetail = (_id) => () => {
    const route = `/movies/[_id]`;
    const as = `/movies/${_id}`;
    router.push(route, as);
  };

  const isLoading = !allMovies;

  return (
    <section className="container">
      <header>
        <h1>Movies</h1>
      </header>
      {error && (
        <p>
          {`An error occurred: `}
          {error}
        </p>
      )}
      <section className="row">
        {isLoading ? (
          <div className="loader blasting-ripple" />
        ) : (
          allMovies.map(({ _id, plot, title }, idx) => (
            <article key={idx} onClick={navigateToDetail(_id)}>
              <h3>{title}</h3>
              <p>{plot}</p>
            </article>
          ))
        )}
      </section>
    </section>
  );
}

HomePage.getInitialProps = async (ctx) => {
  let movies = null;
  if (ctx.req) {
    movies = await __fetchMovies();
  }
  return {
    movies
  };
};

HomePage.propTypes = {
  movies: array
};

HomePage.defaultProps = {
  movies: []
};

export default HomePage;
