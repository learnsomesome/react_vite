import AppBar from "@/components/AppBar";
import Comments from "@/components/CloudMusic/Comments";
import { formatCountDisplay } from "@/utils/common";
import { Divider } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const MobileComments = () => {
  const { t } = useTranslation();
  const [URLSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState<number>();

  const id = URLSearchParams.get("id") as string;
  const type = URLSearchParams.get("type") as string;

  const title =
    totalCount === undefined
      ? `${t("comment")}`
      : `${t("comment")} (${formatCountDisplay(totalCount, 100 * 10000)})`;

  return (
    <div className="comments" style={{ padding: "16px" }}>
      <AppBar title={title} />
      <Divider style={{ margin: "16px 0" }} />
      <Comments
        id={id}
        type={+type}
        afterCommentsFetched={(data) => setTotalCount(data.totalCount)}
      />
    </div>
  );
};

export default MobileComments;
