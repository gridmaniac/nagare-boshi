export const useDeckCard = defineQuery(() => {
  const { deckId } = useDeck();
  const exclude = ref<string>();

  const { data: deckCard, ...query } = useQuery({
    key: () => ["deck-card", deckId.value],
    enabled: () => !!deckId.value,
    query: async () => {
      console.log(exclude.value);
      const deckCard = await $fetch<DeckCard>("/api/deck/deck-card", {
        params: { deckId: deckId.value, exclude: exclude.value },
      });

      exclude.value = deckCard?._id;
      return deckCard;
    },
  });

  return {
    deckCard,
    ...query,
  };
});
