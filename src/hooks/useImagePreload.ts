import { useEffect, useState } from "react";

export const useImagePreload = ({
  src,
  onLoaded,
}: {
  src: string;
  onLoaded?: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = src;

    img.onload = () => {
      setLoaded(true);

      onLoaded && onLoaded();
    };
  }, [src, onLoaded]);

  return loaded;
};
