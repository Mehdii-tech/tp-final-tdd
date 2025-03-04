import { describe, it, expect } from "vitest";
import { Suit, Rank, HandRank, RANK_VALUES } from "../types";
import { evaluateHand, compareHands } from "../index";

describe("Poker Constants", () => {
  it("should have correct suit symbols and rank values", () => {
    expect(Suit.HEARTS).toBe("♥");
    expect(RANK_VALUES[Rank.TWO]).toBe(2);
    expect(RANK_VALUES[Rank.ACE]).toBe(14);
  });
});

describe("Hand Evaluation", () => {
  it("should detect all hand types correctly", () => {
    const royalFlush = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
      { suit: Suit.HEARTS, rank: Rank.QUEEN },
      { suit: Suit.HEARTS, rank: Rank.JACK },
      { suit: Suit.HEARTS, rank: Rank.TEN },
    ];

    const straightFlush = [
      { suit: Suit.HEARTS, rank: Rank.NINE },
      { suit: Suit.HEARTS, rank: Rank.EIGHT },
      { suit: Suit.HEARTS, rank: Rank.SEVEN },
      { suit: Suit.HEARTS, rank: Rank.SIX },
      { suit: Suit.HEARTS, rank: Rank.FIVE },
    ];

    const fourOfAKind = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.ACE },
      { suit: Suit.CLUBS, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
    ];

    const fullHouse = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.ACE },
      { suit: Suit.CLUBS, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.KING },
      { suit: Suit.HEARTS, rank: Rank.KING },
    ];

    expect(evaluateHand(royalFlush)).toBe(HandRank.ROYAL_FLUSH);
    expect(evaluateHand(straightFlush)).toBe(HandRank.STRAIGHT_FLUSH);
    expect(evaluateHand(fourOfAKind)).toBe(HandRank.FOUR_OF_A_KIND);
    expect(evaluateHand(fullHouse)).toBe(HandRank.FULL_HOUSE);
  });

  it("should detect wheel straight (A-5) correctly", () => {
    const wheelStraight = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.TWO },
      { suit: Suit.CLUBS, rank: Rank.THREE },
      { suit: Suit.HEARTS, rank: Rank.FOUR },
      { suit: Suit.SPADES, rank: Rank.FIVE },
    ];
    expect(evaluateHand(wheelStraight)).toBe(HandRank.STRAIGHT);
  });
});

describe("Hand Comparison", () => {
  it("should compare hands of different ranks correctly", () => {
    const royalFlush = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
      { suit: Suit.HEARTS, rank: Rank.QUEEN },
      { suit: Suit.HEARTS, rank: Rank.JACK },
      { suit: Suit.HEARTS, rank: Rank.TEN },
    ];

    const fourOfAKind = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.ACE },
      { suit: Suit.CLUBS, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
    ];

    expect(compareHands(royalFlush, fourOfAKind)).toBe(1);
    expect(compareHands(fourOfAKind, royalFlush)).toBe(-1);
  });

  it("should compare same rank hands correctly", () => {
    // Test pour les carrés
    const higherFourOfAKind = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.ACE },
      { suit: Suit.CLUBS, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
    ];

    const lowerFourOfAKind = [
      { suit: Suit.HEARTS, rank: Rank.KING },
      { suit: Suit.DIAMONDS, rank: Rank.KING },
      { suit: Suit.CLUBS, rank: Rank.KING },
      { suit: Suit.SPADES, rank: Rank.KING },
      { suit: Suit.HEARTS, rank: Rank.ACE },
    ];

    expect(compareHands(higherFourOfAKind, lowerFourOfAKind)).toBe(1);
    expect(compareHands(lowerFourOfAKind, higherFourOfAKind)).toBe(-1);
  });

  it("should handle equal hands as tie", () => {
    const fourOfAKind1 = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.ACE },
      { suit: Suit.CLUBS, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
    ];

    const fourOfAKind2 = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.DIAMONDS, rank: Rank.ACE },
      { suit: Suit.CLUBS, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
    ];

    expect(compareHands(fourOfAKind1, fourOfAKind2)).toBe(0);
  });
});
