export const useChallenge = defineQuery(() => {
  const { data: challenge, ...query } = useQuery({
    key: () => ["challenge"],
    staleTime: Infinity,
    query: async () =>
      await $fetch<Challenge>("/api/generate-challenge", { method: "POST" }),
  });

  return {
    challenge,
    ...query,
  };
});
