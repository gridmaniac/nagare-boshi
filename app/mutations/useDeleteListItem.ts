export const useDeleteListItem = defineMutation(() => {
  const { deckId } = useDeck();
  const queryCache = useQueryCache();

  const { mutateAsync: deleteListItemById, ...mutation } = useMutation({
    mutation: async (id: string) => {
      await $fetch("/api/list/list-item", {
        method: "DELETE",
        params: { id },
      });

      queryCache.invalidateQueries({ key: ["listItems", deckId.value] });
    },
  });

  return {
    ...mutation,
    deleteListItemById,
  };
});
