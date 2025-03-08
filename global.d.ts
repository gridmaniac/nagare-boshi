interface Deck {}

interface Card {
  id: string;
  text: string;
  kana: string;
  gloss: string[];
  examples: Example[];
}

interface DeckCard {
  deckId: string;
  cardId: string;

  box: number;
  reviewAfter: Date;
  reviewNum: number;
}

type Source = "imiwa";

interface Example {
  sentence: string;
  translation: string;
}

interface Token {
  text: string;
  kana?: string;
  gloss?: string;
  hasMatch: boolean;
}

interface PreBatch {
  source: Source;
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

interface JMdict {
  words: JMdictWord[];
}

interface JMdictWord {
  id: string;
  kanji: {
    text: string;
  }[];
  kana: {
    text: string;
  }[];
  sense: {
    gloss: {
      text: string;
    }[];
    examples: {
      sentences: {
        land: string;
        text: string;
      }[];
    }[];
  }[];
}
