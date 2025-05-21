import { isValidObjectId } from "mongoose";

export default defineEventHandler(async (event) => {
  const { deckId, search } = getQuery(event);

  if (!isValidObjectId(deckId)) return null;

  const listItems = await ListItem.find({
    deckId,
    $or: [
      { text: { $regex: search, $options: "i" } },
      { meaning: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ],
  }).sort({ text: 1 });
  return listItems;
});
