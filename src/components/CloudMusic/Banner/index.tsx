import { Left, Right } from "@/assets/svg";
import { LocalContext } from "@/provider/LocalProvider";
import io from "@/utils/io";
import { Carousel, Skeleton } from "antd";
import {
  CSSProperties,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./index.module.scss";

type IBanner = {
  imageUrl?: string;
  pic?: string;
  titleColor: string;
  typeTitle: string;
  url: string;
  targetId: number;
};

const Banner = () => {
  const carouselRef = useRef<any>(null);
  const { clientSize } = useContext(LocalContext);
  const [data, setData] = useState<IBanner[]>([]);
  const [current, setCurrent] = useState(0);

  const isLargeClientSize = clientSize === "large";

  const bgStyle: CSSProperties = useMemo(
    () =>
      data.length > 0 && isLargeClientSize
        ? {
            transition: "background 0.3s",
            backgroundImage: `url(${data[current].imageUrl}?imageView&blur=40x20)`,
            backgroundSize: "6000px",
            backgroundPosition: "center",
          }
        : {},
    [data, current, isLargeClientSize]
  );

  const fetchBannerData = async () => {
    const res: { banners: IBanner[] } = await io.get("/banner", {
      params: { type: isLargeClientSize ? 0 : 2 },
    });

    setData(res.banners ?? []);
  };

  useEffect(() => {
    clientSize && fetchBannerData();
  }, [clientSize]);

  return data.length > 0 ? (
    <div className={classes.banner} style={bgStyle}>
      <div className={classes.content}>
        {isLargeClientSize && (
          <Left
            className={classes.left}
            onClick={() => carouselRef.current?.prev()}
          />
        )}
        <Carousel
          autoplay
          dots={isLargeClientSize}
          ref={carouselRef}
          beforeChange={(currentSlide, nextSlide) => setCurrent(nextSlide)}
          effect={isLargeClientSize ? "fade" : "scrollx"}
        >
          {data?.map((item) => (
            <div key={item.targetId} className={classes.imageWrap}>
              <img
                src={`${
                  item[isLargeClientSize ? "imageUrl" : "pic"]
                }?imageView&quality=89`}
                alt="banner-image"
              />
              {!isLargeClientSize && (
                <span
                  className={classes.typeText}
                  style={{
                    backgroundColor: {
                      red: "#be333a",
                      blue: "#1890ff",
                    }[item.titleColor],
                  }}
                >
                  {item.typeTitle}
                </span>
              )}
            </div>
          ))}
        </Carousel>
        {isLargeClientSize && (
          <Right
            className={classes.right}
            onClick={() => carouselRef.current?.next()}
          />
        )}
      </div>
    </div>
  ) : (
    <Skeleton
      round
      active
      title={false}
      paragraph={{ rows: 4 }}
      className={classes.skeleton}
    />
  );
};

export default Banner;
