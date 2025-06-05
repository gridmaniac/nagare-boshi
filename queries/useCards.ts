export const useCards = defineQuery(() => {
  const { deckId } = useDeck();
  const { getCard, isReady } = useDictionary();

  const { data: cards, ...query } = useQuery({
    key: () => ["cards", deckId.value],
    enabled: () => isReady.value && !!deckId.value,
    staleTime: Infinity,
    query: async () => {
      const deckCards = await $fetch<string[]>("/api/deck/deck-cards", {
        params: { deckId: deckId.value },
      });

      return deckCards.map((cardId) => getCard(cardId));
    },
  });

  return {
    cards,
    deckId,
    ...query,
  };
});
