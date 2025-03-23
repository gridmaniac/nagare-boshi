export default defineEventHandler(async () => {
  const deck = await Deck.create({});
  return String(deck._id);
});
