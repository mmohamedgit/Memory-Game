import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from "../../store/settings-slice";
import { gameActions } from "../../store/game-slice";

import Options from "./Options";
import PlayButton from "./PlayButton";
import Modal from "../Modal/Modal";

import classes from "./Settings.module.css";

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);
  const difficulty = useSelector((state) => state.settings.difficulty);
  const isGameOver = useSelector((state) => state.game.isGameOver);

  const themeOptions = [
    { label: "Colours", option: "colours" },
    { label: "Elon Musk", option: "elon-musk" },
    { label: "The Office", option: "the-office" },
  ];

  const difficultyOptions = [
    { label: "Easy", option: 2 }, // easy: 2 tiles; medium: 4 tiles; hard: 9 tiles
    { label: "Medium", option: 4 },
    { label: "Hard", option: 9 },
  ];

  let buttonLabel;

  isGameOver ? (buttonLabel = "Restart") : (buttonLabel = "Start");

  const patternThemeHandler = (e) => {
    dispatch(settingsActions.selectThemeToggler(e.target.value));
  };

  const setDifficultyHandler = (e) => {
    dispatch(settingsActions.selectDifficultyToggler(e.target.value));
  };

  const submitOptionsHandler = (e) => {
    e.preventDefault();
    const selectedSettings = { theme, difficulty };

    dispatch(settingsActions.hideSettings(true));
    dispatch(gameActions.submitSettings(selectedSettings));
  };

  return (
    <Modal>
      <form onSubmit={submitOptionsHandler}>
        <div className={classes.menu}>
          {!isGameOver && (
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
              <Options
                key={theme}
                styleOption="select-options"
                label="Theme:"
                name="pattern-theme"
                value={theme}
                id={theme}
                onChangeHandler={patternThemeHandler}
                selectOptions={themeOptions}
              />
              <Options
                key={difficulty}
                styleOption="select-options"
                label="Difficulty:"
                name="difficulty"
                value={difficulty}
                id={difficulty}
                onChangeHandler={setDifficultyHandler}
                selectOptions={difficultyOptions}
              />
            </div>
            <div className={classes.preview}>
              <img
                className={classes[theme]}
                src={require(`../../assets/images/${theme}/preview.gif`)}
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
  );
};
export default Settings;
