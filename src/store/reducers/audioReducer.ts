import { ITrack, ITrackSource } from "@/pages/CloudMusic/PlayListDetail";
import {
  INIT_AUDIO,
  REMOVE_SONGS_LIST,
  UPDATE_CURRENT_SONG,
  UPDATE_HIDE,
  UPDATE_PAUSED,
  UPDATE_PLAY_TYPE,
  UPDATE_SONGS_LIST,
} from "../actions/audioAction";

export type IPlayType = 0 | 1 | 2;

export type IAudioState = {
  audioEl: HTMLAudioElement | null;
  hide: boolean;
  paused: boolean;
  /**
   * 0 随机播放
   * 1 列表循环
   * 2 单曲循环
   */
  playType: IPlayType;
  currentSongId: number;
  songsList: Record<string, ITrack & { source: ITrackSource }>;
};

const initialState: IAudioState = {
  audioEl: null,
  hide: true,
  paused: true,
  playType: 0,
  currentSongId: 0,
  songsList: {},
};

export const audioReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  if (action.type === INIT_AUDIO) {
    return {
      ...state,
      audioEl: action.payload.audioEl,
    };
  }

  if (action.type === UPDATE_HIDE) {
    return {
      ...state,
      hide: action.payload.hide,
    };
  }

  if (action.type === UPDATE_PAUSED) {
    return {
      ...state,
      paused: action.payload.paused,
    };
  }

  if (action.type === UPDATE_CURRENT_SONG) {
    return {
      ...state,
      currentSongId: action.payload.id,
    };
  }

  if (action.type === UPDATE_SONGS_LIST) {
    const song = action.payload.song;

    return {
      ...state,
      songsList: { ...state.songsList, [song.id]: { ...song } },
    };
  }

  if (action.type === REMOVE_SONGS_LIST) {
    const _songsList = action.payload.id
      ? Object.keys(state.songsList).reduce(
          (pre: Record<string, ITrack & { source: ITrackSource }>, cur) =>
            +cur === action.payload.id
              ? pre
              : { ...pre, [cur]: state.songsList[cur] },
          {}
        )
      : {};

    return {
      ...state,
      currentSongId:
        Object.keys(_songsList).length === 0 ? 0 : +Object.keys(_songsList)[0],
      songsList: _songsList,
    };
  }

  if (action.type === UPDATE_PLAY_TYPE) {
    return {
      ...state,
      playType: action.payload.type,
    };
  }

  return state;
};
