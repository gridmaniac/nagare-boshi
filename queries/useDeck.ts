export const useDeck = defineQuery(() => {
  const deckId = ref("");

  const { data: deck, ...query } = useQuery({
    key: () => ["deck", deckId.value],
    enabled: () => !!deckId.value,
    staleTime: Infinity,
    query: async () =>
      await $fetch<Deck>("/api/decks", {
        params: { deckId: deckId.value },
      }),
  });

  return {
    deck,
    deckId,
    ...query,
  };
});
