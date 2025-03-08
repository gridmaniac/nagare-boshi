export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  const total = await DeckCard.countDocuments({ deckId });
  const fresh = await DeckCard.countDocuments({ deckId, box: 0 });
  const review = await DeckCard.countDocuments({
    deckId,
    box: { $gt: 0 },
    reviewAfter: { $lt: new Date() },
  });

  const retention = await DeckCard.countDocuments({
    deckId,
    box: { $gt: 3 },
  });

  return {
    total,
    fresh,
    review,
    retention,
  };
});
