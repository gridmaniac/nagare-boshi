export default defineEventHandler(async (event) => {
  const submit = await readBody<ChallengeSubmit>(event);
  await ChallengeSubmit.updateOne(
    {
      deckId: submit.deckId,
      challengeId: submit.challengeId,
    },
    submit,
    { upsert: true }
  );
});
