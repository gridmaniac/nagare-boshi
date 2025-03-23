export const useSubmitChallenge = defineMutation(() => {
  const { mutateAsync: submitChallenge, ...mutation } = useMutation({
    mutation: async (submit: ChallengeSubmit) => {
      await $fetch("/api/deck/challenge-submit", {
        method: "POST",
        body: submit,
      });
    },
  });

  return {
    ...mutation,
    submitChallenge,
  };
});
