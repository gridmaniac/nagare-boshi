import { getCachedDictionary, getCachedDictionaryK } from "~/server/cache";

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);
  const dictionary = await getCachedDictionary();
  const dictionaryK = await getCachedDictionaryK();

  const meaning = dictionary?.[String(token)] || dictionaryK?.[String(token)];

  return meaning;
});
