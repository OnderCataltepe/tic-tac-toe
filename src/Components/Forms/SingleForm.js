import styles from "./SingleForm.module.css";
//Component
import PlayButton from "../Buttons/PlayButton";
//redux and hooks
import { gameActions } from "../../redux/GameSlice";
import { useDispatch, useSelector } from "react-redux";
//hooks
import { useState, useRef } from "react";
const SingleForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const single = useSelector((state) => state.gameReducer.option.single);
  const [inputValue, setInputValue] = useState("You");
  const [difficultyValue, setDifficultyValue] = useState("Easy");
  const difficultyHandler = (e) => {
    setDifficultyValue(e.target.value);
    console.log(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) {
      inputRef.current.focus();
    } else {
      dispatch(
        gameActions.startSingle({
          name: inputValue,
          difficulty: difficultyValue,
        })
      );
      console.log(inputValue);
      console.log(difficultyValue);
    }
  };

  if (!single) {
    return null;
  }
  return (
    <div className={styles.singleDiv}>
      <form onSubmit={submitHandler}>
        <div>
          <p>PC</p>
        </div>
        <p>VS</p>
        <div className={styles.inputDiv}>
          <label>Name</label>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength="10"
          />
        </div>
        <div className={styles.radioDiv}>
          <input
            onChange={difficultyHandler}
            label="Easy"
            type="radio"
            name="gender"
            value="Easy"
            checked={difficultyValue === "Easy"}
          />
          <input
            onChange={difficultyHandler}
            label="Medium"
            type="radio"
            name="gender"
            value="Medium"
            checked={difficultyValue === "Medium"}
          />
          <input
            onChange={difficultyHandler}
            label="Impossible"
            type="radio"
            name="gender"
            value="Impossible"
            checked={difficultyValue === "Impossible"}
          />
        </div>
        <div className={styles.playButton}>
          <PlayButton />
        </div>
      </form>
    </div>
  );
};
export default SingleForm;
