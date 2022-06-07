import { Play } from "@/assets/svg";
import { formatCountDisplay } from "@/utils/common";
import classes from "./index.module.scss";

const PlayListCard = ({
  className,
  playCount,
  picUrl,
  name,
  onClick,
}: {
  className?: string;
  playCount: number;
  picUrl: string;
  name?: string;
  onClick?: () => void;
}) => {
  return (
    <div className={`${classes.card} ${className}`} onClick={onClick}>
      <span className={classes.playCount}>
        <Play width={16} height={16} />
        {formatCountDisplay(playCount)}
      </span>
      <img src={picUrl} alt="card-image" />
      {name && <span className={classes.name}>{name}</span>}
    </div>
  );
};

export default PlayListCard;
