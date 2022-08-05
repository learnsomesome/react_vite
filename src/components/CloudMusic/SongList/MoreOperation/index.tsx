import { ISong } from "@/api/music";
import { AddMusic } from "@/assets/svg";
import { updateSongsList } from "@/store/actions/audioAction";
import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import classes from "./index.module.scss";

const MoreOperation = ({
  visible,
  song,
  onClose,
}: {
  visible: boolean;
  song: ISong;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();

  return (
    <Drawer
      className={classes.moreOperation}
      placement="bottom"
      height="60%"
      closable={false}
      visible={visible}
      onClose={onClose}
    >
      {song ? (
        <>
          <div className={classes.header}>
            <img width={56} height={56} src={song.al.picUrl} alt="song-cover" />
            <div className={classes.info}>
              <div>{song.name}</div>
              <div>{song.ar.map(({ name }) => name).join("/")}</div>
            </div>
          </div>
          <div className={classes.operation}>
            <div onClick={() => dispatch(updateSongsList(song, false))}>
              <AddMusic width={24} height={24} /> 添加到播放列表
            </div>
          </div>
        </>
      ) : null}
    </Drawer>
  );
};

export default MoreOperation;
