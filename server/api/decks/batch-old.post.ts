// import { getCachedJmdict } from "~/server/cache";

// export default defineEventHandler(async (event) => {
//   const batch = await readBody<Batch>(event);
//   const jmdict = await getCachedJmdict();

//   switch (batch.source) {
//     case "imiwa":
//       const { words } = jmdict as JMdict;

//       for (const { value, timestamp } of batch.items) {
//         const word = words.find((word) => word.id === value);

//         if (
//           word &&
//           word.kanji.length &&
//           word.kana.length &&
//           word.sense.length
//         ) {
//           const card = await Card.findOneAndUpdate(
//             {
//               source: batch.source,
//               sourceId: value,
//             },
//             {
//               source: batch.source,
//               sourceId: value,

//               text: word.kanji[0].text,
//               kana: word.kana[0].text,
//               gloss: word.sense[0].gloss.map((gloss) => gloss.text),
//               examples: word.sense[0].examples.map((example) => ({
//                 sentence: example.sentences[0].text,
//                 translation: example.sentences[1].text,
//               })),
//             },
//             {
//               upsert: true,
//               new: true,
//             }
//           );

//           const deckCard = await DeckCard.findOne({
//             deck: batch.deckId,
//             card: card._id,
//           });

//           if (!deckCard) {
//             await DeckCard.create({
//               deck: batch.deckId,
//               card: card._id,
//               box: 0,
//               reviewAfter: new Date(timestamp),
//               reviewNum: 0,
//             });
//           }
//         }
//       }
//       break;
//   }

//   return {};
// });
