import styles from "./WinnerModal.module.css";
import ReactDOM from "react-dom";
import CustomButton from "../Buttons/CustomButton";
import Lottie from "lottie-react";

import celeb from "../../assets/celebration.json";
import { useSelector } from "react-redux";
const WinnerModal = ({ message, onClick, picture }) => {
  const tie = useSelector((state) => state.gameReducer.tie);
  return ReactDOM.createPortal(
    <div className={styles.bgContainer}>
      <div className={styles.cardContainer}>
        <p>{message}</p>
        <div className={styles.imgDiv}>
          <img alt="a" src={picture} />
          {!tie.isTie && (
            <Lottie animationData={celeb} loop={true} autoplay={true} />
          )}
        </div>
        <div className={styles.continueButton}>
          <CustomButton onClick={onClick} value="Continue" color="blue" />
        </div>
      </div>
    </div>,
    document.body
  );
};
export default WinnerModal;
