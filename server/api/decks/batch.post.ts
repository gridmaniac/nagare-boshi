export default defineEventHandler(async (event) => {
  const batch = await readBody<Batch>(event);
  const docs = [];

  for (const { value, timestamp } of batch.items) {
    docs.push({
      deckId: batch.deckId,
      cardId: value,
      box: 0,
      reviewAfter: new Date(timestamp),
      reviewNum: 0,
    });
  }

  await DeckCard.insertMany(docs);
});
