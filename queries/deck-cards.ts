export const useDeckCard = defineQuery(() => {
  const { deckId } = useDeck();

  const { data: deckCard, ...query } = useQuery<DeckCard>({
    key: () => ["deck-card", deckId.value],
    enabled: () => !!deckId.value,
    query: async () =>
      await $fetch("/api/decks/next-card", {
        params: { deckId: deckId.value },
      }),
  });

  return {
    deckCard,
    ...query,
  };
});
