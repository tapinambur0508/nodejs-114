import * as Movies from './movies/movies.js';

async function main() {
  const movies = await Movies.readMovies();

  console.log(movies);
}

main().catch((error) => console.error(error));
