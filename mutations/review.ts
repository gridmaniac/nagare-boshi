export const useReview = defineMutation(() => {
  const { mutateAsync: sendReview, ...mutation } = useMutation({
    mutation: async (review: Review) => {
      await $fetch<DeckCard>("/api/review", {
        method: "POST",
        body: review,
      });
    },
  });

  return {
    ...mutation,
    sendReview,
  };
});
