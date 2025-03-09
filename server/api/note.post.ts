export default defineEventHandler(async (event) => {
  const note = await readBody<Note>(event);

  const deckCard = await DeckCard.findById(note.cardId);
  if (!deckCard) return;

  deckCard.note = note.text;

  await deckCard.save();
});
