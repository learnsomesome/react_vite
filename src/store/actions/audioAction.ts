import { Dispatch } from "redux";
import { message, message as _message } from "antd";
import { IPlayType } from "../reducers/audioReducer";
import { checkMusic, getSongUrl } from "@/api/music";

export const INIT_AUDIO = "INIT_AUDIO";
export const UPDATE_HIDE = "UPDATE_HIDE";
export const UPDATE_PAUSED = "UPDATE_PAUSED";
export const UPDATE_CURRENT_SONG = "UPDATE_CURRENT_SONG";
export const UPDATE_SONGS_LIST = "UPDATE_SONGS_LIST";
export const REMOVE_SONGS_LIST = "REMOVE_SONGS_LIST";
export const UPDATE_PLAY_TYPE = "UPDATE_PLAY_TYPE";

export const initAudio = (audioEl: HTMLAudioElement) => ({
  type: INIT_AUDIO,
  payload: { audioEl },
});

export const updateHide = (hide: boolean) => ({
  type: UPDATE_HIDE,
  payload: { hide },
});

export const updatePaused = (paused: boolean) => ({
  type: UPDATE_PAUSED,
  payload: { paused },
});

export const updateCurrentSong = (id: number) => ({
  type: UPDATE_CURRENT_SONG,
  payload: { id },
});

export const updateSongsList =
  (song: { id: number }, playNow: boolean = true) =>
  async (dispatch: Dispatch, getState: any) => {
    const { currentSong, songsList } = getState().audioReducer;

    if (songsList[song.id]) {
      if (playNow) {
        currentSong !== song.id && dispatch(updateCurrentSong(song.id));
      } else {
        message.error("该歌曲已在播放列表中");
      }

      return;
    }

    window.$Loading.start();

    const res = await checkMusic({ id: song.id }).catch((error) => {
      if (error.response.status === 404) {
        return _message.error(error.response.data.message);
      }

      return error.globalErrorProcesser();
    });

    if (res.success) {
      const { data } = await getSongUrl({ id: song.id });

      window.$Loading.end();

      dispatch({
        type: UPDATE_SONGS_LIST,
        payload: { song: { ...song, source: data[0] } },
      });
      (Object.keys(songsList).length === 0 || playNow) &&
        dispatch(updateCurrentSong(song.id));

      if (!playNow) message.success("歌曲已添加至播放列表");
    }
  };

export const removeSongsList = (id?: number) => ({
  type: REMOVE_SONGS_LIST,
  payload: { id },
});

export const updatePlayType = (type: IPlayType) => ({
  type: UPDATE_PLAY_TYPE,
  payload: { type },
});
