import { readFile, writeFile } from "fs/promises";
import * as path from "node:path";

// let jmdictCache: JMdict | null = null;

let cardsCache: Card[] = [];

let dictionary: Record<string, Card> | undefined = undefined;

let dictionaryK: Record<string, Card> | undefined = undefined;

let dictionaryS: Record<string, Card> | undefined = undefined;

export const getCachedJmdict = async () => {
  if (cardsCache.length) {
    return cardsCache;
  }

  const filePath = path.join(process.cwd(), "public", "jmdict-simplified.json");
  cardsCache = JSON.parse(await readFile(filePath, "utf-8"));

  // jmdictCache = JSON.parse(
  //   await readFile("./dict/jmdict/jmdict-examples-eng-3.6.1.json", "utf-8")
  // );

  // const newJmdict = jmdictCache?.words.map((word) => ({
  //   id: word.id,
  //   text: word.kanji[0]?.text,
  //   kana: word.kana[0]?.text,
  //   gloss: word.sense[0]?.gloss.map((gloss) => gloss?.text),
  //   examples: word.sense[0]?.examples.map((example) => ({
  //     sentence: example.sentences[0]?.text,
  //     translation: example.sentences[1]?.text,
  //   })),
  // }));

  // await writeFile(
  //   "./dict/jmdict/jmdict-simplified.json",
  //   JSON.stringify(newJmdict)
  // );

  return cardsCache;
};

export const getCachedDictionary = async () => {
  if (dictionary) return dictionary;

  const jmdict = await getCachedJmdict();

  dictionary = jmdict.reduce((acc, card) => {
    acc[card.text] = card;

    return acc;
  }, {} as Record<string, Card>);

  return dictionary;
};

export const getCachedDictionaryK = async () => {
  if (dictionaryK) return dictionaryK;

  const jmdict = await getCachedJmdict();

  dictionaryK = jmdict.reduce((acc, card) => {
    acc[card.kana] = card;

    return acc;
  }, {} as Record<string, Card>);

  return dictionaryK;
};

export const getCachedDictionaryS = async () => {
  if (dictionaryS) return dictionaryS;

  const jmdict = await getCachedJmdict();

  dictionaryS = jmdict.reduce((acc, card) => {
    acc[card.id] = card;

    return acc;
  }, {} as Record<string, Card>);

  return dictionaryS;
};
