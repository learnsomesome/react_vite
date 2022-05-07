import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("page_not_exist")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {t("back_home")}
        </Button>
      }
    />
  );
};

export default NoMatch;
