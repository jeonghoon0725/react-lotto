import classNames from "classnames";
const Button = ({ type, text, onClick }) => {
  return (
    <button className={classNames("Button", `Button_${type || "default"}`)} onClick={onClick}>
      {text}
    </button>
  );
};
  
export default Button;