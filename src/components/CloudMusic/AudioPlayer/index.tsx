import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initAudio,
  updateCurrentSong,
  updateHide,
  updatePaused,
} from "@/store/actions/audioAction";
import classes from "./index.module.scss";
import { IRootState } from "@/store";
import {
  CirclePlay,
  CirclePause,
  MusicList as MusicListIcon,
} from "@/assets/svg";
import MusicList from "../MusicList";
import { useLocation } from "react-router-dom";

const hidePaths = ["/cloud-music/comments"];

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { pathname } = useLocation();
  const { hide, paused, currentSongId, playType, songsList } = useSelector(
    (state: IRootState) => state.audioReducer
  );
  const dispatch = useDispatch();
  const [musicListVisible, setMusicListVisible] = useState(false);

  const currentSong = useMemo(
    () => songsList[currentSongId],
    [songsList, currentSongId]
  );

  console.log("currentSongId", currentSongId);
  console.log("songsList", songsList);
  console.log("currentSong", currentSong);

  const onPlay = (reload?: boolean) => {
    dispatch(updatePaused(reload ? false : !paused));

    if (paused || reload) {
      reload && audioRef.current?.load();
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  const onEnded = () => {
    const maxIndex = Object.keys(songsList).length - 1;
    console.log("ended", maxIndex, playType);

    if (maxIndex === 0 || playType === 2) {
      onPlay(true);
    } else {
      const currentIndex = Object.keys(songsList).findIndex(
        (id) => +id === currentSongId
      );
      let nextIndex = currentIndex;

      if (playType === 0) {
        while (nextIndex === currentIndex) {
          nextIndex = Math.floor((maxIndex + 1) * Math.random());
        }
      }

      if (playType === 1) {
        nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
      }

      dispatch(updateCurrentSong(+Object.keys(songsList)[nextIndex]));
    }
  };

  const onTimeUpdate = (e: any) => {
    const currentSeconds = Math.floor(e.target.currentTime);
    console.log("onTimeUpdate", currentSeconds);
  };

  const goNextOrPrev = (type: "next" | "prev") => {
    let nextIndex = 0;
    const maxIndex = Object.keys(songsList).length - 1;
    const currentIndex = Object.keys(songsList).findIndex(
      (id) => +id === currentSongId
    );

    if (type === "next") {
      nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    }

    dispatch(updateCurrentSong(+Object.keys(songsList)[nextIndex]));
  };

  useEffect(() => {
    if (audioRef.current) {
      dispatch(initAudio(audioRef.current));

      audioRef.current.addEventListener("ended", onEnded);
      audioRef.current.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        audioRef.current?.removeEventListener("ended", onEnded);
        audioRef.current?.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [audioRef.current, currentSongId, songsList, playType]);

  useEffect(() => {
    currentSong && onPlay(true);
  }, [currentSong]);

  useEffect(() => {
    dispatch(
      updateHide(
        hidePaths.includes(pathname) || Object.keys(songsList).length === 0
      )
    );
  }, [pathname, songsList]);

  return (
    <div
      className={`${classes.audioPlayer} ${
        hide || musicListVisible ? classes.hide : ""
      }`}
    >
      {currentSong && (
        <>
          <div className={classes.track}>
            <img src={currentSong.al.picUrl} alt="cover-image" />
            <span>
              <span className={classes.songName}>{currentSong.name}</span>
              <span className={classes.arName}>
                {" "}
                - {currentSong.ar.map(({ name }) => name).join("/")}
              </span>
            </span>
          </div>
          <div className={classes.action}>
            {paused ? (
              <CirclePlay onClick={() => onPlay()} />
            ) : (
              <CirclePause onClick={() => onPlay()} />
            )}
            <MusicListIcon onClick={() => setMusicListVisible(true)} />
          </div>
          <audio ref={audioRef}>
            <source src={currentSong?.source.url || ""} />
          </audio>
        </>
      )}
      <MusicList
        visible={musicListVisible}
        currentSongId={currentSongId}
        songsList={Object.values(songsList)}
        onClose={() => setMusicListVisible(false)}
      />
    </div>
  );
};

export default AudioPlayer;
