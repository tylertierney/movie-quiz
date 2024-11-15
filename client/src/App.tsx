import { useCallback, useEffect, useState } from "react";
import StartPage from "./components/StartPage/StartPage";
import Question from "./components/Question/Question";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import EndPage from "./components/EndPage/EndPage";

const baseUrl = import.meta.env.VITE_API_URL;

const convertGameOptionsToQuery = (gameOptions: GameOptions) => {
  return Object.entries(gameOptions).reduce(
    (acc, [key, value]) => acc + `${key}=${value}&`,
    ""
  );
};

export type Difficulty = "easy" | "normal" | "hard" | "impossible";
export type List = "popular-100" | "popular-250" | "popular-500";
export type Topic = "movies" | "series";

export interface GameOptions {
  difficulty: Difficulty;
  list: List;
  topic: Topic;
}

export interface IQuestion {
  options: Movie[];
  answer: Movie;
  userAnswer: Movie | null;
}

export interface IGame extends GameOptions {
  questions: IQuestion[];
}

export interface Movie {
  poster_path: string;
  title: string;
  id: number;
}

const initialGameOptions: GameOptions = {
  difficulty: "normal",
  list: "popular-100",
  topic: "movies",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [game, setGame] = useState<IGame>({
    questions: [],
    ...initialGameOptions,
  });
  const [gameOptions, setGameOptions] =
    useState<GameOptions>(initialGameOptions);
  const [gameActive, setGameActive] = useState(false);

  const fetchGame = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${baseUrl}/game?${convertGameOptionsToQuery(gameOptions)}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error - status: ${res.status}`);
      }
      const data: IGame = await res.json();
      setGame(data);
      setQuestionIndex(0);
    } catch (err) {
      setGameActive(false);
    }

    setLoading(false);
  }, [gameOptions]);

  useEffect(() => {
    if (gameActive) {
      fetchGame();
    }
  }, [gameActive, fetchGame]);

  const questions = game.questions;

  const resetGame = () => {
    setGameActive(false);
    setGame({ ...initialGameOptions, questions: [] });
    setQuestionIndex(null);
  };

  const answerQuestion = (option: Movie, idx: number) => {
    setGame((game) => {
      return {
        ...game,
        questions: game.questions.map((question, i) => {
          if (i === idx) {
            return { ...question, userAnswer: option };
          }
          return question;
        }),
      };
    });
  };

  return (
    <>
      <Navbar questionIndex={questionIndex} resetGame={resetGame} />
      <div className={styles.page}>
        {questionIndex === null ? (
          <StartPage
            gameOptions={gameOptions}
            setGameActive={setGameActive}
            setGameOptions={setGameOptions}
            loading={loading}
          />
        ) : (
          questions.map((_, idx) => {
            return (
              <Question
                setQuestionIndex={setQuestionIndex}
                answerQuestion={answerQuestion}
                style={{ display: idx === questionIndex ? "flex" : "none" }}
                key={idx}
                game={game}
                setGame={setGame}
                questionIndex={idx}
              />
            );
          })
        )}
        {questionIndex === questions.length && (
          <EndPage resetGame={resetGame} game={game} />
        )}
      </div>
    </>
  );
}

export default App;
