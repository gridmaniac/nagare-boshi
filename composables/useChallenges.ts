let challenges: Record<string, Challenge[]> = {};

export const useChallenges = () => {
  const prepareChallenges = async (level: string) => {
    if (!challenges[level]) {
      switch (level) {
        case "n1":
          const n1Grammar = await $fetch<Challenge[]>(
            "/challenges/GrammarN1.json"
          );
          const n1Vocabulary = await $fetch<Challenge[]>(
            "/challenges/VocabularyN1.json"
          );

          challenges["n1"] = [...n1Grammar, ...n1Vocabulary];
          break;

        case "n2":
          const n2Grammar = await $fetch<Challenge[]>(
            "/challenges/GrammarN2.json"
          );
          const n2Vocabulary = await $fetch<Challenge[]>(
            "/challenges/VocabularyN2.json"
          );

          challenges["n2"] = [...n2Grammar, ...n2Vocabulary];
          break;

        case "n3":
          const n3Grammar = await $fetch<Challenge[]>(
            "/challenges/GrammarN3.json"
          );
          const n3Vocabulary = await $fetch<Challenge[]>(
            "/challenges/VocabularyN3.json"
          );

          challenges["n3"] = [...n3Grammar, ...n3Vocabulary];
          break;

        case "n4":
          const n4Grammar = await $fetch<Challenge[]>(
            "/challenges/GrammarN4.json"
          );
          const n4Vocabulary = await $fetch<Challenge[]>(
            "/challenges/VocabularyN4.json"
          );

          challenges["n4"] = [...n4Grammar, ...n4Vocabulary];
          break;

        case "n5":
          const n5Grammar = await $fetch<Challenge[]>(
            "/challenges/GrammarN5.json"
          );
          const n5Vocabulary = await $fetch<Challenge[]>(
            "/challenges/VocabularyN5.json"
          );

          challenges["n5"] = [...n5Grammar, ...n5Vocabulary];
          break;
      }
    }
  };

  const getRandomChallenge = async (level: string, exclude: number[]) => {
    await prepareChallenges(level);

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
