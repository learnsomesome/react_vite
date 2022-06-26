import { LocalContext } from "@/provider/LocalProvider";
import io from "@/utils/io";
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

export type ISubscriber = {
  userId: string;
  avatarUrl: string;
  nickname: string;
};

export type IPlayListDetail = {
  name: string;
  playCount: number;
  coverImgUrl: string;
  createTime: number;
  tags: string[];
  description: string;
  trackCount: number;
  subscribedCount: number;
  commentCount: number;
  shareCount: number;
  subscribers: ISubscriber[];
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  tracks: ITrack[];
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
      const res: { playlist: IPlayListDetail } = await io.get(
        "/playlist/detail",
        { params: { id } }
      );

      setData(res.playlist);
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
