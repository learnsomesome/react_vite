// 数量格式化显示
export const formatCountDisplay = (count: number, threshold?: number) => {
  if (threshold && count < threshold) {
    return count;
  }

  if (count < 10000) {
    return count;
  }

  if (count < 10000 * 10000) {
    return `${Math.round(count / 10000)} 万`;
  }

  return `${((count / 10000) * 10000).toFixed(1)} 亿`;
};

// 时长格式化显示
export const formatDurationDisplay = (dt: number) => {
  const ts = Math.trunc(dt / 1000);
  const h = Math.trunc(ts / (60 * 60));
  const m = Math.trunc(ts / 60);
  const s = ts % 60;

  const replenishZero = (n: number) => (n < 10 ? `0${n}` : n.toString());

  return `${h > 0 ? `${replenishZero(h)}:` : ""}${replenishZero(
    m
  )}:${replenishZero(s)}`;
};
