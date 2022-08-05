import { LocalContext } from "@/provider/LocalProvider";
import { IRootState } from "@/store";
import { updateSongsList } from "@/store/actions/audioAction";
import { formatDurationDisplay } from "@/utils/common";
import { List, Skeleton, Table, Tag } from "antd";
import { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Acoustic, More } from "@/assets/svg";
import classes from "./index.module.scss";
import { ISong } from "@/api/music";
import MoreOperation from "./MoreOperation";

const SongList = ({ data }: { data: ISong[] }) => {
  const { currentSongId } = useSelector(
    (state: IRootState) => state.audioReducer
  );
  const { t } = useTranslation();
  const { clientSize } = useContext(LocalContext);
  const dispatch = useDispatch();
  const [song, setSong] = useState<ISong | null>();

  const columns = useMemo(
    () => [
      {
        key: "no",
        render: (text: number, record: ISong, index: number) => index + 1,
      },
      {
        ellipsis: true,
        width: 240,
        title: t("song_title"),
        dataIndex: "name",
      },
      {
        title: t("duration"),
        dataIndex: "dt",
        render: (dt: number) => formatDurationDisplay(dt),
      },
      {
        ellipsis: true,
        title: t("singer"),
        dataIndex: "ar",
        render: (ar: { name: string; id: number }[]) =>
          ar.map(({ name }) => name).join("/"),
      },
      {
        ellipsis: true,
        title: t("album"),
        dataIndex: "al",
        render: (al: { name: string }) => al.name,
      },
      {},
    ],
    []
  );

  return clientSize && data ? (
    <div className={classes.songList}>
      {clientSize === "large" ? (
        <Table
          rowKey="id"
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(track, index) => (
              <List.Item
                className={currentSongId === track.id ? classes.active : ""}
                actions={[
                  <More
                    width={28}
                    height={28}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setSong(track);
                    }}
                  />,
                ]}
                onClick={() => dispatch(updateSongsList(track))}
              >
                <Skeleton active title={false} loading={data.length === 0}>
                  <List.Item.Meta
                    avatar={
                      currentSongId === track.id ? (
                        <Acoustic className={classes.acoustic} />
                      ) : (
                        <span>{index}</span>
                      )
                    }
                    title={track.name}
                    description={
                      <>
                        {track.originCoverType === 1 && (
                          <Tag color="#cd201f">原唱</Tag>
                        )}
                        {track.fee === 1 && <Tag color="volcano">VIP</Tag>}
                        {track.sq && <Tag color="red">SQ</Tag>}
                        <span>{`${track.ar
                          .map(({ name }) => name)
                          .join("/")} - ${track.al.name}`}</span>
                      </>
                    }
                  />
                </Skeleton>
              </List.Item>
            )}
          />
          <MoreOperation
            visible={!!song}
            song={song as ISong}
            onClose={() => setSong(null)}
          />
        </>
      )}
    </div>
  ) : null;
};

export default SongList;
