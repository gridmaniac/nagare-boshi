export default defineEventHandler(async (event) => {
  try {
    const { deckId } = getQuery(event);
    const deck = await Deck.findById(deckId);

    return deck;
  } catch (error) {
    return null;
  }
});
