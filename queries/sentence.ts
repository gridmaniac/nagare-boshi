export const useSentence = defineQuery(() => {
  const sentence = ref("");
  const { tokenize, ensureReady } = useDictionary();

  const { data: tokens, ...query } = useQuery({
    key: () => ["sentence", sentence.value],
    enabled: () => !!sentence.value,
    query: async () => {
      await ensureReady();
      return tokenize(sentence.value);
    },
  });

  return {
    tokens,
    sentence,
    ...query,
  };
});
