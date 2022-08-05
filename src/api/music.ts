import { SEARCH_TYPE } from "@/utils/constant";
import io from "@/utils/io";

export type IBanner = {
  imageUrl?: string;
  pic?: string;
  titleColor: string;
  typeTitle: string;
  url: string;
  targetId: number;
};

export const getBanner = (params: {
  type: number;
}): Promise<{ banners: IBanner[] }> => io.get("/banner", { params });

export type IComment = {
  user: {
    userId: number;
    avatarUrl: string;
    nickname: string;
  };
  commentId: number;
  content: string;
  timeStr: string;
  likedCount: number;
  replyCount: number;
  liked: boolean;
};

export type IComments = {
  comments: IComment[];
  hasMore: boolean;
  totalCount: number;
};

export const getComments = (params: {
  id: string;
  type: number;
}): Promise<{ data: IComments }> => io.get("/comment/new", { params });

export type IRecPlayListItem = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
};

export const getRecPlayList = (params: {
  limit: number;
}): Promise<{ result: IRecPlayListItem[] }> =>
  io.get("/personalized", { params });

export type ISearchResult = {
  result: {
    playlists: {
      id: number;
      name: string;
      coverImgUrl: string;
      creator: {
        nickname: string;
      };
      trackCount: number;
      playCount: number;
      officialTags: string[];
    }[];
    songs: {
      id: number;
      name: string;
      artists: { id: number; name: string }[];
      album: { name: string };
      duration: number;
      fee: number;
    }[];
    songCount: number;
  };
};

export const search = (params: {
  keywords: string;
  type: SEARCH_TYPE;
}): Promise<ISearchResult> => io.get("/search", { params });

export type ISong = {
  id: number;
  name: string;
  fee: number;
  ar: { id: number; name: string }[];
  dt: number;
  al: { id: number; name: string; picUrl: string };
  sq: Record<string, any>;
  originCoverType: number;
};

export type ISongDetail = {
  songs: ISong[];
};

export const getSongDetail = (params: { ids: string }): Promise<ISongDetail> =>
  io.get("/song/detail", { params });

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
  subscribers: {
    userId: string;
    avatarUrl: string;
    nickname: string;
  }[];
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  tracks: {
    id: number;
    name: string;
    dt: number;
    ar: {
      id: number;
      name: string;
    }[];
    al: {
      id: number;
      name: string;
      picUrl: string;
    };
    sq: Record<string, number>;
    fee: number;
  }[];
};

export const getPlayListDetail = (params: {
  id: string;
}): Promise<{ playlist: IPlayListDetail }> =>
  io.get("/playlist/detail", { params });

export const checkMusic = (params: {
  id: number;
}): Promise<{ success: boolean }> => io.get("/check/music", { params });

export const getSongUrl = (params: {
  id: number;
}): Promise<{ data: { url: string }[] }> => io.get("/song/url", { params });
