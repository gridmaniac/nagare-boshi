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
      await bot.sendMessage(
        chatId,
        `<b>〜あまり</b>\n\n<i>喜びのあまり、万歳と叫びたい思いだった。</i>\nI wanted to shout with joy.\n\n<i>多くの人は自立を求めるあまり、わがままな理由で離婚しようとする。</i>\nMany people leave their marriages for selfish reasons in the name of independence.\n\n<pre>настолько, что</pre>\n<a href="http://www.google.com/">Show more</a>\n`,
        { parse_mode: "HTML" }
      );
    }

    // Handle /start command
    if (text && text.startsWith("/start")) {
      await bot.sendMessage(chatId, "Hi, i am bot, how can i help you?");
    }
  }

  return { status: "ok", message };
});
