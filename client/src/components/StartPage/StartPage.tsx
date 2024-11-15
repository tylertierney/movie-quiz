import { Dispatch, SetStateAction } from "react";
import { FC } from "react";
import styles from "./StartPage.module.css";
import { Difficulty, GameOptions, List, Topic } from "../../App";

const loaderIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    height="100%"
    className={styles.loader}
    style={{
      strokeWidth: "30",
      stroke: "var(--text-color)",
      stopColor: "var(--text-color)",
    }}
  >
    <radialGradient
      id="a12"
      cx=".66"
      fx=".66"
      cy=".3125"
      fy=".3125"
      gradientTransform="scale(1.5)"
      style={{ stopColor: "inherit" }}
    >
      <stop offset="0" stopColor="inherit"></stop>
      <stop offset=".3" stopColor="inherit" stopOpacity=".9"></stop>
      <stop offset=".6" stopColor="inherit" stopOpacity=".6"></stop>
      <stop offset=".8" stopColor="inherit" stopOpacity=".3"></stop>
      <stop offset="1" stopColor="inherit" stopOpacity="0"></stop>
    </radialGradient>
    <circle
      transform-origin="center"
      fill="none"
      stroke="url(#a12)"
      // stroke="inherit"
      strokeWidth="inherit"
      strokeLinecap="round"
      strokeDasharray="200 1000"
      strokeDashoffset="0"
      cx="100"
      cy="100"
      r="70"
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="spline"
        dur="2"
        values="360;0"
        keyTimes="0;1"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
    <circle
      transform-origin="center"
      fill="none"
      opacity=".2"
      stroke="inherit"
      strokeWidth="inherit"
      strokeLinecap="round"
      cx="100"
      cy="100"
      r="70"
    ></circle>
  </svg>
);

interface StartPageProps {
  gameOptions: GameOptions;
  setGameOptions: Dispatch<SetStateAction<GameOptions>>;
  setGameActive: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const StartPage: FC<StartPageProps> = ({
  gameOptions,
  setGameOptions,
  setGameActive,
  loading,
}) => {
  return (
    <div className={styles.menu}>
      <h1 className={styles.h1}>Play</h1>
      <label className={styles.label}>
        Topic
        <select
          value={gameOptions.topic}
          className={styles.select}
          onChange={(e) =>
            setGameOptions((prev) => ({
              ...prev,
              topic: e.target.value as Topic,
            }))
          }
        >
          <option value="movies">Movies</option>
          <option value="series">Series</option>
        </select>
      </label>
      <label className={styles.label}>
        Difficulty
        <select
          value={gameOptions.difficulty}
          className={styles.select}
          onChange={(e) =>
            setGameOptions((prev) => ({
              ...prev,
              difficulty: e.target.value as Difficulty,
            }))
          }
        >
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
          <option value="impossible">Impossible</option>
        </select>
      </label>
      <label className={styles.label}>
        List
        <select
          value={gameOptions.list}
          className={styles.select}
          onChange={(e) =>
            setGameOptions((prev) => ({
              ...prev,
              list: e.target.value as List,
            }))
          }
        >
          <option value="popular-100">Top 100</option>
          <option value="popular-250">Top 250</option>
          <option value="popular-500">Top 500</option>
        </select>
      </label>

      <button
        disabled={loading}
        className={`${styles.startButton} ${loading ? styles.loading : ""}`}
        onClick={() => setGameActive(true)}
      >
        <span className={styles.buttonLabel}>
          Start Game
          {loaderIcon}
        </span>
      </button>
    </div>
  );
};

export default StartPage;
