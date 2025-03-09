export const useCreateDeck = defineMutation(() => {
  const { mutateAsync: createDeck, ...mutation } = useMutation({
    mutation: async () => {
      const deckId = await $fetch<string>("/api/decks", {
        method: "POST",
      });

      return deckId;
    },
  });

  return {
    ...mutation,
    createDeck,
  };
});
