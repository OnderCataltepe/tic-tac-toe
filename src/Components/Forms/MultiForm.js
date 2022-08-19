import styles from "./MultiForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import PlayButton from "../Buttons/PlayButton";
import { gameActions } from "../../redux/GameSlice";
const MultiForm = () => {
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    p1: "Player 1",
    p2: "Player 2",
  });
  const multiplayer = useSelector(
    (state) => state.gameReducer.option.multiplayer
  );

  const inputHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValues.p1.trim().length > 0 && inputValues.p2.trim().length > 0) {
      dispatch(
        gameActions.startMulti({ p1: inputValues.p1, p2: inputValues.p2 })
      );
      console.log(inputValues);
    }
    if (inputValues.p1.trim().length === 0) {
      p1Ref.current.focus();
    }
    if (inputValues.p2.trim().length === 0) {
      p2Ref.current.focus();
    }
  };
  if (!multiplayer) {
    return null;
  }

  return (
    <div className={styles.multiDiv}>
      <form onSubmit={submitHandler}>
        <div className={styles.inputDiv}>
          <label>Name:</label>
          <input
            ref={p1Ref}
            name="p1"
            value={inputValues.p1}
            onChange={inputHandler}
            type="text"
            maxLength="10"
          />
        </div>
        <p>VS</p>
        <div className={styles.inputDiv}>
          <label>Name:</label>
          <input
            ref={p2Ref}
            name="p2"
            value={inputValues.p2}
            onChange={inputHandler}
            type="text"
            maxLength="10"
          />
        </div>
        <div className={styles.playButton}>
          <PlayButton />
        </div>
      </form>
    </div>
  );
};

export default MultiForm;
