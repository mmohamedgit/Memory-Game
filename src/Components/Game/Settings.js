// import { useState } from "react";

import Modal from "../Modal/Modal";
import PlayButton from "./PlayButton";
import classes from "./GameOptions.module.css";
import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from "../../store/settings-slice";

const Settings = (props) => {
  const dispatch = useDispatch();
  const patternTheme = useSelector((state) => state.settings.patternTheme);
  const difficulty = useSelector((state) => state.settings.difficulty);
  const hideSettings = useSelector((state) => state.settings.hideSettings);
  console.log(patternTheme, difficulty, hideSettings);

  const { gameOver } = props;

  // const [patternTheme, setPatternTheme] = useState("colours");
  //set difficulty default to 4 tiles
  // const [difficulty, setDifficulty] = useState(4);
  // const [hideGameOptionModal, setHideGameOptionModal] = useState(false);

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
    gameOverImages: [
      "elon-disappointed",
      "elon-mad",
      "elon-really",
      "elon-what",
      "protestor",
    ],
  };

  const theOffice = {
    theme: "the-office",
    patternItems: [
      "andy",
      "angela",
      "creed",
      "dwight",
      "dwight2",
      "dwight-overjoyed",
      "dwight-neckthing",
      "jim",
      "kelly",
      "kevin",
      "kevin2",
      "michael",
      "michael-boss",
      "pam",
      "ryan",
      "toby",
      "stanley",
      "stanley-curious",
      "stanley-himself",
      "stanley-crossedarms",
    ],
    gameOverImages: [
      "dwight-pissed",
      "scott-crying",
      "scott-mad",
      "scott-nooo",
    ],
  };

  const patternThemeHandler = (event) => {
    dispatch(settingsActions.patternTheme(event.target.value));
  };

  const setDifficultyHandler = (event) => {
    dispatch(settingsActions.difficulty(event.target.value));
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

    const gameOverImages = pattern.gameOverImages;

    props.onSelectedPattern(selectedPattern, gameOverImages, theme);

    //console.log(selectedPattern);
    dispatch(settingsActions.hideSettings());
  };

  return (
    !hideSettings && (
      <Modal>
        <form onSubmit={selectedPatternHandler}>
          <div className={classes.menu}>
            {!gameOver && (
              <div className={classes.title}>
                <img
                  src={require(`../../assets/images/logo.svg`).default}
                  alt="logo"
                ></img>
                <h1>Memory Game</h1>
              </div>
            )}
            <div className={classes["select-options"]}>
              <div>
                <h2>Choose your Settings</h2>
                <div className={classes["select-theme"]}>
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
                </div>
                <div>
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
              </div>
              <div className={classes.preview}>
                <img
                  className={classes[patternTheme]}
                  src={require(`../../assets/images/${patternTheme}/preview.gif`)}
                  alt="pattern"
                ></img>
                <div className={classes.start}>
                  <PlayButton buttonLabel={buttonLabel} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    )
  );
};
export default Settings;
