import styles from "./Warning.module.css";
import ReactDOM from "react-dom";
import CustomButton from "../Buttons/CustomButton";
import { gameActions } from "../../redux/GameSlice";
import { useDispatch } from "react-redux";
const WarningModal = ({ message, type, confirm }) => {
  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <div className={styles.bgContainer}>
      <div className={styles.cardContainer}>
        <p>{message}</p>
        <div className={styles.confirmButtons}>
          <CustomButton onClick={confirm} value="Yes" color="green" />
          <CustomButton
            onClick={() => dispatch(gameActions.cancel(type))}
            value="Cancel"
            color="red"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
export default WarningModal;
