import { getCachedDictionaryS } from "@/server/cache";

export default defineEventHandler(async (event) => {
  const { cardId } = getQuery(event);
  const dictionaryS = await getCachedDictionaryS();

  const card = dictionaryS?.[String(cardId)];
  return card;
});
