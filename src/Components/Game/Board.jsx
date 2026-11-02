import styles from "./Board.module.css";
//Components
import WinnerModal from "../Modals/WinnerModal";
//Hooks
import { useEffect, useState } from "react";

//Lottie and animations
import Lottie from "lottie-react";
import drawO from "../../assets/circleBlack.json";
import drawX from "../../assets/drawX.json";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../redux/GameSlice";

const Board = () => {
  const { tie, isO, winningCells, initialCells, winner } = useSelector(
    (state) => state.gameReducer
  );
  const [cells, setCells] = useState([...initialCells]);
  const [selectedCells, setSelectedCells] = useState([]);
  const dispatch = useDispatch();

  const moveHandler = (item) => {
    if (!selectedCells.includes(item.value)) {
      setSelectedCells((prev) => [...prev, item.value]);
      cells.splice(item.value - 1, 1, { value: item.value, isX: !isO });
      setCells(cells);
    }
  };
  const continueHandler = () => {
    dispatch(gameActions.continue());
    setCells([...initialCells]);
    setSelectedCells([]);
  };
  const winnerFunction = (array) => {
    for (let i = 0; i < winningCells.length; i++) {
      if (
        array[winningCells[i][0] - 1].isX === true &&
        array[winningCells[i][1] - 1].isX === true &&
        array[winningCells[i][2] - 1].isX === true
      ) {
        dispatch(gameActions.win({ name: "secondPlayer" }));
        break;
      }
      if (
        array[winningCells[i][0] - 1].isX === false &&
        array[winningCells[i][1] - 1].isX === false &&
        array[winningCells[i][2] - 1].isX === false
      ) {
        dispatch(gameActions.win({ name: "firstPlayer" }));
        break;
      } else if (i === 7 && selectedCells.length === 9) {
        dispatch(gameActions.tie({ type: true }));
        break;
      } else if (i === 7) {
        dispatch(gameActions.turn());
      }
    }
  };
  useEffect(() => {
    if (selectedCells.length > 0) {
      winnerFunction(cells);
    }
  }, [selectedCells.length]);

  return (
    <div className={styles.gridContainer}>
      {cells.map((item, index) => (
        <div key={index} onClick={() => moveHandler(item)}>
          {selectedCells.includes(item.value) &&
            cells[item.value - 1].isX === false && (
              <Lottie animationData={drawO} loop={false} autoplay={true} />
            )}
          {selectedCells.includes(item.value) &&
            cells[item.value - 1].isX === true && (
              <Lottie animationData={drawX} loop={false} autoplay={true} />
            )}
        </div>
      ))}

      {winner.isWinner && (
        <WinnerModal
          picture={winner.picture}
          message={`${winner.name} wins!`}
          onClick={continueHandler}
        />
      )}
      {tie.isTie && (
        <WinnerModal
          message="It is a Tie!"
          picture={tie.picture}
          onClick={continueHandler}
        />
      )}
    </div>
  );
};

export default Board;
