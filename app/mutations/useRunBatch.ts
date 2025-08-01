export const useRunBatch = defineMutation(() => {
  const { getCard, ensureReady } = useDictionary();
  const queryCache = useQueryCache();

  const isStopped = ref(false);
  const isReady = ref(true);
  const progress = ref(0);
  const newCount = ref(0);
  const pageSize = 20;

  const stopBatch = () => {
    isStopped.value = true;
  };

  const { mutateAsync: runBatch, ...mutation } = useMutation({
    mutation: async (batch: Batch) => {
      await ensureReady();

      const deckCards = await $fetch<string[]>("/api/deck/deck-cards", {
        params: { deckId: batch.deckId },
      });

      const matches = batch.items.filter((item) => {
        const card = getCard(item.value);
        return !!card && !deckCards.includes(card.id);
      });

      const pages = Math.ceil(matches.length / pageSize);
      isStopped.value = false;
      isReady.value = false;
      progress.value = 0;

      for (let i = 0; i < pages; i++) {
        await $fetch("/api/deck/batch", {
          method: "POST",
          body: {
            ...batch,
            items: matches.slice(i * pageSize, (i + 1) * pageSize),
          },
        });

        if (isStopped.value) break;

        progress.value = Math.round(((i + 1) / pages) * 100);
        isReady.value = true;
      }

      newCount.value = matches.length;

      queryCache.invalidateQueries({
        key: ["cards", batch.deckId],
      });
    },
  });

  return {
    ...mutation,
    runBatch,
    stopBatch,
    isReady,
    progress,
    newCount,
  };
});
