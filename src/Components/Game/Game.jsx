import styles from "./Game.module.css";
//Components
import Board from "./Board";
import Footer from "./Footer";
import SingleBoard from "./SingleBoard";
//hooks
import { useSelector } from "react-redux";

const Game = () => {
  const { isGame, isMultiGame, isSingleGame } = useSelector(
    (state) => state.gameReducer
  );
  if (!isGame) {
    return null;
  }
  return (
    <div className={styles.gameContainer}>
      {isMultiGame && <Board />}
      {isSingleGame && <SingleBoard />}
      <Footer />
    </div>
  );
};

export default Game;
