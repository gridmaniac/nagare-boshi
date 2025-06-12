import { isValidObjectId } from "mongoose";

export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  if (!isValidObjectId(deckId)) return null;
  const listItem = await ListItem.findOne({
    deckId,
  }).sort({ updatedAt: 1 });

  if (!listItem) return null;

  listItem.reviewNum++;
  listItem.updatedAt = new Date();
  await listItem.save();

  return listItem;
});
