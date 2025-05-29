export const useTokens = () => {
  const sentence = ref("");
  const { tokenize, isReady } = useDictionary();

  const { data: tokens, ...query } = useQuery({
    key: () => ["sentence", sentence.value],
    staleTime: 0,
    enabled: () => isReady.value && !!sentence.value,
    query: async () => {
      const result = await $fetch<KuroMoji[]>("/api/tokenize", {
        params: { text: sentence.value },
      });

      return tokenize(result);
    },
  });

  return {
    tokens,
    sentence,
    ...query,
  };
};
