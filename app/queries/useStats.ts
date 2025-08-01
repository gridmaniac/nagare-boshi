export const useStats = defineQuery(() => {
  const { deckId } = useDeck();

  const { data: stats, ...query } = useQuery({
    key: () => ["stats", deckId.value || ""],
    enabled: () => !!deckId.value,
    staleTime: Infinity,
    query: async () =>
      await $fetch<Stats>("/api/deck/stats", {
        params: { deckId: deckId.value },
      }),
  });

  return {
    stats,
    ...query,
  };
});
