import { getPlayListDetail, getSongDetail, IPlayListDetail } from "@/api/music";
import { LocalContext } from "@/provider/LocalProvider";
import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ClientPlayListDetail from "./Client";
import MobilePlayListDetail from "./Mobile";

export type ISinger = {
  id: number;
  name: string;
};

export type IAlbum = {
  id: number;
  name: string;
  picUrl: string;
};

export type ITrack = {
  id: number;
  name: string;
  dt: number;
  ar: ISinger[];
  al: IAlbum;
  sq: Record<string, number>;
  fee: number;
};

export type ITrackSource = {
  fee: number;
  freeTrialInfo: {
    end: number;
    start: number;
  };
  url: string;
};

const PlayListDetailDivert = () => {
  const [URLSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { theme, clientSize } = useContext(LocalContext);
  const [data, setData] = useState<IPlayListDetail>();

  const id = URLSearchParams.get("id") as string;

  const fetchPlayListDetail = async () => {
    if (id) {
      const res = await getPlayListDetail({ id });

      const songsDetail = await getSongDetail({
        ids: res.playlist.tracks.map(({ id }) => id).join(","),
      });

      setData({ ...res.playlist, tracks: songsDetail.songs });
    }
  };

  useEffect(() => {
    fetchPlayListDetail();
  }, []);

  return clientSize ? (
    data ? (
      clientSize === "large" ? (
        <ClientPlayListDetail id={id} data={data} theme={theme} />
      ) : (
        <MobilePlayListDetail id={id} data={data} theme={theme} />
      )
    ) : (
      <Spin className="centerSpin" tip={t("common.loading")} />
    )
  ) : null;
};

export default PlayListDetailDivert;
