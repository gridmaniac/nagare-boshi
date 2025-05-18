import { BOX_LIMIT } from "@/utils/constants";

export default defineEventHandler(async (event) => {
  const { deckId, exclude } = getQuery(event);

  const nextCard = await DeckCard.find({
    _id: { $ne: exclude },
    deckId,
    box: { $lt: BOX_LIMIT },
    reviewAfter: { $lt: new Date() },
    delisted: { $ne: true },
  })
    .sort({ box: -1 })
    .limit(1);

  return nextCard?.[0];
});
