import "./App.css";
//Components
import HomePage from "./Components/Pages/HomePage";
import MultiForm from "./Components/Forms/MultiForm";
import Header from "./Components/Pages/Header";
import SingleForm from "./Components/Forms/SingleForm";
import Game from "./Components/Game/Game";
import WarningModal from "./Components/Modals/Warning";
import SidePage from "./Components/Pages/SidePage";

//Redux and hooks
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "./redux/GameSlice";

//Messages
const homeMessage = "Are you sure you want to quit game?";
const resetMessage = "Are you sure yo want to reset the score?";

function App() {
  const {
    isHomePortal,
    isResetPortal,
    firstPlayer,
    secondPlayer,
    isO,
    isGame,
  } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const confirmHandler = () => {
    dispatch(gameActions.goHome());
  };
  const resetHandler = () => {
    dispatch(gameActions.resetScore());
  };
  return (
    <div className="App">
      {isGame && <SidePage player={firstPlayer} lightOn={isO} width="12rem" />}
      <div className="container">
        <Header />
        <HomePage />
        <SingleForm />
        <MultiForm />
        <Game />
      </div>
      {isHomePortal && (
        <WarningModal
          message={homeMessage}
          type="isHomePortal"
          confirm={confirmHandler}
        />
      )}
      {isResetPortal && (
        <WarningModal
          message={resetMessage}
          type="isResetPortal"
          confirm={resetHandler}
        />
      )}
      {isGame && (
        <SidePage player={secondPlayer} lightOn={!isO} width="18rem" />
      )}
    </div>
  );
}

export default App;
