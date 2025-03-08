const normalizeMap = [
  ["られた", "る"],
  ["られる", "る"],
  ["わせた", "う"],
  ["くします", "くす"],
];

export const normalizeToken = (token: string) => {
  let normalized = token;
  normalizeMap.forEach(([from, to]) => {
    normalized = normalized.replace(from, to);
  });
  return normalized;
};
