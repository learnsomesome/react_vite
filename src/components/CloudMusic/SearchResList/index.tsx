import { getSongDetail, search } from "@/api/music";
import { SEARCH_OPTIONS, SEARCH_TYPE } from "@/utils/constant";
import { Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PlayListCard, { IPlaySummary } from "../PlayListCard";
import SongList from "../SongList";
import classes from "./index.module.scss";

const SearchResList = ({ searchValue }: { searchValue: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [type, setType] = useState(SEARCH_TYPE.SINGLE);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchSearchData = async (params: {
    keywords: string;
    type: SEARCH_TYPE;
  }) => {
    setLoading(true);
    const res = await search(params);

    if (params.type === SEARCH_TYPE.SINGLE) {
      const songsDetail = await getSongDetail({
        ids: res.result.songs?.map(({ id }) => id).join(","),
      });

      setData(songsDetail.songs ?? []);
    }

    if (params.type === SEARCH_TYPE.SONG_LIST) {
      setData(
        res.result.playlists?.map((list) => ({
          id: list.id,
          name: list.name,
          coverImgUrl: list.coverImgUrl,
          creator: list.creator.nickname,
          officialTags: list.officialTags,
          playCount: list.playCount,
          trackCount: list.trackCount,
        })) ?? []
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSearchData({ keywords: searchValue, type });
  }, [searchValue, type]);

  return (
    <div className={classes.searchResList}>
      <Spin
        style={{ height: "100vh" }}
        spinning={loading}
        tip={t("common.loading")}
        delay={500}
      >
        <Tabs
          destroyInactiveTabPane={true}
          activeKey={type}
          onChange={(v) => {
            setData(null);
            setType(v);
          }}
        >
          {SEARCH_OPTIONS.map(({ label, value }) => (
            <Tabs.TabPane tab={label} key={value}>
              {loading ? null : (
                <>
                  {value === SEARCH_TYPE.SINGLE && <SongList data={data} />}
                  {value === SEARCH_TYPE.SONG_LIST && (
                    <div>
                      {data?.map((item: IPlaySummary) => (
                        <PlayListCard
                          key={item.id}
                          type="list"
                          data={item}
                          onClick={() =>
                            navigate(
                              `/cloud-music/playlist-detail?id=${item.id}`
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Spin>
    </div>
  );
};

export default SearchResList;
