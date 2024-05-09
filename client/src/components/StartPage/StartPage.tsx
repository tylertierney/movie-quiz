import { Dispatch, SetStateAction } from "react";
import { FC } from "react";
import styles from "./StartPage.module.css";
import { Difficulty, GameOptions, List, Topic } from "../../App";

interface StartPageProps {
  gameOptions: GameOptions;
  setGameOptions: Dispatch<SetStateAction<GameOptions>>;
  setGameActive: Dispatch<SetStateAction<boolean>>;
}

const StartPage: FC<StartPageProps> = ({
  gameOptions,
  setGameOptions,
  setGameActive,
}) => {
  return (
    <div className={styles.menu}>
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
        className={styles.startButton}
        onClick={() => setGameActive(true)}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
