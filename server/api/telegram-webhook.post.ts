import TelegramBot from "node-telegram-bot-api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.telegramBotToken;

  // Create a new TelegramBot instance (without polling)
  const bot = new TelegramBot(token);

  // Read the incoming request body
  const body = await readBody(event);

  // Extract the message
  const { message } = body;

  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    // Handle /start command
    if (text && text.startsWith("/start")) {
      const deckId = text.split(" ")[1];
      if (!deckId) {
        await bot.sendMessage(
          chatId,
          "/start <deckId>です。例：/start 64790a642406580000000000",
        );
        return;
      }

      const chat = await Chat.findOne({ chatId });
      if (chat) {
        await bot.sendMessage(chatId, "すでに購読しています。");
        return;
      }

      await Chat.create({ chatId, deckId });
      await bot.sendMessage(chatId, "よし！これから定期的に教材が届きます。");
    }

    // Handle /stop command
    if (text && text.startsWith("/stop")) {
      const chatId = message.chat.id;

      const chat = await Chat.findOne({ chatId });
      if (!chat) {
        await bot.sendMessage(chatId, "購読していません。");
        return;
      }

      await Chat.deleteOne({ chatId });
      await bot.sendMessage(chatId, "購読はキャンセルされました。");
    }
  }

  return { status: "ok", message };
});
