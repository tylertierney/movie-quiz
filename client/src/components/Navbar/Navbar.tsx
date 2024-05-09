import { FC } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  resetGame: () => void;
  questionIndex: number | null;
}

const Navbar: FC<NavbarProps> = ({ resetGame, questionIndex }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        {questionIndex !== null && (
          <button className={styles.backButton} onClick={() => resetGame()}>
            &lt; back
          </button>
        )}
      </div>
      <div className={styles.center}>
        <h1 className={`${styles.h1}`}>Movie Quiz</h1>
      </div>
      <div className={styles.right}></div>
    </nav>
  );
};

export default Navbar;
