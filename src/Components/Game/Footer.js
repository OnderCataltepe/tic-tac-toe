import styles from "./Footer.module.css";
import CustomButton from "../Buttons/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { gameActions } from "../../redux/GameSlice";
import { useDispatch, useSelector } from "react-redux";
const Footer = () => {
  const { firstPlayer, secondPlayer, isHome } = useSelector(
    (state) => state.gameReducer
  );
  const dispatch = useDispatch();
  const homePortalHandler = () => {
    if (!isHome) {
      dispatch(gameActions.openPortal("isHomePortal"));
    }
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.scoreDiv}>
        <p>Score:</p>
        <div className={styles.inputDiv}>
          <input value={firstPlayer.score} disabled />
          <p>:</p>
          <input value={secondPlayer.score} disabled />
        </div>
      </div>
      <div className={styles.buttonDiv}>
        <button className={styles.homeButton} onClick={homePortalHandler}>
          <FontAwesomeIcon icon={faHouseChimney} />
          <p>Home</p>
        </button>
        <CustomButton
          value="Reset"
          color="blue"
          onClick={() => dispatch(gameActions.openPortal("isResetPortal"))}
        />
      </div>
    </div>
  );
};
export default Footer;
