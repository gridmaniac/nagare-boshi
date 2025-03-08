export const useStats = defineQuery(() => {
  const { deck } = useDeck();

  const { data: stats, ...query } = useQuery<Stats>({
    key: () => ["stats", deck.value?._id || ""],
    enabled: () => !!deck.value,
    query: async () =>
      await $fetch("/api/stats", {
        params: { deckId: deck.value?._id },
      }),
  });

  return {
    stats,
    ...query,
  };
});
