let cardMap: Record<string, Card>;
let textMap: Record<string, string>;
let kanaMap: Record<string, string>;

let tokenizer: KuroMojiTokenizer | null = null;
let synonymsMap: Record<string, number[]> | null = null;

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

    textMap = Object.values(cardMap).reduce(
      (acc, card) => {
        if (!acc[card.text]) acc[card.text] = card.id;
        return acc;
      },
      {} as Record<string, string>,
    );

    kanaMap = Object.values(cardMap).reduce(
      (acc, card) => {
        if (!acc[card.kana]) acc[card.kana] = card.id;
        return acc;
      },
      {} as Record<string, string>,
    );

    tokenizer = await prepareKuroMoji();
    synonymsMap = await $fetch("/synonyms-hashmap.json");

    isReady.value = true;
  };

  const getCard = (id: string) => cardMap[id];

  const tokenize = (sentence: string) => {
    if (!tokenizer) return [];

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
      const token = meaning ? cardMap?.[meaning] : undefined;

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

  const findSynonyms = (text: string) => {
    if (!synonymsMap) return [];

    const synonyms = synonymsMap[text] || [];
    return synonyms.map((index) => Object.keys(synonymsMap || {})[index]);
  };

  const findRelatedCards = (cards: Card[], text: string) => {
    const synonyms = findSynonyms(text);

    return cards.filter(
      (card) =>
        card.text !== text &&
        (synonyms.includes(card.text) || synonyms.includes(card.kana)),
    );
  };

  return {
    ensureReady,
    getCard,
    tokenize,
    findRelatedCards,
    findSynonyms,
    isReady,
  };
};
