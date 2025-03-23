import * as cheerio from "cheerio";
import { writeFile } from "fs/promises";

function findMatches(
  regex: RegExp,
  str: string,
  matches: RegExpExecArray[] = []
) {
  const res = regex.exec(str);
  res && matches.push(res) && findMatches(regex, str, matches);
  return matches;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const parseChallenge = (html: string) => {
  const challenge: Challenge = {
    id: 0,
    url: "",
    questions: [],
    vocabulary: [],
    grammar: [],
  };

  const $ = cheerio.load(html);
  const blocks = $(".entry.clearfix p").toArray();

  function getAllNoneEmpty(arr: any) {
    return arr.filter((x: any) => {
      return $(x).text().trim().length > 0;
    });
  }

  for (const block of blocks) {
    const xBlock = $(block);
    if (xBlock.find("input").length === 4) {
      const elements = xBlock.contents();
      const nonEmpty = getAllNoneEmpty(elements.toArray());

      challenge.questions.push({
        text: $(nonEmpty[0]).text(),
        options: [
          $(nonEmpty[1]).text(),
          $(nonEmpty[2]).text(),
          $(nonEmpty[3]).text(),
          $(nonEmpty[4]).text(),
        ],
        answer: 0,
      });
    }

    if (xBlock.text().includes("Question 1")) {
      const regexp = /(\d+):\s(\d+)/g;

      findMatches(regexp, xBlock.text()).forEach((item, index) => {
        challenge.questions[index].answer = Number(item[2]) - 1;
      });
    }

    const regexp =
      /([一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤]+)\s?(\(.+\))?:\s(.+)/g;

    if (xBlock.text().match(regexp)) {
      findMatches(regexp, xBlock.text()).forEach((item) => {
        challenge.vocabulary.push({
          text: item[1],
          reading: item[2],
          meaning: item[3],
        });
      });
    }

    if (xBlock.find("a").length > 0) {
      const regex = /[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤]+/g;
      const link = xBlock.find("a").first();

      if (link.text().match(regex)) {
        challenge.grammar.push({
          text: link.text(),
          url: link.attr("href") || "",
        });
      }
    }
  }

  return challenge;
};

export default defineEventHandler(async (event) => {
  const challenges = [];
  const count = 24;
  const skip = [0, 5];

  for (let i = 0; i < count; i++) {
    if (skip.includes(i + 1)) continue;

    const link = `https://japanesetest4you.com/japanese-language-proficiency-test-jlpt-n5-vocabulary-exercise-${
      i + 1
    }/`;

    const page = await $fetch<string>(link);
    const challenge = parseChallenge(page);
    challenges.push({
      ...challenge,
      url: link,
      id: Date.now(),
    });

    console.log("Step", i + 1);
    await delay(1000);
  }

  const extraLinks: string[] = [];

  for (const extraLink of extraLinks) {
    const page = await $fetch<string>(extraLink);
    const challenge = parseChallenge(page);
    challenges.push({
      ...challenge,
      url: extraLink,
      id: Date.now(),
    });

    console.log("Extra");
    await delay(1000);
  }

  await writeFile("./challenges.json", JSON.stringify(challenges));

  return challenges;
});
