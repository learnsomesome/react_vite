import { ITrack } from "@/pages/CloudMusic/PlayListDetail";
import io from "@/utils/io";
import { Dispatch } from "redux";
import { message as Message } from "antd";
import { IPlayType } from "../reducers/audioReducer";

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
  (song: ITrack) => async (dispatch: Dispatch, getState: any) => {
    const { currentSong, songsList } = getState().audioReducer;

    if (songsList[song.id]) {
      currentSong !== song.id && dispatch(updateCurrentSong(song.id));

      return;
    }

    const res = await io
      .get("/check/music", {
        params: { id: song.id },
        loading: true,
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return Message.error(error.response.data.message);
        }

        return error.globalErrorProcesser();
      });

    if (res.success) {
      const { data } = await io.get("/song/url", {
        params: { id: song.id },
      });

      dispatch({
        type: UPDATE_SONGS_LIST,
        payload: { song: { ...song, source: data[0] } },
      });
      dispatch(updateCurrentSong(song.id));
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
