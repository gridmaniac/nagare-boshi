export const useCard = defineQuery(() => {
  const { deckCard } = useDeckCard();

  const { data: card, ...query } = useQuery<Card>({
    key: () => ["card", deckCard.value?.cardId || ""],
    enabled: () => !!deckCard.value,
    query: async () =>
      await $fetch("/api/card", {
        params: { cardId: deckCard.value?.cardId },
      }),
  });

  return {
    card,
    ...query,
  };
});
