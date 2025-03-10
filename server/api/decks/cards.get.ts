export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  const deckCards = await DeckCard.find({ deckId }, "-_id cardId");
  return deckCards.map((deckCard) => deckCard.cardId);
});
