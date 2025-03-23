let challenges: Record<string, Challenge[]> | null = null;

export const useChallenges = () => {
  const prepareChallenges = async () => {
    if (!challenges) {
      challenges = {};

      const n1Grammar = await $fetch<Challenge[]>("/challenges/GrammarN1.json");
      const n1Vocabulary = await $fetch<Challenge[]>(
        "/challenges/VocabularyN1.json"
      );

      challenges["n1"] = [...n1Grammar, ...n1Vocabulary];

      const n2Grammar = await $fetch<Challenge[]>("/challenges/GrammarN2.json");
      const n2Vocabulary = await $fetch<Challenge[]>(
        "/challenges/VocabularyN2.json"
      );

      challenges["n2"] = [...n2Grammar, ...n2Vocabulary];

      const n3Grammar = await $fetch<Challenge[]>("/challenges/GrammarN3.json");
      const n3Vocabulary = await $fetch<Challenge[]>(
        "/challenges/VocabularyN3.json"
      );

      challenges["n3"] = [...n3Grammar, ...n3Vocabulary];

      const n4Grammar = await $fetch<Challenge[]>("/challenges/GrammarN4.json");
      const n4Vocabulary = await $fetch<Challenge[]>(
        "/challenges/VocabularyN4.json"
      );

      challenges["n4"] = [...n4Grammar, ...n4Vocabulary];

      const n5Grammar = await $fetch<Challenge[]>("/challenges/GrammarN5.json");
      const n5Vocabulary = await $fetch<Challenge[]>(
        "/challenges/VocabularyN5.json"
      );

      challenges["n5"] = [...n5Grammar, ...n5Vocabulary];
    }
  };

  const getRandomChallenge = async (level: string, exclude: number[]) => {
    await prepareChallenges();

    const filteredChallenges = challenges?.[level].filter(
      (challenge) => !exclude.includes(challenge.id)
    );

    return filteredChallenges?.[
      Math.floor(Math.random() * filteredChallenges.length)
    ];
  };

  return {
    getRandomChallenge,
  };
};
