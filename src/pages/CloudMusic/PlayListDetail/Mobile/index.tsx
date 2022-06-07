import { Right } from "@/assets/svg";
import AppBar from "@/components/AppBar";
import PlayListCard from "@/components/CloudMusic/PlayListCard";
import { Avatar, Button, Tag } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPlayListDetail } from "..";
import classes from "./index.module.scss";

const MobilePlayListDetail = ({
  id,
  data,
  theme,
}: {
  id: string;
  data: IPlayListDetail;
  theme: string;
}) => {
  const { t } = useTranslation();
  const maskRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const onMaskVisible = () => setVisible(true);

  return (
    <div className={classes.playListDetail}>
      <section className={classes.contentWrap}>
        <AppBar title={t("song_list")} />
        <div className={classes.content}>
          <PlayListCard
            playCount={data.playCount}
            picUrl={data.coverImgUrl}
            onClick={onMaskVisible}
          />
          <div className={classes.info}>
            <h3 className={classes.title} onClick={onMaskVisible}>
              {data.name}
            </h3>
            <div className={classes.user}>
              <Avatar
                size="small"
                src={data.creator.avatarUrl}
                alt="creator-avatar"
              />
              <span>{data.creator.nickname}</span>
            </div>
            <div className={classes.description} onClick={onMaskVisible}>
              <span
                dangerouslySetInnerHTML={{
                  __html: data.description.replace(/\n/g, ""),
                }}
              />
              <Right width={20} height={20} />
            </div>
          </div>
        </div>
      </section>
      <div
        ref={maskRef}
        className={`${visible ? classes.visible : classes.hidden} ${
          classes.summaryMask
        }`}
        onClick={() => setVisible(false)}
      >
        <div className={classes.scrollWrap}>
          <div className={classes.header}>
            <img
              src={data.coverImgUrl}
              width={180}
              height={180}
              alt="cover-img"
            />
            <h2>{data.name}</h2>
          </div>
          <div className={classes.content}>
            <div>
              {data.tags.map((tag) => (
                <Tag key={tag} color={theme === "dark" ? "volcano" : "blue"}>
                  {tag}
                </Tag>
              ))}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: data.description.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayListDetail;
