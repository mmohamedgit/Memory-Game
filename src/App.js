import MemoryGame from "./Components/Game/MemoryGame";
import Footer from "./Components/Footer/Footer";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.body}>
      <MemoryGame />
      <Footer />
    </div>
  );
}

export default App;
