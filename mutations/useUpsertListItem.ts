export const useUpsertListItem = defineMutation(() => {
  const { deckId } = useDeck();
  const queryCache = useQueryCache();

  const { mutateAsync: upsertListItem, ...mutation } = useMutation({
    mutation: async (listItem: ListItem) => {
      await $fetch("/api/list/list-item", {
        method: "POST",
        body: listItem,
      });

      queryCache.invalidateQueries({ key: ["listItems", deckId.value] });
    },
  });

  return {
    ...mutation,
    upsertListItem,
  };
});
