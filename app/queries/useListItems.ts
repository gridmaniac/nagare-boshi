export const useListItems = defineQuery(() => {
  const queryCache = useQueryCache();
  const { deckId } = useDeck();

  const debouncedSearch = ref("");
  const search = useDebounce(debouncedSearch, 500);
  const page = ref(1);
  const total = ref(0);
  const hasNextPage = ref(false);

  watch(search, (_, oldVal) => {
    queryCache.setQueryData(["listItems", deckId.value, oldVal], []);
  });

  const { data: listItems, ...query } = useQuery({
    key: () => ["listItems", deckId.value, search.value],
    enabled: () => !!deckId.value,
    staleTime: 0,
    query: async () => {
      const data = await $fetch<Paginated<ListItem[]>>("/api/list/list-items", {
        params: {
          deckId: deckId.value,
          search: search.value,
          page: page.value,
        },
      });

      const previousData = queryCache.getQueryData<ListItem[]>([
        "listItems",
        deckId.value,
        search.value,
      ]);

      hasNextPage.value = data.hasNextPage;
      total.value = data.total;

      return [
        ...(previousData ?? []),
        ...data.list.filter(
          (item) => !(previousData ?? []).some((p) => p._id === item._id),
        ),
      ];
    },
  });

  return {
    listItems,
    debouncedSearch,
    page,
    hasNextPage,
    total,
    ...query,
  };
});
