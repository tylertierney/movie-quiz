import { FC } from "react";
import { IGame } from "../../App";
import styles from "./Stepper.module.css";

interface StepperProps {
  game: IGame;
  questionIndex: number;
}

const Stepper: FC<StepperProps> = ({ questionIndex, game }) => {
  const answers: Array<boolean | null> = game.questions.map(
    ({ userAnswer, answer }) => {
      if (!userAnswer) return null;
      if (userAnswer.id === answer.id) {
        return true;
      }
      return false;
    }
  );

  const dots = answers.map((correct, i) => {
    // if (correct === true)
    //   return <div key={i} className={`${styles.dot}  ${styles.correct}`}></div>;
    // if (correct === false)
    //   return (
    //     <div key={i} className={`${styles.dot} ${styles.incorrect}`}></div>
    //   );
    // return <div key={i} className={`${styles.dot}`}></div>;

    let className = `${styles.dot}`;
    if (questionIndex === i) {
      className += ` ${styles.current}`;
    }

    if (correct === true) {
      className += ` ${styles.correct}`;
    }

    if (correct === false) {
      className += ` ${styles.incorrect}`;
    }

    return <div key={i} className={className}></div>;
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>
        {questionIndex + 1}/{game.questions.length}
      </h3>
      <div className={styles.stepper}>{dots}</div>
    </div>
  );
};

export default Stepper;
