import fs from "fs";
import path from "path";
import { BOX_LIMIT } from "@/utils/constants";

export default defineEventHandler(async () => {
  try {
    // Get all mastered deck cards (box > BOX_LIMIT - 1)
    const masteredCards = await DeckCard.find({
      box: { $gt: BOX_LIMIT - 1 },
      delisted: { $ne: true },
    });

    // Load the dictionary mapping
    const dictionaryPath = path.join(
      process.cwd(),
      "public",
      "jmdict-hashmap.json",
    );
    const dictionary: Record<string, Card> = JSON.parse(
      fs.readFileSync(dictionaryPath, "utf-8"),
    );

    // Map card IDs to words only
    const masteredWords = masteredCards
      .map((card) => {
        const dictEntry = dictionary[card.cardId];
        if (!dictEntry) return null;
        return dictEntry.text || dictEntry.kana;
      })
      .filter((word): word is string => word !== null);

    // Save to markdown file
    const mdContent = `# Mastered Words\n\n${masteredWords.join("\n")}`;

    fs.writeFileSync(path.join(process.cwd(), "mastered-words.md"), mdContent);

    return {};
  } catch (error) {
    console.error("Error getting mastered words:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to get mastered words",
    });
  }
});
