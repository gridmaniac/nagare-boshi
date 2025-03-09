export const useNote = defineMutation(() => {
  const { mutateAsync: addNote, ...mutation } = useMutation({
    mutation: async (note: Note) => {
      await $fetch("/api/note", {
        method: "POST",
        body: note,
      });
    },
  });

  return {
    ...mutation,
    addNote,
  };
});
