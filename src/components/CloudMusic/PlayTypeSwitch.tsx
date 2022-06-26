import { ListLoop, Random, SingleLoop } from "@/assets/svg";
import { IRootState } from "@/store";
import { updatePlayType } from "@/store/actions/audioAction";
import { IPlayType } from "@/store/reducers/audioReducer";
import { useDispatch, useSelector } from "react-redux";

const PlayTypeSwitch = () => {
  const dispatch = useDispatch();
  const { playType } = useSelector((state: IRootState) => state.audioReducer);

  const PLAY_TYPE_TEXT_MAP = {
    0: "随机播放",
    1: "列表循环",
    2: "单曲循环",
  };

  const PLAY_TYPE_ICON_MAP = {
    0: <Random />,
    1: <ListLoop />,
    2: <SingleLoop />,
  };

  const onPlayTypeChange = () => {
    dispatch(updatePlayType((playType === 2 ? 0 : playType + 1) as IPlayType));
  };

  return (
    <span onClick={onPlayTypeChange}>
      <span
        style={{
          marginRight: "12px",
          verticalAlign: "text-top",
          color: "#808080",
        }}
      >
        {PLAY_TYPE_ICON_MAP[playType]}
      </span>
      {PLAY_TYPE_TEXT_MAP[playType]}
    </span>
  );
};

export default PlayTypeSwitch;
