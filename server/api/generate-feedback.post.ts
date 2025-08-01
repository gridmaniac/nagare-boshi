import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { sentence, translation, alternativeTranslation } =
    await readBody(event);

  const openai = new OpenAI({
    apiKey: config.openaiApiKey,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a Japanese language teacher. Your task is to help students improve their Japanese translation skills by providing feedback on their translations.`,
      },
      {
        role: "user",
        content: `Original sentence was "${sentence}" and its translation was "${translation}". Now I made my translation "${alternativeTranslation}". Give me short feedback in Russian on my translation compared to original in JSON format like { feedback: "..." }`,
      },
    ],
  });

  return JSON.parse(response.choices[0]?.message.content || "{}");
});
