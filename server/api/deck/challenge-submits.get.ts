export default defineEventHandler(async (event) => {
  const { deckId } = getQuery(event);
  const submits = await ChallengeSubmit.find(
    {
      deckId,
    },
    "-_id challengeId"
  );

  return submits.map((submit) => submit.challengeId);
});
