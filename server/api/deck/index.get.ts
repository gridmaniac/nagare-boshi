import { isValidObjectId } from "mongoose";

export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  if (!isValidObjectId(deckId)) return null;

  const deck = await Deck.findById(deckId);
  if (!deck) {
    throw createError({
      statusCode: 400,
      statusMessage: "Deck not found",
    });
  }

  return deck;
});
