export const useToken = defineQuery(() => {
  const selectedToken = ref("");

  const { data: meaning, ...query } = useQuery<Card>({
    key: () => ["token", selectedToken.value],
    enabled: () => !!selectedToken.value,
    query: async () =>
      await $fetch("/api/token", {
        params: { token: selectedToken.value },
      }),
  });

  return {
    meaning,
    selectedToken,
    ...query,
  };
});
