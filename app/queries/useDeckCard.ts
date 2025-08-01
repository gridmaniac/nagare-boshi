export const useDeckCard = defineQuery(() => {
  const { deckId } = useDeck();
  const exclude = ref<string>();

  const { data: deckCard, ...query } = useQuery({
    key: () => ["deck-card", deckId.value],
    enabled: () => !!deckId.value,
    query: async () => {
      const deckCard = await $fetch<DeckCard>("/api/deck/deck-card", {
        params: { deckId: deckId.value, exclude: exclude.value },
      });

      return deckCard;
    },
  });

  return {
    deckCard,
    exclude,
    ...query,
  };
});
