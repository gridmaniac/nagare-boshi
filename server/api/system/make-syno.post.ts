import * as csv from "csv-parse";
import path from "path";
import { readFile, writeFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const jmdictPath = path.join(process.cwd(), "/", "synonyms.txt");

  const fileContent = await readFile(jmdictPath, "utf-8");
  const jsonArray = await csv.parse(fileContent, {
    delimiter: ",",
    skip_empty_lines: true,
  });
  const test = await jsonArray.toArray();
  const blacklist = [
    "人名",
    "キャラ",
    "国名",
    "地名",
    "観光",
    "店名",
    "大学名",
  ];

  const filtered = test
    .filter((item) => item[6] !== "1")
    .filter((item) => {
      return !blacklist.some((word) => item[7].includes(word));
    });

  const hashmap = filtered.reduce((acc, item) => {
    const key = item[8];
    if (!acc[key]) {
      acc[key] = item[0];
    }

    return acc;
  }, {} as Record<string, string>);

  const entries = Object.entries(hashmap);
  const values = Object.values(hashmap);

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const indexes: number[] = [];
    for (let j = 0; j < values.length; j++) {
      if (values[j] === value && i !== j) {
        indexes.push(j);
      }
    }
    hashmap[key] = indexes;
  }

  await writeFile("./synonyms-hashmap.json", JSON.stringify(hashmap));

  return {};
});
