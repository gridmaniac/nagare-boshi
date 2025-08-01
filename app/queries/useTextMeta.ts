export const useTextMeta = defineQuery(() => {
  const text = ref("");

  const { data: meta, ...query } = useQuery({
    key: () => ["meta", text.value || ""],
    enabled: () => !!text.value && import.meta.env.PROD,
    staleTime: Infinity,
    query: async () => {
      const cached = localStorage.getItem(`meta-${text.value}`);
      if (cached) {
        return JSON.parse(cached);
      }

      const res = await $fetch<Meta>("/api/text-meta", {
        params: { text: text.value },
      });

      localStorage.setItem(`meta-${text.value}`, JSON.stringify(res));
      return res;
    },
  });

  return {
    text,
    meta,
    ...query,
  };
});
