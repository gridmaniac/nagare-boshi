export const useSentence = defineQuery(() => {
  const sentence = ref("");

  const { data: tokens, ...query } = useQuery<Token[]>({
    key: () => ["sentence", sentence.value],
    enabled: () => !!sentence.value,
    query: async () =>
      await $fetch("/api/sentence", {
        params: { sentence: sentence.value },
      }),
  });

  return {
    tokens,
    sentence,
    ...query,
  };
});
