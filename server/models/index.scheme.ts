import { defineMongooseModel } from "#nuxt/mongoose";

export const Deck = defineMongooseModel<Deck>("Deck", {});

export const DeckCard = defineMongooseModel<DeckCard>("DeckCard", {
  deckId: String,
  cardId: String,
  box: Number,
  reviewAfter: Date,
  reviewNum: Number,
  note: String,
  delisted: Boolean,
});
