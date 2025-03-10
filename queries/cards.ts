export const useCard = defineQuery(() => {
  const { deckCard } = useDeckCard();
  const { getCard, ensureReady } = useDictionary();

  const { data: card, ...query } = useQuery<Card | null>({
    key: () => ["card", deckCard.value?.cardId || ""],
    enabled: () => !!deckCard.value,
    query: async () => {
      if (!deckCard.value) return null;

      await ensureReady();
      return getCard(deckCard.value.cardId);
    },
  });

  return {
    card,
    ...query,
  };
});
