import lottie from "lottie-web";
import home_animation from "../../assets/home.json";
import { useRef, useEffect } from "react";
import styles from "./HomePage.module.css";
import Button from "../Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../redux/GameSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.gameReducer.option.home);
  const animRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: home_animation,
    });
    return () => lottie.destroy();
  }, [home]);

  const onePlayerForm = () => {
    dispatch(gameActions.option({ type: "single" }));
  };

  const twoPlayerForm = () => {
    dispatch(gameActions.option({ type: "multiplayer" }));
  };
  if (!home) {
    return null;
  }
  return (
    <>
      <div className={styles.animationDiv} ref={animRef}></div>
      <div className={styles.buttonDiv}>
        <Button onClick={onePlayerForm} value="1 Player" />
        <Button onClick={twoPlayerForm} value="2 Players" />
      </div>
    </>
  );
};

export default HomePage;
