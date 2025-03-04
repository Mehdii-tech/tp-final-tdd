const main = () => {
  console.log("Hello, World!");
};

main();

export enum Suit {
  HEARTS = "♥",
  DIAMONDS = "♦",
  CLUBS = "♣",
  SPADES = "♠",
}

export enum Rank {
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
  ACE = "A",
}

export const RANK_VALUES: { [key in Rank]: number } = {
  [Rank.TWO]: 2,
  [Rank.THREE]: 3,
  [Rank.FOUR]: 4,
  [Rank.FIVE]: 5,
  [Rank.SIX]: 6,
  [Rank.SEVEN]: 7,
  [Rank.EIGHT]: 8,
  [Rank.NINE]: 9,
  [Rank.TEN]: 10,
  [Rank.JACK]: 11,
  [Rank.QUEEN]: 12,
  [Rank.KING]: 13,
  [Rank.ACE]: 14,
};

export interface Card {
  suit: Suit;
  rank: Rank;
}

export enum HandRank {
  HIGH_CARD = "HIGH_CARD",
  ONE_PAIR = "ONE_PAIR",
  TWO_PAIR = "TWO_PAIR",
  THREE_OF_A_KIND = "THREE_OF_A_KIND",
  STRAIGHT = "STRAIGHT",
  FLUSH = "FLUSH",
  FULL_HOUSE = "FULL_HOUSE",
  FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
  STRAIGHT_FLUSH = "STRAIGHT_FLUSH",
  ROYAL_FLUSH = "ROYAL_FLUSH",
}
