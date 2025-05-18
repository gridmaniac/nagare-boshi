import JishoAPI from "unofficial-jisho-api";

export default defineEventHandler(async (event) => {
  const { text } = getQuery(event);

  const jisho = new JishoAPI();
  const { data } = await jisho.searchForPhrase(text as string);

  return {
    isCommon: data?.[0]?.is_common,
    jlpt: data?.[0]?.jlpt?.[0] || null,
  };
});
