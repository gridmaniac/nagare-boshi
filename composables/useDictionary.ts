let cardMap: Record<string, Card>;
let textMap: Record<string, string>;
let kanaMap: Record<string, string>;

export const useDictionary = () => {
  const ensureReady = async () => {
    if (!cardMap) {
      cardMap = await $fetch("jmdict-hashmap.json");

      textMap = Object.values(cardMap).reduce((acc, card) => {
        acc[card.text] = card.id;
        return acc;
      }, {} as Record<string, string>);

      kanaMap = Object.values(cardMap).reduce((acc, card) => {
        acc[card.kana] = card.id;
        return acc;
      }, {} as Record<string, string>);
    }
  };

  const getCard = (id: string) => cardMap[id];

  const tokenize = (sentence: string) => {
    const chars = sentence.split("");

    let left = 0;
    let right = chars.length - 1;
    let tokenFound = false;

    const lookupMeaning = (token: string) => {
      const meaning = textMap?.[token] || kanaMap?.[token];

      return cardMap?.[meaning];
    };

    const scanToken = (left: number, right: number) => {
      const token = chars.slice(left, right + 1).join("");
      const meaning = lookupMeaning(token);

      return meaning ? token : null;
    };

    const tokens = [];

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
  };

  return {
    ensureReady,
    getCard,
    tokenize,
  };
};
