export default defineEventHandler(async (event) => {
  const { deckId, exclude } = getQuery(event);

  const nextCard = await DeckCard.find({
    _id: { $ne: exclude },
    deckId,
    reviewAfter: { $lt: new Date() },
  })
    .sort({ box: -1 })
    .limit(1);

  return nextCard?.[0];
});
