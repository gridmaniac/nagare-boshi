import { readFile, writeFile } from "fs/promises";
import path from "path";

export default defineEventHandler(async (event) => {
  const jmdictPath = path.join(
    process.cwd(),
    "/",
    "jmdict-examples-eng-3.6.1 2.json"
  );

  const jmdict: JMdict = JSON.parse(await readFile(jmdictPath, "utf-8"));
  const JMDictHashMap = jmdict?.words.reduce((acc, word) => {
    acc[word.id] = {
      id: word.id,
      text: word.kanji[0]?.text,
      kana: word.kana[0]?.text,
      gloss: word.sense[0]?.gloss.map((gloss) => gloss?.text),
      examples:
        word.sense[0]?.examples.map((example) => ({
          sentence: example.sentences[0]?.text,
          translation: example.sentences[1]?.text,
        })) || [],
    };

    return acc;
  }, {} as Record<string, Card>);

  await writeFile("./dict/jmdict-hashmap.json", JSON.stringify(JMDictHashMap));

  return {};
});
