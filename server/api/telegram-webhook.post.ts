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
        `
          <p><b>〜あまり</b></p>
          <p>
            <i>喜びのあまり、万歳と叫びたい思いだった。
            多くの人は自立を求めるあまり、わがままな理由で離婚しようとする。</i>
          </p>

          <p>I wanted to shout with joy.
          Many people leave their marriages for selfish reasons in the name of independence.</p>

          <pre>настолько, что</pre>
          <a href="http://www.google.com/">Show more</a>
        `
      );
    }

    // Handle /start command
    if (text && text.startsWith("/start")) {
      await bot.sendMessage(chatId, "Hi, i am bot, how can i help you?");
    }
  }

  return { status: "ok", message };
});
