import { Types } from "mongoose";

export default defineEventHandler(async (event) => {
  const listItem = await readBody<ListItem>(event);

  await ListItem.updateOne(
    {
      _id: listItem._id ?? new Types.ObjectId(),
    },
    listItem,
    { upsert: true },
  );
});
