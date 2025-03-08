export const useDeck = defineQuery(() => {
  const { params } = useRoute();
  const deckId = ref(String(params.deckId || ""));

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
