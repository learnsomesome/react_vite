import Banner from "@/components/CloudMusic/Banner";
import PlayListRec from "@/components/CloudMusic/PlayListRec";
import classes from "./index.module.scss";

const CloudMusic = () => {
  return (
    <div className={classes.cloudMusic}>
      <Banner />
      <PlayListRec />
    </div>
  );
};

export default CloudMusic;
