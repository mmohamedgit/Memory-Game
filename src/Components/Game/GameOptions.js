import { useState } from "react";
import Modal from "../Modal/Modal";
import PlayButton from "./PlayButton";

const GameOptions = (props) => {
  //pattern theme
  //difficulty

  const [patternTheme, setPatternTheme] = useState("colours");
  const [difficulty, setDifficulty] = useState(4);
  const [hideSelection, setHideSelection] = useState(false);

  // const numbers =[]

  const colours = [
    "redColour",
    "blueColour",
    "greenColour",
    "yellowColour",
    "orangeColour",
    "purpleColour",
    "magentaColour",

    "darkGrayColour",
    "cyanColour",
  ];

  const elonMusk = [
    "cowboy",
    "doctor",
    "crypto",
    "wario",
    "iceland",
    "tesla",
    "spacex",
    "neuralink",
    "roadster",
  ];

  const patternThemeHandler = (event) => {
    setPatternTheme(event.target.value);
    console.log(patternTheme);
  };

  const setDifficultyHandler = (event) => {
    setDifficulty(event.target.value);
    console.log(difficulty);
  };

  const selectedPatternHandler = (event) => {
    event.preventDefault();
    let pattern;
    let difficultyAmount = +difficulty;
    // const difficultyLevel = Math.floor(Math.random() * difficultyAmount);

    // console.log(difficultyLevel);

    switch (patternTheme) {
      case "colours":
        pattern = colours;
        break;
      case "elon-musk":
        pattern = elonMusk;
        break;

      default:
        pattern = colours;
        break;
    }

    const selectedPattern = pattern
      .map((pattern) => ({ pattern, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.pattern)
      .slice(0, difficultyAmount);
    console.log(selectedPattern);

    props.onSelectedPattern(selectedPattern);

    setHideSelection(true);
  };

  return (
    !hideSelection && (
      <Modal>
        <form onSubmit={selectedPatternHandler}>
          <div>
            <h1>Welcome to the Memory Game!</h1>
            <div>
              <label htmlFor="theme">Choose Your Theme:</label>
              <select
                value={patternTheme}
                id="theme"
                name="theme"
                onChange={patternThemeHandler}
              >
                <option value="colours">Colours</option>
                <option value="elon-musk">Elon Musk</option>
              </select>
              <div>
                <img src="" alt=""></img>
              </div>
            </div>

            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                value={difficulty}
                name="difficulty"
                id="difficulty"
                onChange={setDifficultyHandler}
              >
                <option value="2">Easy</option>
                <option value="4">Medium</option>
                <option value="9">Hard</option>
              </select>
            </div>
            <p>
              Theme: {patternTheme} Difficulty Level: {difficulty} pattern:
            </p>
            <PlayButton title="Start Game" />
          </div>
        </form>
      </Modal>
    )
  );
};
export default GameOptions;
