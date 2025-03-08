export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  const deckCard = await DeckCard.findOne({ deckId }).skip(
    Math.random() * 2000
  );

  return deckCard;
});
