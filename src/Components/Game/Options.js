import classes from "./Options.module.css";

const Options = (props) => {
  const { selectOptions, styleOption, name, label, value, onChangeHandler } =
    props;
  return (
    <div className={classes[styleOption]}>
      <label htmlFor="theme">{label}</label>
      <select name={name} value={value} id={value} onChange={onChangeHandler}>
        {selectOptions.map((theme) => (
          <option key={theme.option} value={theme.option}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Options;
