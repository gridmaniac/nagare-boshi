export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  await ListItem.deleteOne({ _id: id });
});
