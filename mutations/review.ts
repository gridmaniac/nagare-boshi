export const useReview = defineMutation(() => {
  const { mutateAsync: sendReview, ...mutation } = useMutation({
    mutation: async (review: Review) => {
      const queryCache = useQueryCache();
      const deckCard = await $fetch<DeckCard>("/api/review", {
        method: "POST",
        body: review,
      });

      if (!deckCard)
        return queryCache.invalidateQueries({
          key: ["deck-card"],
        });

      queryCache.setQueryData(["deck-card", deckCard.deckId], deckCard);
    },
  });

  return {
    ...mutation,
    sendReview,
  };
});
