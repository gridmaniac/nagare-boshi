export default defineEventHandler(async (event) => {
  const { deckId, exclude } = getQuery(event);

  const nextCard = await DeckCard.find({
    deckId,
    reviewAfter: { $lt: new Date() },
    cardId: { $nin: exclude },
  })
    .sort({ box: -1 })
    .limit(1);

  return nextCard?.[0];
});
