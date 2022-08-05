import Banner from "@/components/CloudMusic/Banner";
import PlayListRec from "@/components/CloudMusic/PlayListRec";
import MainBar from "@/components/CloudMusic/MainBar";
import SearchResList from "@/components/CloudMusic/SearchResList";
import classes from "./index.module.scss";
import { useState } from "react";

const CloudMusic = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={classes.cloudMusic}>
      <MainBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className={classes.content}>
        {searchValue && <SearchResList searchValue={searchValue} />}
        <div style={{ display: searchValue ? "none" : "block" }}>
          <Banner />
          <PlayListRec />
        </div>
      </div>
    </div>
  );
};

export default CloudMusic;
