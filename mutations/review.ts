export const useReview = defineMutation(() => {
  const { mutateAsync: sendReview, ...mutation } = useMutation({
    mutation: async (review: Review) => {
      await $fetch("/api/review", {
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
