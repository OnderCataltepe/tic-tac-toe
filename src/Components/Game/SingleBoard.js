import styles from "./SingleBoard.module.css";
//Components
import WinnerModal from "../Modals/WinnerModal";
//Hooks
import { useEffect, useState, useRef } from "react";
//Lottie animations
import Lottie from "lottie-react";
import drawO from "../../assets/circleBlack.json";
import drawX from "../../assets/drawX.json";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../redux/GameSlice";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const SingleBoard = () => {
  const { tie, isO, winner, winningCells, initialCells, difficulty } =
    useSelector((state) => state.gameReducer);
  const [cells, setCells] = useState([...initialCells]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [seeCells, setSeeCells] = useState([]);
  const timeRef = useRef();
  const dispatch = useDispatch();

  //Checks for a winning move for both sides. If it does, it plays that move.
  const winOrDefenceMove = (array) => {
    for (let i = 0; i < winningCells.length; i++) {
      if (
        array[winningCells[i][0] - 1].isX === "" &&
        array[winningCells[i][1] - 1].isX === true &&
        array[winningCells[i][2] - 1].isX === true
      ) {
        return winningCells[i][0];
      } else if (
        array[winningCells[i][0] - 1].isX === true &&
        array[winningCells[i][1] - 1].isX === "" &&
        array[winningCells[i][2] - 1].isX === true
      ) {
        return winningCells[i][1];
      } else if (
        array[winningCells[i][0] - 1].isX === true &&
        array[winningCells[i][1] - 1].isX === true &&
        array[winningCells[i][2] - 1].isX === ""
      ) {
        return winningCells[i][2];
      }
    }
    for (let i = 0; i < winningCells.length; i++) {
      if (
        array[winningCells[i][0] - 1].isX === "" &&
        array[winningCells[i][1] - 1].isX === false &&
        array[winningCells[i][2] - 1].isX === false
      ) {
        return winningCells[i][0];
      } else if (
        array[winningCells[i][0] - 1].isX === false &&
        array[winningCells[i][1] - 1].isX === "" &&
        array[winningCells[i][2] - 1].isX === false
      ) {
        return winningCells[i][1];
      } else if (
        array[winningCells[i][0] - 1].isX === false &&
        array[winningCells[i][1] - 1].isX === false &&
        array[winningCells[i][2] - 1].isX === ""
      ) {
        return winningCells[i][2];
      } else if (i === 7) {
        return null;
      }
    }
  };

  //it finds random cell from empty cells.
  const randomFunction = () => {
    let random = Math.floor(Math.random() * 9 + 1);
    for (let i = 0; i < 10; i++) {
      if (!selectedCells.includes((random % 9) + 1)) {
        return (random % 9) + 1;
      } else {
        random++;
      }
    }
  };

  // if two of the winning trio are empty and the other is on the opponent side, seeMove throws the two empty ones into the seeCells.
  const seeMove = () => {
    for (let i = 0; i < winningCells.length; i++) {
      if (
        cells[winningCells[i][0] - 1].isX === "" &&
        cells[winningCells[i][1] - 1].isX === "" &&
        cells[winningCells[i][2] - 1].isX === false
      ) {
        setSeeCells((prev) => [
          ...prev,
          winningCells[i][0],
          winningCells[i][1],
        ]);
      } else if (
        cells[winningCells[i][0] - 1].isX === false &&
        cells[winningCells[i][1] - 1].isX === "" &&
        cells[winningCells[i][2] - 1].isX === ""
      ) {
        setSeeCells((prev) => [
          ...prev,
          winningCells[i][1],
          winningCells[i][2],
        ]);
      } else if (
        cells[winningCells[i][0] - 1].isX === "" &&
        cells[winningCells[i][1] - 1].isX === false &&
        cells[winningCells[i][2] - 1].isX === ""
      ) {
        setSeeCells((prev) => [
          ...prev,
          winningCells[i][0],
          winningCells[i][2],
        ]);
      }
    }
  };

  //If there are duplicate elements in seeCells, it finds them. If the opponent side chooses these elements, they can win in two different ways. Therefore, we should choose them first.
  const duplicateCells = () => {
    return seeCells.filter((item, index) => seeCells.indexOf(item) !== index);
  };

  //
  const impossibleMove = () => {
    if (selectedCells.length === 0) {
      return moveHandler(5);
    }
    if (selectedCells.length === 1) {
      return !selectedCells.includes(5) ? moveHandler(5) : moveHandler(1);
    }
    if (selectedCells.length === 2) {
      return moveHandler(10 - selectedCells[1]);
    }
    if (selectedCells.length === 3) {
      if (winOrDefenceMove(cells)) {
        return moveHandler(winOrDefenceMove(cells));
      } else if (
        cells[4].isX &&
        cells[1].isX === "" &&
        cells[3].isX === "" &&
        cells[5].isX === "" &&
        cells[7].isX === ""
      ) {
        return moveHandler(2);
      } else if (
        cells[4].isX &&
        !(
          cells[1].isX === "" &&
          cells[3].isX === "" &&
          cells[5].isX === "" &&
          cells[7].isX === ""
        )
      ) {
        const seeMoveArray = duplicateCells();
        if (seeMoveArray.length > 0) {
          console.log(seeMoveArray);
          return moveHandler(seeMoveArray[0]);
        } else {
          return moveHandler(3);
        }
      } else if (
        !cells[4].isX &&
        cells[1].isX === "" &&
        cells[3].isX === "" &&
        cells[5].isX === "" &&
        cells[7].isX === ""
      ) {
        return moveHandler(3);
      } else {
        return moveHandler(randomFunction());
      }
    }
    if (selectedCells.length === 4) {
      const seeMoveArray = duplicateCells();
      if (winOrDefenceMove(cells)) {
        return moveHandler(winOrDefenceMove(cells));
      } else if (seeMoveArray.length > 0) {
        return moveHandler(seeMoveArray[0]);
      } else {
        return moveHandler(randomFunction());
      }
    }
    if (selectedCells.length > 4) {
      if (winOrDefenceMove(cells)) {
        return moveHandler(winOrDefenceMove(cells));
      } else {
        return moveHandler(randomFunction());
      }
    }
  };

  const moveHandler = (item) => {
    if (!selectedCells.includes(item)) {
      setSelectedCells((prev) => [...prev, item]);
      cells.splice(item - 1, 1, { value: item, isX: !isO });
      setCells(cells);
      seeMove();
    }
  };

  const continueHandler = () => {
    dispatch(gameActions.continue());
    setCells([...initialCells]);
    setSelectedCells([]);
    setSeeCells([]);
  };

  //it checks the winner if exists
  const winnerFunction = (array) => {
    for (let i = 0; i < winningCells.length; i++) {
      if (
        array[winningCells[i][0] - 1].isX === true &&
        array[winningCells[i][1] - 1].isX === true &&
        array[winningCells[i][2] - 1].isX === true
      ) {
        dispatch(gameActions.win({ name: "secondPlayer" }));
        break;
      } else if (
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
      duplicateCells();
    }
  }, [selectedCells.length]);

  // it choose a move function according to the difficulty
  const moveOptions = (diff) => {
    switch (diff) {
      case "Easy":
        moveHandler(randomFunction());
        break;
      case "Medium":
        if (winOrDefenceMove(cells)) {
          moveHandler(winOrDefenceMove(cells));
        } else {
          moveHandler(randomFunction());
        }
        break;
      case "Impossible":
        impossibleMove();
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isO) {
      timeRef.current = setTimeout(() => {
        moveOptions(difficulty);
        setSeeCells([]);
      }, 1000);
    }
    return () => clearTimeout(timeRef.current);
  }, [isO]);

  return (
    <div className={styles.gridContainer}>
      {cells.map((item, index) => (
        <div key={index} onClick={isO ? () => moveHandler(item.value) : null}>
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

export default SingleBoard;
