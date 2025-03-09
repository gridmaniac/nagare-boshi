import { getCachedDictionaryS } from "@/server/cache";

export default defineEventHandler(async (event) => {
  const batch = await readBody<Batch>(event);
  const dictionaryS = await getCachedDictionaryS();
  const deckCards = await DeckCard.find({ deckId: batch.deckId }, "cardId");
  const docs = [];

  switch (batch.source) {
    case "imiwa":
      for (const { value, timestamp } of batch.items) {
        const card = dictionaryS?.[value];
        if (!card) continue;

        const deckCard = deckCards.find(
          (deckCard) => deckCard.cardId === value
        );

        if (!deckCard) {
          docs.push({
            deckId: batch.deckId,
            cardId: value,
            box: 0,
            reviewAfter: new Date(timestamp),
            reviewNum: 0,
          });
        }
      }

      await DeckCard.insertMany(docs);
  }
});
