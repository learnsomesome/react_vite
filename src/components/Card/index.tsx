import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

type ICard = {
  size?: "default" | "large";
  label: string;
  icon?: JSX.Element;
  description?: string;
  jumpPath?: string;
  backgroundImageUrl?: string;
};

const Card = (props: ICard) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${classes.card} ${props.size === "large" ? "large" : ""}`}
      onClick={() => props.jumpPath && navigate(props.jumpPath)}
    >
      <header>
        {props.icon && <div className={classes.icon}>{props.icon}</div>}
        <span className={classes.label}>{props.label}</span>
      </header>
      {props.description && (
        <p className={classes.description}>{props.description}</p>
      )}
    </div>
  );
};

export default Card;
