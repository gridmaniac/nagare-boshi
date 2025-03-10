export default defineEventHandler(async (event) => {
  const batch = await readBody<Batch>(event);
  const deckCards = await DeckCard.find({ deckId: batch.deckId }, "cardId");
  const docs = [];

  for (const { value, timestamp } of batch.items) {
    const deckCard = deckCards.find((deckCard) => deckCard.cardId === value);

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
});
