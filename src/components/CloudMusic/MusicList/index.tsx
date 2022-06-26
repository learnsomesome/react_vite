import { Acoustic, Close, Delete } from "@/assets/svg";
import { ITrack, ITrackSource } from "@/pages/CloudMusic/PlayListDetail";
import {
  removeSongsList,
  updateCurrentSong,
} from "@/store/actions/audioAction";
import { Drawer } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import PlayTypeSwitch from "../PlayTypeSwitch";
import classes from "./index.module.scss";

const MusicList = ({
  visible,
  currentSongId,
  songsList,
  onClose,
}: {
  visible: boolean;
  currentSongId: number;
  songsList: (ITrack & { source: ITrackSource })[];
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    visible && songsList.length === 0 && onClose();
  }, [songsList, visible]);

  return (
    <Drawer
      className={classes.musicList}
      placement="bottom"
      height="64%"
      closable={false}
      visible={visible}
      onClose={onClose}
    >
      <div className={classes.title}>
        <h3>{t("currently_playing")}</h3>
        <span>({songsList.length})</span>
      </div>
      <div className={classes.actions}>
        <PlayTypeSwitch />
        <div>
          <Delete
            className={classes.delete}
            onClick={() => dispatch(removeSongsList())}
          />
        </div>
      </div>
      <div className={classes.list}>
        {songsList.map((song) => (
          <div key={song.id} className={classes.song}>
            <span
              className={currentSongId === song.id ? classes.active : ""}
              onClick={() => dispatch(updateCurrentSong(song.id))}
            >
              {currentSongId === song.id && (
                <Acoustic className={classes.acoustic} />
              )}
              <span className={classes.songName}>{song.name}</span>
              <span className={classes.arName}>
                {" "}
                - {song.ar.map(({ name }) => name).join("/")}
              </span>
            </span>
            <Close
              className={classes.close}
              width={14}
              height={14}
              onClick={() => dispatch(removeSongsList(song.id))}
            />
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default MusicList;
