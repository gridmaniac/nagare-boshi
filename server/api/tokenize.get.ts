import { tokenize } from "kuromojin";

export default defineEventHandler(async (event) => {
  const { text } = getQuery(event);

  const tokens = await tokenize(text as string);
  return tokens;
});
