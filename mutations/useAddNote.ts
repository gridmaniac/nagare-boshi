export const useAddNote = defineMutation(() => {
  const queryCache = useQueryCache();
  const { mutateAsync: addNote, ...mutation } = useMutation({
    mutation: async (note: Note) => {
      const deckCard = await $fetch<DeckCard>("/api/note", {
        method: "POST",
        body: note,
      });

      queryCache.setQueryData(["deck-card", deckCard.deckId], deckCard);
    },
  });

  return {
    ...mutation,
    addNote,
  };
});
