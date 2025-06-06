import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import { delay } from "@/utils/delay";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const token = config.telegramBotToken;

  // Create a new TelegramBot instance (without polling)
  const bot = new TelegramBot(token);

  const openai = new OpenAI({
    apiKey: config.openaiApiKey,
  });

  const chats = await Chat.find({});
  for (const chat of chats) {
    const listItem = await ListItem.findOne({
      deckId: chat.deckId,
    }).sort({ reviewNum: 1 });

    if (!listItem) {
      continue;
    }

    let examples = "";

    const items = listItem.sentences?.split("。") || [];
    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      examples += `${items[i].trim()}。\n`;
      examples += `<i>${
        listItem.translations?.split(".")[i].trim() || ""
      }.</i>\n\n`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `You are a text to emoji converter. Your task is to give just one emoji that best describes the text. Output strictly one emoji.`,
        },
        {
          role: "user",
          content: `${listItem.text}`,
        },
      ],
    });

    const emoji = response.choices[0].message.content || "";

    await bot.sendMessage(
      chat.chatId,
      `${emoji} <b>${listItem.text}</b>\n\n${examples}<pre>${listItem.meaning}  </pre>\n<a href="https://nagare-boshi.vercel.app/${chat.deckId}/list?search=${listItem.text}">Show more</a>\n`,
      { parse_mode: "HTML", disable_web_page_preview: true }
    );

    listItem.reviewNum++;
    await listItem.save();
    await delay(1000);
  }
});
