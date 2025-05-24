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

    // Respond to the received message
    if (text) {
      await bot.sendMessage(chatId, `Ты сказал: ${text}`);
    }

    // Handle /start command
    if (text && text.startsWith("/start")) {
      await bot.sendMessage(chatId, "Hi, i am bot, how can i help you?");
    }
  }

  return { status: "ok", message };
});
