export const useDeck = defineQuery(() => {
  const deckId = ref("");

  const { data: deck, ...query } = useQuery<Deck>({
    key: () => ["deck", deckId.value],
    enabled: () => !!deckId.value,
    query: async () =>
      await $fetch("/api/decks", {
        params: { deckId: deckId.value },
      }),
  });

  return {
    deck,
    deckId,
    ...query,
  };
});
