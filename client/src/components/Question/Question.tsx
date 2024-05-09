import React, { Dispatch, SetStateAction } from "react";
import { FC } from "react";
import { Difficulty, IGame } from "../../App";
import styles from "./Question.module.css";
import { Movie } from "../../App";
import Stepper from "../Stepper/Stepper";
import Button from "../Button/Button";

interface QuestionProps {
  game: IGame;
  setGame: Dispatch<SetStateAction<IGame>>;
  questionIndex: number;
  setQuestionIndex: Dispatch<SetStateAction<number | null>>;
  style?: React.CSSProperties;
  answerQuestion: (option: Movie, idx: number) => void;
}

const Question: FC<QuestionProps> = ({
  game,
  questionIndex,
  setQuestionIndex,
  style,
  answerQuestion,
}) => {
  const { difficulty, questions } = game;
  const question = questions[questionIndex];
  const { options, answer, userAnswer } = question;

  const isButtonCorrect = (option: Movie) => {
    if (userAnswer === null) return null;
    if (option.id === answer.id) {
      return true;
    }
    if (option.id === userAnswer.id && option.id !== answer.id) {
      return false;
    }
    return null;
  };

  const triggerAnswer = (option: Movie, questionIndex: number): void => {
    answerQuestion(option, questionIndex);
    setTimeout(() => {
      setQuestionIndex((prev) => (prev === null ? -1 : prev) + 1);
    }, 2400);
  };

  const getBlur = (
    userAnswer: Movie | null,
    difficulty: Difficulty
  ): string => {
    if (userAnswer) return "blur(0px)";
    if (difficulty === "easy") return "blur(14px)";
    if (difficulty === "normal") return "blur(28px)";
    if (difficulty === "hard") return "blur(56px)";
    if (difficulty === "impossible") return "blur(70px)";
    return "blur(0px)";
  };

  return (
    <div className={styles.question} style={style}>
      <div className={styles.imgContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w300/${answer.poster_path}`}
          // className={`${styles.img} ${
          //   userAnswer === null ? styles.blurred : ""
          // }`}
          className={styles.img}
          style={{ filter: getBlur(userAnswer, difficulty) }}
        ></img>
      </div>
      <div className={styles.container}>
        <div className={styles.buttonListAndStepper}>
          <div className={styles.buttonList}>
            {options.map((option, idx) => (
              <Button
                onClick={() => triggerAnswer(option, questionIndex)}
                key={idx}
                correct={isButtonCorrect(option)}
                label={String(idx + 1)}
                disabled={Boolean(userAnswer)}
              >
                {option?.title}
              </Button>
            ))}
          </div>

          <Stepper game={game} questionIndex={questionIndex} />
        </div>
      </div>
    </div>
  );
};

export default Question;
