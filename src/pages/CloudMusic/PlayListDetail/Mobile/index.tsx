import { CollectFolder, Comment, More, Right, Share } from "@/assets/svg";
import AppBar from "@/components/AppBar";
import ControlBar from "@/components/CloudMusic/ControlBar";
import PlayListCard from "@/components/CloudMusic/PlayListCard";
import { formatCountDisplay } from "@/utils/common";
import { Avatar, List, Skeleton, Tag } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const maskRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const onMaskVisible = () => setVisible(true);

  return (
    <div
      className={classes.playListDetail}
      style={visible ? { height: "100%", overflow: "hidden" } : {}}
    >
      <section className={classes.contentWrap}>
        <AppBar className={classes.appBar} title={t("song_list")} />
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
          <ControlBar
            className={classes.controlBar}
            actions={[
              {
                icon: (
                  <CollectFolder style={{ position: "relative", top: -1 }} />
                ),
                name: formatCountDisplay(data.subscribedCount, 100 * 10000),
                onClick: () => null,
              },
              {
                icon: <Comment />,
                name: formatCountDisplay(data.commentCount, 100 * 10000),
                onClick: () =>
                  navigate(`/cloud-music/comments?id=${id}&type=2`),
              },
              {
                icon: <Share style={{ position: "relative", top: -1 }} />,
                name: formatCountDisplay(data.shareCount, 100 * 10000),
                onClick: () => null,
              },
            ]}
          />
        </div>
      </section>
      <section className={classes.tracks}>
        <List
          itemLayout="horizontal"
          dataSource={data.tracks}
          renderItem={(track) => (
            <List.Item actions={[<More width={28} height={28} />]}>
              <Skeleton active title={false} loading={data.tracks.length === 0}>
                <List.Item.Meta
                  title={track.name}
                  description={
                    <>
                      {track.fee === 1 && <Tag color="volcano">VIP</Tag>}
                      {track.sq && <Tag color="red">SQ</Tag>}
                      <span>{`${track.ar.map(({ name }) => name).join("/")} - ${
                        track.al.name
                      }`}</span>
                    </>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
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
