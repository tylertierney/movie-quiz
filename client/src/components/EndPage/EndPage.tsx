import { FC } from "react";
import { IGame } from "../../App";
import styles from "./EndPage.module.css";

interface EndGameProps {
  game: IGame;
  resetGame: () => void;
}

const EndPage: FC<EndGameProps> = ({ game, resetGame }) => {
  const { questions } = game;

  const correctAnswers = questions.reduce((acc, { answer, userAnswer }) => {
    if (!userAnswer || !answer) return acc + 0;
    if (userAnswer.id === answer.id) {
      return acc + 1;
    }
    return acc + 0;
  }, 0);

  const score = ~~((correctAnswers / questions.length) * 100);

  let gameOverMessage = "";

  if (score > 90) {
    gameOverMessage = `Someone call MENSA, we got a genius over here!`;
  } else if (score > 80) {
    gameOverMessage = `Wowww you must be really smart!`;
  } else if (score > 70) {
    gameOverMessage = `Not bad! Someone studied.`;
  } else if (score > 60) {
    gameOverMessage = `C's get degrees!`;
  } else if (score > 40) {
    gameOverMessage = `Well, you failed, but it could be worse I guess.`;
  } else if (score > 20) {
    gameOverMessage = `You're not a complete disaster, keep going!`;
  } else if (score > 10) {
    gameOverMessage = `This is sad, maybe just give up now?`;
  } else {
    gameOverMessage = `A truly pathetic display.`;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{score}%</h1>
      <p className={styles.p}>{gameOverMessage}</p>
      <button className={styles.button} onClick={() => resetGame()}>
        Play Again
      </button>
    </div>
  );
};

export default EndPage;
