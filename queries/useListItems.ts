export const useListItems = defineQuery(() => {
  const { deckId } = useDeck();

  const debouncedSearch = ref("");
  const search = useDebounce(debouncedSearch, 500);

  const { data: listItems, ...query } = useQuery({
    key: () => ["listItems", deckId.value || "", search.value],
    enabled: () => !!deckId.value,
    query: async () =>
      await $fetch<ListItem[]>("/api/list/list-items", {
        params: { deckId: deckId.value, search: search.value },
      }),
  });

  return {
    listItems,
    debouncedSearch,
    ...query,
  };
});
