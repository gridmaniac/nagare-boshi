export const useTextMeta = defineQuery(() => {
  const text = ref("");

  const { data: meta, ...query } = useQuery({
    key: () => ["meta", text.value || ""],
    enabled: () => !!text.value,
    staleTime: Infinity,
    query: async () =>
      await $fetch<Meta>("/api/text-meta", {
        params: { text: text.value },
      }),
  });

  return {
    text,
    meta,
    ...query,
  };
});
