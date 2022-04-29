const themeSwitcher = (themeMap: Record<string, string>) => {
  // 动态处理主题 link
  // refer to https://github.com/ycjcl868/theme-switcher
  const id = "theme-style";
  const prefetchId = "theme-prefetch";

  // prefetch link css
  const themes = Object.keys(themeMap);
  themes.forEach((theme) => {
    const themeAssetId = `${prefetchId}-${theme}`;
    if (!document.getElementById(themeAssetId)) {
      // add prefetch
      const stylePrefetch = document.createElement("link");
      stylePrefetch.rel = "prefetch";
      stylePrefetch.type = "text/css";
      stylePrefetch.id = themeAssetId;
      stylePrefetch.href = themeMap[theme];
      document.head.append(stylePrefetch);
    }
  });

  const switcher = async (theme: string) => {
    const dom = document.getElementById(id);

    if (dom) {
      dom.remove();
    }

    if (themeMap[theme]) {
      const style = document.createElement("link");
      style.type = "text/css";
      style.rel = "stylesheet";
      style.id = id;
      style.href = themeMap[theme];
      document.body.append(style);
    }
  };

  return {
    switcher,
  };
};

export default themeSwitcher;
