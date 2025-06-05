export const useRelatedCards = defineQuery(() => {
  const { card } = useCard();
  const { cards } = useCards();
  const { findRelatedCards, findSynonyms, isReady } = useDictionary();

  const { data: relatedCards, ...query } = useQuery({
    key: () => ["related-cards", card.value?.text || ""],
    staleTime: 0,
    enabled: () => isReady.value && !!cards.value && !!card.value,
    query: async () => {
      if (!card.value || !cards.value)
        return {
          list: [],
          synonyms: [],
        };

      return {
        list: findRelatedCards(cards.value, card.value.text),
        synonyms: findSynonyms(card.value.text),
      };
    },
  });

  return {
    relatedCards,
    ...query,
  };
});
