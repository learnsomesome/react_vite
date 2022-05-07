import { useNavigate } from "react-router-dom";
import "./index.scss";

type ICard = {
  size?: "default" | "large";
  title: string;
  icon?: JSX.Element;
  description?: string;
  jumpPath?: string;
  backgroundImageUrl?: string;
};

const Card = (props: ICard) => {
  const navigate = useNavigate();

  return (
    <div
      className={`card ${props.size === "large" ? "large" : ""}`}
      onClick={() => props.jumpPath && navigate(props.jumpPath)}
    >
      <header>
        {props.icon && <div className="icon">{props.icon}</div>}
        <span className="title">{props.title}</span>
      </header>
      {props.description && <p className="description">{props.description}</p>}
    </div>
  );
};

export default Card;
