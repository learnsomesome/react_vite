import { getRecPlayList, IRecPlayListItem } from "@/api/music";
import io from "@/utils/io";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PlayListCard from "../PlayListCard";
import classes from "./index.module.scss";

const PlayListRec = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<IRecPlayListItem[]>([]);

  const fetchPlayListData = async () => {
    const res = await getRecPlayList({ limit: 12 });

    setData(res.result ?? []);
  };

  useEffect(() => {
    fetchPlayListData();
  }, []);

  return (
    <div className={classes.playListRec}>
      <div className={classes.title}>
        <h2>{t("recommended_playlist")}</h2>
      </div>
      {data.length > 0 ? (
        <div className={classes.content}>
          {data.map((item) => (
            <PlayListCard
              className={classes.playListCard}
              key={item.id}
              data={{
                name: item.name,
                coverImgUrl: item.picUrl,
                playCount: item.playCount,
              }}
              onClick={() =>
                navigate(`/cloud-music/playlist-detail?id=${item.id}`)
              }
            />
          ))}
        </div>
      ) : (
        <Skeleton round active paragraph={{ rows: 4 }} title={false} />
      )}
    </div>
  );
};

export default PlayListRec;
