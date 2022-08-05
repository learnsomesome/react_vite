import { Play } from "@/assets/svg";
import { formatCountDisplay } from "@/utils/common";
import { Tag } from "antd";
import classes from "./index.module.scss";

export type IPlaySummary = {
  id?: string;
  name?: string;
  coverImgUrl: string;
  creator?: string;
  officialTags?: string[];
  trackCount?: number;
  playCount: number;
};

const PlayListCard = ({
  className,
  type = "card",
  data,
  onClick,
}: {
  className?: string;
  type?: "card" | "list";
  data: IPlaySummary;
  onClick?: () => void;
}) => {
  const formatPlayCount = formatCountDisplay(data.playCount, 100 * 10000);

  return (
    <div
      className={`${
        type === "card" ? classes.card : classes.list
      } ${className}`}
      onClick={onClick}
    >
      {type === "card" ? (
        <>
          <span className={classes.playCount}>
            <Play width={16} height={16} />
            {formatPlayCount}
          </span>
          <img src={data.coverImgUrl} alt="card-image" />
          {data?.name && <span className={classes.name}>{data.name}</span>}
        </>
      ) : (
        <>
          <div className={classes.content}>
            <img src={data.coverImgUrl} alt="card-image" />
            <div style={{ flex: 1, width: "1px" }}>
              <div className={classes.title}>{data.name}</div>
              <div className={classes.description}>
                <span>{data.trackCount} 首音乐</span>
                <span> by {data.creator}，</span>
                <span>
                  播放{" "}
                  {typeof formatPlayCount === "number"
                    ? formatPlayCount + " "
                    : formatPlayCount}
                  次
                </span>
              </div>
            </div>
          </div>
          {data.officialTags && (
            <div className={classes.tags}>
              {data.officialTags.map((tag) => (
                <Tag color="orange">{tag}</Tag>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlayListCard;
