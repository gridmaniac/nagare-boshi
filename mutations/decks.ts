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

export const useRunBatch = defineMutation(() => {
  const isStopped = ref(false);
  const isReady = ref(true);
  const progress = ref(0);
  const pageSize = 20;

  const stopBatch = () => {
    isStopped.value = true;
  };

  const { mutateAsync: runBatch, ...mutation } = useMutation({
    mutation: async (batch: Batch) => {
      const pages = Math.ceil(batch.items.length / pageSize);
      isStopped.value = false;
      isReady.value = false;
      progress.value = 0;

      for (let i = 0; i < pages; i++) {
        await $fetch("/api/decks/batch", {
          method: "POST",
          body: {
            ...batch,
            items: batch.items.slice(i * pageSize, (i + 1) * pageSize),
          },
        });

        if (isStopped.value) break;

        progress.value = Math.round(((i + 1) / pages) * 100);
        isReady.value = true;
      }
    },
  });

  return {
    ...mutation,
    runBatch,
    stopBatch,
    isReady,
    progress,
  };
});
