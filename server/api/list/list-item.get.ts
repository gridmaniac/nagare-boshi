import { isValidObjectId } from "mongoose";

export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);

  if (!isValidObjectId(deckId)) return null;
  const listItem = await ListItem.findOne({
    deckId,
  }).sort({ reviewNum: 1 });

  if (!listItem) return null;

  listItem.reviewNum++;
  await listItem.save();

  return listItem;
});
