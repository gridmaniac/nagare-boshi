jmdict-eng.json -> Card

Card -> {
id: string,
text: string,
kana: string,
gloss: string[],
examples: Example[],
sourceId: string,
source: "jmdict"
}

Deck -> {
\_id: string
}

DeckCard -> {
\_id: string,
deckId: string,
cardId: string,
box: number,
reviewAfter: Date,
reviewNum: number,
note: string,
delisted: boolean
}

Review -> {
cardId: string,
choice: "delist" | "good" | "cake"
}

# Box System

box: 0 -> new card, date card added
box: 1 -> review next day (24h)
box: 2 -> review in 1 week (7 days)
box: 3 -> review in 1 month (30 days)
box: 4 -> review in 1 month (30 days)

# Review Flow

1. Card starts in box 0 when added to deck
2. Review choices affect box progression:
   - "delist" -> card is marked as delisted
   - "good" -> move up one box (clamped to BOX_LIMIT)
   - "cake" -> move directly to BOX_LIMIT

3. Next review date is set based on box:
   - box 1 -> next day (24h)
   - box 2 -> 1 week (7 days)
   - box 3 -> 1 month (30 days)
   - box 4 -> 1 month (30 days)

4. Review rules:
   - reviewNum increments on every review
   - Cannot review before reviewAfter date
   - Delisted cards are excluded from review queue
   - Box progression is clamped to BOX_LIMIT

# Import Flow

1. For every entry in new uploaded .imiwa file:
   - Obtain relation in jmdict by id
   - Skip invalid cards (require 1+ def, 1+ example, kana)
   - Log errors for skipped cards

2. Card Creation:
   - Check if card exists by sourceId
   - Create new card if not found
   - Must have text, kana, gloss, examples

3. Deck Management:
   - Create new deck if needed
   - Get existing deck if deckId provided
   - Generate DeckCards with initial state:
     - box: 0
     - reviewNum: 0
     - reviewAfter: timestamp of addition
     - delisted: false
