import classes from "./Header.module.css";

const Header = (props) => {
  const { theme, difficulty } = props;

  return (
    <div className={classes["game-header"]}>
      <p>
        Theme:<span>{theme}</span>
      </p>
      <p>
        Difficulty Level:
        {difficulty === 2 && <span>Easy</span>}
        {difficulty === 4 && <span>Medium</span>}
        {difficulty === 9 && <span>Hard</span>}
      </p>
    </div>
  );
};

export default Header;
