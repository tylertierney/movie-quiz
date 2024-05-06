import { useEffect, useState } from "react";
import "./App.css";
const baseUrl = "http://localhost:8080";

interface Question {
  options: Movie[];
  answer: Movie | null;
}

interface Game {
  questions: Question[];
}

const generateGame = (movies: Movie[]): Game => {
  return {
    questions: Array(10)
      .fill(null)
      .map((): Question => {
        return {
          options: [],
          answer: null,
        };
      }),
  };
};

interface Movie {
  poster_path: string;
  title: string;
  id: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [game, setGame] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/movies`)
      .then((res) => res.json())
      .then((data: { results: Movie[] }) => {
        setMovies(data.results);
      });
  }, []);

  console.log(movies);

  return (
    <>
      {movies.map((movie) => {
        return (
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            width={300}
            height={430}
          ></img>
        );
      })}
      <pre>{JSON.stringify(movies)}</pre>
    </>
  );
}

export default App;
