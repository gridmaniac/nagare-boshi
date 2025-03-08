export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  const nextCard = await DeckCard.find({
    deckId,
    reviewAfter: { $lt: new Date() },
  })
    .sort({ box: -1 })
    .limit(1);

  if (nextCard.length === 0) return null;
  return nextCard[0];
});
