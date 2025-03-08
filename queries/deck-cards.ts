export const useDeckCard = defineQuery(() => {
  const router = useRoute();

  const { data: deckCard, ...query } = useQuery<DeckCard>({
    key: () => ["deck-card", String(router.params.deckId)],
    enabled: () => !!router.params.deckId,
    query: async () =>
      await $fetch("/api/decks/card", {
        params: { deckId: router.params.deckId },
      }),
  });

  return {
    deckCard,
    ...query,
  };
});
