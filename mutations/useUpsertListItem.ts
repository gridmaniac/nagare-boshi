export const useUpsertListItem = defineMutation(() => {
  const { mutateAsync: upsertListItem, ...mutation } = useMutation({
    mutation: async (listItem: ListItem) => {
      await $fetch("/api/list/list-item", {
        method: "POST",
        body: listItem,
      });
    },
  });

  return {
    ...mutation,
    upsertListItem,
  };
});
