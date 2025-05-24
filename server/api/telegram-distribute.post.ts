import TelegramBot from "node-telegram-bot-api";
import { delay } from "~/utils/delay";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const token = config.telegramBotToken;

  // Create a new TelegramBot instance (without polling)
  const bot = new TelegramBot(token);

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
      examples += `<i>${items[i]}。</i>\n`;
      examples += `${listItem.translations?.split(".")[i] || ""}.\n\n`;
    }

    await bot.sendMessage(
      chat.chatId,
      `<b>${listItem.text}</b>\n\n${examples}<pre>${listItem.meaning}</pre>\n<a href="https://nagare-boshi.vercel.app/67cdd499c7f4356f86f02e98/list?search=${listItem.text}">Show more</a>\n`,
      { parse_mode: "HTML" }
    );

    listItem.reviewNum++;
    await listItem.save();
    await delay(1000);
  }
});
