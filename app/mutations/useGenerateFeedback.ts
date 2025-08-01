export const useGenerateFeedback = defineMutation(() => {
  const { mutateAsync: generateFeedback, ...mutation } = useMutation({
    mutation: async (answer: ChallengeAnswer) => {
      const { feedback } = await $fetch<Feedback>("/api/generate-feedback", {
        method: "POST",
        body: answer,
      });

      return feedback;
    },
  });

  return {
    ...mutation,
    generateFeedback,
  };
});
