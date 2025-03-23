export const useChallenge = defineQuery(() => {
  const level = ref("");

  const { deckId } = useDeck();
  const { getRandomChallenge } = useChallenges();

  const { data: challenge, ...query } = useQuery({
    key: () => ["challenge", deckId.value, level.value],
    enabled: () => !!deckId.value,
    staleTime: 0,
    query: async () => {
      const exclude = await $fetch<number[]>("/api/deck/challenge-submits", {
        params: { deckId: deckId.value },
      });

      return await getRandomChallenge(level.value, exclude);
    },
  });

  return {
    level,
    challenge,
    ...query,
  };
});
