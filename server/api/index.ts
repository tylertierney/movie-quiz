import "dotenv/config";
import express from "express";
const apiKey = process.env.API_KEY;
import { generateGame } from "./generateGame";
import cors from "cors";
import https from "http";
import fs from "fs";
import path from "path";
import util from "util";

import { Query } from "express-serve-static-core";
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export type Difficulty = "easy" | "normal" | "hard" | "impossible";
export type List = "popular-100" | "popular-250" | "popular-500";
export type Topic = "movies" | "series";

export interface GameOptions {
  difficulty: Difficulty;
  list: List;
  topic: Topic;
}

export type GameOptionsQuery = GameOptions & Query;

export interface Question {
  options: Movie[];
  answer: Movie | null;
  userAnswer: Movie | null;
}

export interface Game extends GameOptions {
  questions: Question[];
}

const convertToQueryParams = (obj: QueryParams) => {
  let result = ``;
  for (let property in obj) {
    result += `${property}=${obj[property]}&`;
  }
  return result;
};

interface QueryParams {
  [key: string]: string | number | boolean;
}

export interface Movie {
  poster_path: string;
  title: string;
  id: number;
  name?: string;
}

export interface ApiPage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const app = express();
const PORT = (process.env.PORT as number | undefined) || 8080;

app.use(
  cors({
    origin: [
      "*",
      "https://localhost:3000",
      "http://localhost:3000",
      "http://192.168.254.32:3000",
      "https://192.168.254.32:3000",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hi from home");
});

app.get("/api", (req, res) => {
  console.log("/api was hit");
  res.json("hi from /api");
});

const baseUrl = `https://api.themoviedb.org/3/discover`;

console.log(process.env.API_READ_ACCESS_TOKEN);

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
  },
};

const getTopRatedMovies = async (page: number = 1) => {
  const queryParams: QueryParams = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page,
    sort_by: "vote_average.desc",
    "vote_count.gte": 3000,
    with_original_language: "en",
    "primary_release_date.gte": "1978-01-01",
  };

  const url = `${baseUrl}/movie?${convertToQueryParams(queryParams)}`;

  const res = await fetch(url, fetchOptions);
  const data: ApiPage = await res.json();
  return data.results;
};

const getTopRatedTv = async (page = 1) => {
  const queryParams: QueryParams = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page,
    sort_by: "vote_average.desc",
    "vote_count.gte": 800,
  };

  const url = `${baseUrl}/tv?${convertToQueryParams(queryParams)}`;
  const res = await fetch(url, fetchOptions);
  const data: ApiPage = await res.json();
  return data.results.map((series) => ({
    ...series,
    title: series.name ?? "",
  })) as Movie[];
};

const shuffleArray = <T>(arr: T[]) => {
  let currentIndex = arr.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

app.get("/api/game", async (req: TypedRequestQuery<GameOptionsQuery>, res) => {
  const gameOptions = req.query;
  const { list, topic } = gameOptions;

  console.log("/api/game was hit");

  // each page from the tmdb api has 20 results
  // i.e. 5 pages = 100 movies
  let pageCount = 5;
  if (list === "popular-250") {
    pageCount = 13;
  }
  if (list === "popular-500") {
    pageCount = 25;
  }

  let results: Movie[][] = [];

  if (topic === "movies") {
    results = await Promise.all(
      new Array(pageCount)
        .fill(null)
        .map((_, page) => getTopRatedMovies(page + 1))
    );
  } else {
    results = await Promise.all(
      new Array(pageCount).fill(null).map((_, page) => getTopRatedTv(page + 1))
    );
  }

  const flatMoviesList = results.flat();
  const shuffledList = shuffleArray(flatMoviesList);

  res.send(generateGame(shuffledList.slice(0, 40), gameOptions));
});

//HTTP
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

//HTTPS

// console.log(path.join(__dirname, "cert", "key.pem"));
// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
//   } as https.ServerOptions,
//   app
// );

// sslServer.listen(PORT, () => console.log(`Secure server on port ${PORT}`));

export default app;
