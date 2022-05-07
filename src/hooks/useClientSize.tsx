import { useEffect, useState } from "react";

type ClientSize = "small" | "medium" | "large";

export const useClientSize = () => {
  const [clientSize, setClientSize] = useState<ClientSize>();

  const onResize = () => {
    if (window.innerWidth < 768) {
      setClientSize("small");
    } else if (window.innerWidth < 992) {
      setClientSize("medium");
    } else {
      setClientSize("large");
    }
  };

  useEffect(() => {
    if (!clientSize) {
      onResize();
    }

    window.addEventListener("resize", onResize);

    return window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    console.log("11");
  }, [window.innerWidth]);

  return clientSize;
};
