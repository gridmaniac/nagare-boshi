interface Deck {
  _id: string;
}

interface Card {
  id: string;
  text: string;
  kana: string;
  text: string;
  kana: string;
  gloss: string[];
  examples: Example[];
}

interface DeckCard {
  _id: string;

  deckId: string;
  cardId: string;

  box: number;
  reviewAfter: Date;
  reviewNum: number;

  note: string;
  delisted: boolean;
}

interface Review {
  cardId: string;
  choice: ReviewChoice;
}

type ReviewChoice = "delist" | "good" | "cake";

interface Note {
  cardId: string;
  text: string;
}

interface Stats {
  total: number;
  fresh: number;
  review: number;
  retention: number;
}

interface Example {
  sentence?: string;
  translation?: string;
}

interface Token {
  text: string;
  kana?: string;
  gloss?: string;
  hasMatch: boolean;
}

interface PreBatch {
  items: Item[];
}

interface Batch extends PreBatch {
  deckId: string;
}

interface Item {
  timestamp: Date;
  value: string;
}

interface ImiwaItem {
  atime: Date;
  value: string;
}

interface Meta {
  isCommon: boolean;
  jlpt: string | null;
}

interface ListItem {
  _id?: string;
  deckId: string;
  text: string;
  meaning: string;
  tags: string;
  sentences?: string;
  translations?: string;
  reviewNum?: number;
}
