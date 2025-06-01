let cardMap: Record<string, Card>;
let textMap: Record<string, string>;
let kanaMap: Record<string, string>;

let tokenizer: KuroMojiTokenizer | null = null;

export const useDictionary = () => {
  const isReady = useState("isReady", () => false);

  const prepareKuroMoji = () => {
    return new Promise<KuroMojiTokenizer | null>((resolve) => {
      window.kuromoji
        .builder({
          dicPath: "/dict/",
        })
        .build(function (_, tokenizer: KuroMojiTokenizer | null) {
          resolve(tokenizer);
        });
    });
  };

  const ensureReady = async () => {
    if (cardMap) return;

    cardMap = await $fetch("/jmdict-hashmap.json");

    textMap = Object.values(cardMap).reduce((acc, card) => {
      if (!acc[card.text]) acc[card.text] = card.id;
      return acc;
    }, {} as Record<string, string>);

    kanaMap = Object.values(cardMap).reduce((acc, card) => {
      if (!acc[card.kana]) acc[card.kana] = card.id;
      return acc;
    }, {} as Record<string, string>);

    tokenizer = await prepareKuroMoji();

    isReady.value = true;
  };

  const getCard = (id: string) => cardMap[id];

  const tokenize = (sentence: string) => {
    if (!tokenizer) {
      throw new Error("Tokenizer is not ready. Call ensureReady first.");
    }

    const filtered = [
      "いる",
      "する",
      "ある",
      "なる",
      "くる",
      "いく",
      "だ",
      "です",
      "ます",
      "できる",
      "よう",
      "こと",
      "の",
      "いける",
      "ない",
      "１",
      "２",
      "３",
      "４",
      "５",
      "６",
      "７",
      "８",
      "９",
      "０",
    ];

    const list = tokenizer.tokenize(sentence);

    const tokens = [];
    const whiteList = [
      "動詞",
      "名詞",
      "副詞",
      // "助詞",
      // "助動詞",
      "形容詞",
      "感動詞",
      // "連体詞",
      "接続詞",
    ];

    for (const item of list) {
      if (
        whiteList.indexOf(item.pos) === -1 ||
        filtered.indexOf(item.basic_form) !== -1
      ) {
        tokens.push({
          text: item.surface_form,
          hasMatch: false,
        });

        continue;
      }

      const meaning = textMap?.[item.basic_form] || kanaMap?.[item.basic_form];
      const token = cardMap?.[meaning];

      tokens.push({
        text: item.surface_form,
        kana: token?.kana || undefined,
        gloss: token?.gloss[0] || undefined,
        baseForm: item.basic_form || undefined,
        hasMatch: !!token,
      });
    }

    return tokens;
  };

  const legacyTokenize = (sentence: string) => {
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
    legacyTokenize,
    tokenize,
    isReady,
  };
};
