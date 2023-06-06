import { useSelector } from "react-redux";
import classes from "./Header.module.css";

const Header = () => {
  const title = useSelector((state) => state.game.title);
  const difficulty = useSelector((state) => state.settings.difficulty);

  return (
    <div className={classes["game-header"]}>
      <p>
        Theme: <span>{title}</span>
      </p>
      <p>
        Difficulty Level: {difficulty === 2 && <span>Easy</span>}
        {difficulty === 4 && <span>Medium</span>}
        {difficulty === 9 && <span>Hard</span>}
      </p>
    </div>
  );
};

export default Header;
