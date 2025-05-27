import { isValidObjectId } from "mongoose";

const PAGE_SIZE = 5;

export default defineEventHandler(async (event) => {
  const { deckId, search, page = 1 } = getQuery(event);

  if (!isValidObjectId(deckId)) return null;

  const query = {
    deckId,
    $or: [
      { text: { $regex: search, $options: "i" } },
      { meaning: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ],
  };

  const total = await ListItem.countDocuments(query);
  const listItems = await ListItem.find(query)
    .sort({ text: 1 })
    .skip((Number(page) - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  return {
    list: listItems,
    total,
    page: Number(page),
    pageSize: PAGE_SIZE,
    hasNextPage: total > Number(page) * PAGE_SIZE,
  };
});
