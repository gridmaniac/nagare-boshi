export const useSendReview = defineMutation(() => {
  const { mutateAsync: sendReview, ...mutation } = useMutation({
    mutation: async (review: Review) => {
      await $fetch("/api/deck-card/review", {
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
