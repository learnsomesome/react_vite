import { IPlayListDetail, ISong } from "@/api/music";
import { ExpandDown, FoldUp } from "@/assets/svg";
import Comments from "@/components/CloudMusic/Comments";
import PlayListCard from "@/components/CloudMusic/PlayListCard";
import SongList from "@/components/CloudMusic/SongList";
import { Avatar, Button, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./index.module.scss";

const PlayListDetail = ({
  id,
  data,
  theme,
}: {
  id: string;
  data: IPlayListDetail;
  theme: string;
}) => {
  const { t } = useTranslation();
  const [hideDescription, setHideDescription] = useState(
    data?.description.length > 100
  );

  return (
    <div className={classes.playlistDetail}>
      <div className={classes.contentWrap}>
        <main className={classes.content}>
          <section className={classes.summary}>
            <PlayListCard
              data={{
                playCount: data.playCount,
                coverImgUrl: data.coverImgUrl,
              }}
            />
            <div className={classes.info}>
              <h2 className={classes.title}>{data.name}</h2>
              <div className={classes.user}>
                <Avatar src={data.creator.avatarUrl} alt="creator-avatar" />
                <span>{data.creator.nickname}</span>
                <span>{moment(data.createTime).format("YYYY-MM-DD")} 创建</span>
              </div>
              <div className={classes.tags}>
                {data.tags.map((tag) => (
                  <Tag key={tag} color={theme === "dark" ? "volcano" : "blue"}>
                    {tag}
                  </Tag>
                ))}
              </div>
              <p
                className={classes.description}
                dangerouslySetInnerHTML={{
                  __html:
                    data.description.length > 100 && hideDescription
                      ? `${data.description
                          .substring(0, 100)
                          .replace(/\n/g, "<br />")}...`
                      : data.description.replace(/\n/g, "<br />"),
                }}
              />
              {data.description.length > 100 && (
                <div className={classes.foldBtn}>
                  <Button
                    size="small"
                    type="link"
                    icon={
                      hideDescription ? (
                        <ExpandDown width={14} />
                      ) : (
                        <FoldUp width={14} />
                      )
                    }
                    onClick={() => setHideDescription(!hideDescription)}
                  >
                    {hideDescription
                      ? t("common.expand")
                      : t("common.collapse")}
                  </Button>
                </div>
              )}
            </div>
          </section>
          <section className={classes.tracks}>
            <div className={classes.trackHeader}>
              <h2>{t("song_lists")}</h2>
              <span>
                {data.trackCount} {t("songs")}
              </span>
            </div>
            <SongList data={data.tracks as ISong[]} />
          </section>
          <section className={classes.comments}>
            <Comments id={id} type={2} />
          </section>
        </main>
      </div>
      <div className={classes.extra}>
        <section>
          <p>{t("playlist_subscribers")}</p>
          <div className={classes.subscribers}>
            {data.subscribers.map((subscriber) => (
              <div key={subscriber.userId}>
                <img
                  height={40}
                  width={40}
                  src={subscriber.avatarUrl}
                  title={subscriber.nickname}
                  alt="subscriber-avatar"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlayListDetail;
