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

export const ListItem = defineMongooseModel<ListItem>("ListItem", {
  deckId: String,
  text: String,
  meaning: String,
  tags: String,
  sentences: String,
  translations: String,
  reviewNum: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = defineMongooseModel<Chat>("Chat", {
  chatId: String,
  deckId: String,
});
