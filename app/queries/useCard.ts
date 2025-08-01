export const useCard = defineQuery(() => {
  const { deckCard } = useDeckCard();
  const { getCard, isReady } = useDictionary();

  const { data: card, ...query } = useQuery({
    key: () => ["card", deckCard.value?.cardId || ""],
    enabled: () => isReady.value && !!deckCard.value,
    query: async () => {
      if (!deckCard.value) return null;

      return getCard(deckCard.value.cardId);
    },
  });

  return {
    card,
    ...query,
  };
});
