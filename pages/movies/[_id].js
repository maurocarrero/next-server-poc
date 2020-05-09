import { useRouter } from 'next/router';
import { object } from 'prop-types';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';

const __getMovieFetcher = (_id) => async () => {
  console.log('Fetching movie...');
  const { data } = await axios.get(`http://localhost:3000/api/movies/${_id}`);
  return data;
};

function DetailPage({ movie }) {
  const router = useRouter();
  const { _id } = router.query;

  const { data: movieDetails, error, mutate } = useSWR(
    !movie ? `/api/movies` : null,
    __getMovieFetcher(_id),
    {
      initialData: movie,
      revalidateOnFocus: false
    }
  );

  const { cast = [], directors, plot, title = 'Loading...', poster } =
    movieDetails || {};

  useEffect(() => {
    if (movieDetails && _id !== movieDetails._id) {
      mutate(null);
    }
  }, [_id]);

  const isLoading = !movieDetails;

  return (
    <section className="container">
      <header>
        <h1>{title}</h1>
      </header>
      {error && (
        <p>
          {`An error occurred: `}
          {error}
        </p>
      )}
      <section className="row">
        <div className="col">
          <img src={poster} />
        </div>
        <div className="col">
          {isLoading ? (
            <div className="loader blasting-ripple" />
          ) : (
            <dl>
              <dt>{`Plot`}</dt>
              <dd>{plot}</dd>

              {directors.length && (
                <>
                  <dt>{`Directors`}</dt>
                  <dd>
                    {directors.reduce(
                      (sentence, a) =>
                        sentence.concat(!sentence.length ? a : `, ${a}`),
                      ''
                    )}
                  </dd>
                </>
              )}

              {cast.length && (
                <>
                  <dt>{`Cast`}</dt>
                  <dd>
                    {cast.reduce(
                      (sentence, a) =>
                        sentence.concat(!sentence.length ? a : `, ${a}`),
                      ''
                    )}
                  </dd>
                </>
              )}
            </dl>
          )}
        </div>
      </section>
      <footer>
        <Link href="/">
          <a>{`Movies`}</a>
        </Link>
      </footer>
    </section>
  );
}

DetailPage.getInitialProps = async (ctx) => {
  console.log('DetailPage.getInitialProps');
  let movie = null;
  if (ctx.req) {
    const {
      query: { _id }
    } = ctx;
    if (_id) {
      movie = await __getMovieFetcher(ctx.query._id)();
    }
  }
  return {
    movie
  };
};

DetailPage.propTypes = {
  movie: object
};

DetailPage.defaultProps = {
  movie: {}
};

export default DetailPage;
