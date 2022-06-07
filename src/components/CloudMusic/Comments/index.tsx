import { Like, Liked } from "@/assets/svg";
import io from "@/utils/io";
import { Avatar, Comment, Segmented, Spin } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./index.module.scss";

type IComment = {
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

type IComments = {
  comments: IComment[];
  hasMore: boolean;
  totalCount: number;
};

type IParmas = {
  id: string;
  type: number;
  pageNo?: number;
  pageSize?: number;
  sortType?: number;
  cursor?: number;
};

const options = [
  { label: "推荐", value: 1 },
  { label: "最热", value: 2 },
  { label: "最新", value: 3 },
];

const Comments = ({ id, type }: { id: string; type: number }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<IComments>();
  const [params, setParams] = useState<IParmas>({
    pageNo: 1,
    sortType: 1,
    id,
    type,
  });
  const [spinning, setSpinning] = useState(false);

  const fetchComments = async (_params: IParmas) => {
    setSpinning(true);

    const res: { data: IComments } = await io.get("/comment/new", {
      params: _params,
    });

    setSpinning(false);
    setData(res.data);
  };

  useEffect(() => {
    params.id && params.type && fetchComments(params);
  }, [params]);

  return data ? (
    <div className={classes.comments}>
      <div className={classes.commentHeader}>
        <div className={classes.title}>
          <h2>{t("comment")}</h2>
          <span>
            {data.totalCount} {t("comments")}
          </span>
        </div>
        <Segmented
          defaultValue={1}
          options={options}
          onChange={(v) =>
            setParams((pre) => ({ ...pre, sortType: v as number }))
          }
        />
      </div>
      <Spin spinning={spinning} tip={t("common.loading")} delay={500}>
        <div className={classes.commentContent}>
          {data.comments.map((comment) => (
            <Comment
              key={comment.commentId}
              author={comment.user.nickname}
              avatar={
                <Avatar src={comment.user.avatarUrl} alt="comment-avatar" />
              }
              content={comment.content}
              datetime={comment.timeStr}
              actions={[
                <span
                  className={`${comment.liked ? classes.liked : ""} ${
                    classes.like
                  }`}
                >
                  {comment.liked ? <Liked /> : <Like />}
                  <span>{comment.likedCount}</span>
                </span>,
              ]}
            />
          ))}
        </div>
      </Spin>
    </div>
  ) : null;
};

export default Comments;
