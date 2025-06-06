import path from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const { word } = getQuery(event);
  const synonymsPath = path.join(
    process.cwd(),
    "/public",
    "synonyms-hashmap.json"
  );

  const fileContent = await readFile(synonymsPath, "utf-8");
  const hashmap = JSON.parse(fileContent);

  const indexes = hashmap[word as string] || [];
  return {
    synonyms: indexes.map((index: number) => Object.keys(hashmap)[index]),
  };
});
