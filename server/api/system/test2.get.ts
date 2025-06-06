import { isValidObjectId } from "mongoose";
import path from "path";
import { readFile } from "fs/promises";

let cardMap: Record<string, Card>;
let textMap: Record<string, string>;
let kanaMap: Record<string, string>;

const ensureReady = async () => {
  if (cardMap) return;

  const jmdictCommonPath = path.join(
    process.cwd(),
    "public",
    "jmdict-hashmap.json"
  );

  cardMap = JSON.parse(await readFile(jmdictCommonPath, "utf-8"));

  textMap = Object.values(cardMap).reduce((acc, card) => {
    acc[card.text] = card.id;
    return acc;
  }, {} as Record<string, string>);

  kanaMap = Object.values(cardMap).reduce((acc, card) => {
    acc[card.kana] = card.id;
    return acc;
  }, {} as Record<string, string>);
};

export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  await ensureReady();

  if (!isValidObjectId(deckId)) return null;

  const deckCards = await DeckCard.find({
    deckId,
  });

  let count = 0;

  for (const deckCard of deckCards) {
    const card = cardMap[deckCard.cardId];
    if (!card) {
      console.log(`Card not found for ID: ${deckCard.cardId}`);
    }
  }

  return { count };
});
