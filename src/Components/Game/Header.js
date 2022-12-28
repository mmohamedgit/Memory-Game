import classes from "./Header.module.css";
const Header = (props) => {
  //set gameover and maybe save the highest level count in a cookie or in a state

  const { level, gameOver } = props;

  return (
    <div className={classes.header}>
      <h1>Welcome to the Memory Game!</h1>
      {/* {level.length === 0 && !gameStarted && !gameOver && (
        <h2>Press Button To Start</h2>
      )} */}
      {level.length > 0 && !gameOver && <h2>Level {level.length}</h2>}
    </div>
  );
};

export default Header;
