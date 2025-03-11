export const useDeckCard = defineQuery(() => {
  const { deckId, deck } = useDeck();

  const exclude = ref<string>();

  const { data: deckCard, ...query } = useQuery({
    key: () => ["deck-card", deckId.value],
    enabled: () => !!deck.value,
    query: async () => {
      const deckCard = await $fetch<DeckCard>("/api/decks/next-card", {
        params: { deckId: deckId.value, exclude: exclude.value },
      });

      exclude.value = deckCard._id;
      return deckCard;
    },
  });

  return {
    deckCard,
    ...query,
  };
});
