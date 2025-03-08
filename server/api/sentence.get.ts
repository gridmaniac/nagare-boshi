import { getCachedDictionary, getCachedDictionaryK } from "@/server/cache";
import { normalizeToken } from "@/server/lexica";

export default defineEventHandler(async (event) => {
  const { sentence } = getQuery(event);
  const dictionary = await getCachedDictionary();
  const dictionaryK = await getCachedDictionaryK();

  const chars = String(sentence).split("");

  let left = 0;
  let right = chars.length - 1;
  let tokenFound = false;

  const tokens = [];

  const lookupMeaning = (token: string) => {
    const normalizedToken = token; // normalizeToken(token);
    const meaning =
      dictionary?.[normalizedToken] || dictionaryK?.[normalizedToken];

    return meaning;
  };

  const scanToken = (left: number, right: number) => {
    const token = chars.slice(left, right + 1).join("");
    const meaning = lookupMeaning(token);

    return meaning ? token : null;
  };

  const packToken = (token: string, hasMatch = true): Token => {
    const meaning = lookupMeaning(token);
    return {
      text: token,
      kana: hasMatch ? meaning?.kana : undefined,
      gloss: hasMatch ? meaning?.gloss[0] : undefined,
      hasMatch,
    };
  };

  while (left < chars.length) {
    tokenFound = false;

    while (left < right) {
      const token = scanToken(left, right);

      if (token) {
        tokens.push(packToken(token));
        tokenFound = true;
        break;
      }
      right--;
    }

    const token = scanToken(left, left);
    if (!tokenFound && token) {
      tokens.push(packToken(token));
      tokenFound = true;
    }

    if (!tokenFound) {
      const token = chars.slice(left, right + 1).join("");
      tokens.push(packToken(token, false));
    }

    left = right + 1;
    right = chars.length - 1;
  }

  return tokens;
});
