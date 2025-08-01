export const useTokens = () => {
  const sentence = ref("");
  const { tokenize, isReady } = useDictionary();

  const { data: tokens, ...query } = useQuery({
    key: () => ["sentence", sentence.value],
    staleTime: 0,
    enabled: () => isReady.value && !!sentence.value,
    query: async () => tokenize(sentence.value),
  });

  return {
    tokens,
    sentence,
    ...query,
  };
};
