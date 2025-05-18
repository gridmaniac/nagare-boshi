import { BOX_LIMIT } from "@/utils/constants";

export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  const total = await DeckCard.countDocuments({ deckId });
  const fresh = await DeckCard.countDocuments({
    deckId,
    box: 0,
    delisted: { $ne: true },
  });

  const review = await DeckCard.countDocuments({
    deckId,
    box: { $gt: 0, $lt: BOX_LIMIT },
    reviewAfter: { $lt: new Date() },
    delisted: { $ne: true },
  });

  const retention = await DeckCard.countDocuments({
    deckId,
    box: { $gt: BOX_LIMIT - 1 },
  });

  return {
    total,
    fresh,
    review,
    retention,
  };
});
