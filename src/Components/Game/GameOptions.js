import { useState } from "react";
import Modal from "../Modal/Modal";
import PlayButton from "./PlayButton";
import classes from "./GameOptions.module.css";

const GameOptions = (props) => {
  const { gameOver } = props;

  const [patternTheme, setPatternTheme] = useState("colours");
  const [difficulty, setDifficulty] = useState(4);
  const [hideSelection, setHideSelection] = useState(false);

  // const numbers =[]

  let buttonLabel;

  gameOver ? (buttonLabel = "Restart") : (buttonLabel = "Start");

  const colours = {
    theme: "colours",
    patternItems: [
      "redColour",
      "blueColour",
      "greenColour",
      "yellowColour",
      "orangeColour",
      "purpleColour",
      "magentaColour",
      "darkGrayColour",
      "cyanColour",
    ],
    gameOverImages: ["x-mark"],
  };

  const elonMusk = {
    theme: "elon-musk",
    patternItems: [
      "cowboy",
      "cowboy2",
      "doctor",
      "crypto",
      "wario",
      "iceland",
      "tesla",
      "spacex",
      "neuralink",
      "roadster",
      "doubleok",
      "smoking",
      "smoking2",
      "cool",
      "twitter",
    ],
    gameOverImages: ["protestor"],
  };

  const theOffice = {
    theme: "the-office",
    patternItems: [
      "jim",
      "michael",
      "michael-boss",
      "dwight",
      "dwight2",
      "dwight-overjoyed",
      "dwight-neckthing",
      "stanley",
      "stanley-curious",
      "stanley-himself",
      "stanley-crossedarms",
      "pam",
      "andy",
      "angela",
      "kelly",
      "ryan",
      "toby",
      "kevin",
      "kevin2",
      "creed",
    ],
    gameOverImages: [
      "scott-no",
      "scott-disappointed",
      "scott-holdingback",
      "scott-dislike",
    ],
  };

  const patternThemeHandler = (event) => {
    setPatternTheme(event.target.value);
  };

  const setDifficultyHandler = (event) => {
    setDifficulty(event.target.value);
  };

  const selectedPatternHandler = (event) => {
    event.preventDefault();
    let pattern;
    let theme;
    let difficultyAmount = +difficulty;

    switch (patternTheme) {
      case "colours":
        pattern = colours;
        theme = "Colour";
        break;
      case "elon-musk":
        pattern = elonMusk;
        theme = "Elon Musk";
        break;

      case "the-office":
        pattern = theOffice;
        theme = "The Office";
        break;

      default:
        pattern = colours;
        theme = "Colour";
        break;
    }

    const selectedPattern = pattern.patternItems
      .map((pattern) => ({ pattern, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.pattern)
      .slice(0, difficultyAmount);

    // const selectedTheme = pattern.theme;
    const gameOverImages = pattern.gameOverImages;

    props.onSelectedPattern(selectedPattern, gameOverImages, theme);

    console.log(selectedPattern);

    setHideSelection(true);
  };

  return (
    !hideSelection && (
      <Modal>
        <form onSubmit={selectedPatternHandler}>
          <div className={classes["menu"]}>
            {!gameOver && <h1>Memory Pattern Game</h1>}
            <h2>Choose your Settings</h2>
            <div className={classes["select-options"]}>
              <label htmlFor="theme">Pattern Theme:</label>
              <select
                name="pattern-theme"
                value={patternTheme}
                id={patternTheme}
                onChange={patternThemeHandler}
              >
                <option value="colours">Colours</option>
                <option value="elon-musk">Elon Musk</option>
                <option value="the-office">The Office</option>
              </select>
              <div className={`${classes.preview} ${classes[patternTheme]}`}>
                <img
                  src={require(`../../assets/images/${patternTheme}/preview.gif`)}
                  alt="pattern"
                ></img>
              </div>
              <label htmlFor="difficulty">Pattern Difficulty:</label>
              <select
                name="difficulty"
                value={difficulty}
                id={difficulty}
                onChange={setDifficultyHandler}
              >
                <option value="2">Easy</option>
                <option value="4">Medium</option>
                <option value="9">Hard</option>
              </select>
            </div>
            <PlayButton buttonLabel={buttonLabel} />
          </div>
        </form>
      </Modal>
    )
  );
};
export default GameOptions;
