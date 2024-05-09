import { FC, PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  correct: boolean | null;
  disabled?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  label,
  onClick,
  correct,
  disabled = false,
}) => {
  const getButtonClass = (correct: boolean | null): string => {
    if (correct === true) return styles.correct;
    if (correct === false) return styles.incorrect;
    return "";
  };

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${getButtonClass(correct)}`}
      disabled={disabled}
    >
      <span className={styles.label}>{label}</span>
      {children}
    </button>
  );
};

export default Button;
