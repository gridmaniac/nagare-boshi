export const useTokens = () => {
  const sentence = ref("");
  const { tokenize, ensureReady } = useDictionary();

  const { data: tokens, ...query } = useQuery({
    key: () => ["sentence", sentence.value],
    staleTime: 0,
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
};
