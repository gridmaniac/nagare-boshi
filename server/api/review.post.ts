import { clamp } from "@/utils/numbers";

const boxLimit = 5;
const getNextDate = (box: number) => {
  switch (box) {
    case 1:
      return new Date(Date.now() + 1000 * 60 * 60 * 24);
    case 2:
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
    case 3:
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    case 4:
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    case 5:
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * 90);
  }

  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * Math.pow(3, box - 3));
};

export default defineEventHandler(async (event) => {
  const review = await readBody<Review>(event);

  const deckCard = await DeckCard.findById(review.cardId);
  if (!deckCard) return;

  switch (review.choice) {
    case "hard":
      if (deckCard.box < 3) deckCard.box = 1;
      else deckCard.box = clamp(deckCard.box - 2, 0, boxLimit);

      break;
    case "good":
      deckCard.box = clamp(deckCard.box + 1, 0, boxLimit);

      break;
    case "easy":
      deckCard.box = clamp(deckCard.box + 2, 0, boxLimit);
      break;
  }

  deckCard.reviewAfter = getNextDate(deckCard.box);
  deckCard.reviewNum++;

  await deckCard.save();
});
