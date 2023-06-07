import Header from "./Components/Header/Header";
import Settings from "./Components/Game/Settings";
import MemoryGame from "./Components/Game/MemoryGame";
import GameOver from "./Components/Game/GameOver";
import Footer from "./Components/Footer/Footer";

import { useSelector } from "react-redux";

function App() {
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const hideSettings = useSelector((state) => state.settings.hideSettings);

  return (
    <>
      {!hideSettings && <Settings />}
      {hideSettings && !isGameOver && (
        <>
          <MemoryGame />
          <Footer />
        </>
      )}
      {isGameOver && hideSettings && <GameOver />}
    </>
  );
}

export default App;
