import { Search } from "@/assets/svg";
import { Button, Input, InputRef } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./index.module.scss";

const MainBar = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (v: string) => void;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  return (
    <header className={classes.mainBar}>
      <div>
        <Input
          allowClear
          type="search"
          value={value}
          prefix={<Search />}
          placeholder={t("common.search")}
          onChange={(e: any) => setValue(e.target.value.trim())}
          onPressEnter={(e: any) => {
            const v = e.target.value.trim();

            if (v) {
              setSearchValue(v);
            }
          }}
        />
      </div>
      {searchValue ? (
        <Button
          type="text"
          onClick={() => {
            setValue("");
            setSearchValue("");
          }}
        >
          {t("common.cancel")}
        </Button>
      ) : (
        <Button type="link" disabled={true}>
          {t("common.login")}
        </Button>
      )}
    </header>
  );
};

export default MainBar;
