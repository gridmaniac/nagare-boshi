import { clamp } from "@/utils/numbers";
import { BOX_LIMIT } from "@/utils/constants";

const getNextDate = (box: number) => {
  switch (box) {
    case 1:
      return new Date(Date.now() + 1000 * 60 * 60 * 24);
    case 2:
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    case 3:
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  }

  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
};

export default defineEventHandler(async (event) => {
  const review = await readBody<Review>(event);

  const deckCard = await DeckCard.findById(review.cardId);
  if (!deckCard) return;

  if (deckCard.reviewAfter > new Date()) return;

  switch (review.choice) {
    case "delist":
      deckCard.delisted = true;

      break;
    case "good":
      deckCard.box = clamp(deckCard.box + 1, 0, BOX_LIMIT);

      break;
    case "cake":
      deckCard.box = BOX_LIMIT;
      break;
  }

  deckCard.reviewAfter = getNextDate(deckCard.box);
  deckCard.reviewNum++;

  await deckCard.save();
});
