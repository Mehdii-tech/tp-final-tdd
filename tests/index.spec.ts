import { describe, it, expect } from "vitest";
import { Suit, Rank, HandRank, RANK_VALUES } from "../types";
import { evaluateHand, compareHands } from "../index";

describe("Poker Constants", () => {
  it("should have correct suit symbols", () => {
    expect(Suit.HEARTS).toBe("♥");
    expect(Suit.DIAMONDS).toBe("♦");
    expect(Suit.CLUBS).toBe("♣");
    expect(Suit.SPADES).toBe("♠");
  });

  it("should have correct rank values", () => {
    expect(RANK_VALUES[Rank.TWO]).toBe(2);
    expect(RANK_VALUES[Rank.ACE]).toBe(14);
    expect(RANK_VALUES[Rank.KING]).toBe(13);
  });

  it("should have all hand ranks defined", () => {
    expect(Object.keys(HandRank).length).toBe(10);
    expect(HandRank.HIGH_CARD).toBe("HIGH_CARD");
    expect(HandRank.ROYAL_FLUSH).toBe("ROYAL_FLUSH");
  });
});

describe("Hand Evaluation", () => {
  describe("Royal Flush Detection", () => {
    it("should detect a royal flush", () => {
      const royalFlush = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.HEARTS, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.QUEEN },
        { suit: Suit.HEARTS, rank: Rank.JACK },
        { suit: Suit.HEARTS, rank: Rank.TEN },
      ];
      expect(evaluateHand(royalFlush)).toBe(HandRank.ROYAL_FLUSH);
    });

    it("should not detect a royal flush when suits are mixed", () => {
      const notRoyalFlush = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.QUEEN },
        { suit: Suit.HEARTS, rank: Rank.JACK },
        { suit: Suit.HEARTS, rank: Rank.TEN },
      ];
      expect(evaluateHand(notRoyalFlush)).not.toBe(HandRank.ROYAL_FLUSH);
    });
  });

  describe("Straight Flush Detection", () => {
    it("should detect a straight flush", () => {
      const straightFlush = [
        { suit: Suit.HEARTS, rank: Rank.NINE },
        { suit: Suit.HEARTS, rank: Rank.EIGHT },
        { suit: Suit.HEARTS, rank: Rank.SEVEN },
        { suit: Suit.HEARTS, rank: Rank.SIX },
        { suit: Suit.HEARTS, rank: Rank.FIVE },
      ];
      expect(evaluateHand(straightFlush)).toBe(HandRank.STRAIGHT_FLUSH);
    });

    it("should detect a wheel straight flush (A-5)", () => {
      const wheelStraightFlush = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.HEARTS, rank: Rank.TWO },
        { suit: Suit.HEARTS, rank: Rank.THREE },
        { suit: Suit.HEARTS, rank: Rank.FOUR },
        { suit: Suit.HEARTS, rank: Rank.FIVE },
      ];
      expect(evaluateHand(wheelStraightFlush)).toBe(HandRank.STRAIGHT_FLUSH);
    });
  });

  describe("Four of a Kind Detection", () => {
    it("should detect four of a kind", () => {
      const fourOfAKind = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.ACE },
        { suit: Suit.CLUBS, rank: Rank.ACE },
        { suit: Suit.SPADES, rank: Rank.ACE },
        { suit: Suit.HEARTS, rank: Rank.KING },
      ];
      expect(evaluateHand(fourOfAKind)).toBe(HandRank.FOUR_OF_A_KIND);
    });
  });

  describe("Full House Detection", () => {
    it("should detect a full house", () => {
      const fullHouse = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.ACE },
        { suit: Suit.CLUBS, rank: Rank.ACE },
        { suit: Suit.SPADES, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.KING },
      ];
      expect(evaluateHand(fullHouse)).toBe(HandRank.FULL_HOUSE);
    });

    it("should detect a full house with different arrangement", () => {
      const fullHouse = [
        { suit: Suit.SPADES, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.ACE },
        { suit: Suit.CLUBS, rank: Rank.ACE },
      ];
      expect(evaluateHand(fullHouse)).toBe(HandRank.FULL_HOUSE);
    });
  });

  describe("Flush Detection", () => {
    it("should detect a flush", () => {
      const flush = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.HEARTS, rank: Rank.JACK },
        { suit: Suit.HEARTS, rank: Rank.EIGHT },
        { suit: Suit.HEARTS, rank: Rank.SIX },
        { suit: Suit.HEARTS, rank: Rank.THREE },
      ];
      expect(evaluateHand(flush)).toBe(HandRank.FLUSH);
    });
  });

  describe("Straight Detection", () => {
    it("should detect a straight", () => {
      const straight = [
        { suit: Suit.HEARTS, rank: Rank.NINE },
        { suit: Suit.DIAMONDS, rank: Rank.EIGHT },
        { suit: Suit.CLUBS, rank: Rank.SEVEN },
        { suit: Suit.HEARTS, rank: Rank.SIX },
        { suit: Suit.SPADES, rank: Rank.FIVE },
      ];
      expect(evaluateHand(straight)).toBe(HandRank.STRAIGHT);
    });

    it("should detect a wheel straight (A-5)", () => {
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

  describe("Three of a Kind Detection", () => {
    it("should detect three of a kind", () => {
      const threeOfAKind = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.ACE },
        { suit: Suit.CLUBS, rank: Rank.ACE },
        { suit: Suit.SPADES, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.QUEEN },
      ];
      expect(evaluateHand(threeOfAKind)).toBe(HandRank.THREE_OF_A_KIND);
    });
  });

  describe("Two Pair Detection", () => {
    it("should detect two pair", () => {
      const twoPair = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.ACE },
        { suit: Suit.CLUBS, rank: Rank.KING },
        { suit: Suit.SPADES, rank: Rank.KING },
        { suit: Suit.HEARTS, rank: Rank.QUEEN },
      ];
      expect(evaluateHand(twoPair)).toBe(HandRank.TWO_PAIR);
    });
  });

  describe("One Pair Detection", () => {
    it("should detect one pair", () => {
      const onePair = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.ACE },
        { suit: Suit.CLUBS, rank: Rank.KING },
        { suit: Suit.SPADES, rank: Rank.QUEEN },
        { suit: Suit.HEARTS, rank: Rank.JACK },
      ];
      expect(evaluateHand(onePair)).toBe(HandRank.ONE_PAIR);
    });
  });

  describe("High Card Detection", () => {
    it("should detect high card", () => {
      const highCard = [
        { suit: Suit.HEARTS, rank: Rank.ACE },
        { suit: Suit.DIAMONDS, rank: Rank.KING },
        { suit: Suit.CLUBS, rank: Rank.QUEEN },
        { suit: Suit.SPADES, rank: Rank.JACK },
        { suit: Suit.HEARTS, rank: Rank.NINE },
      ];
      expect(evaluateHand(highCard)).toBe(HandRank.HIGH_CARD);
    });
  });
});

describe("Hand Comparison", () => {
  it("should correctly compare hands of different ranks", () => {
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

  it("should handle equal ranks as a tie", () => {
    const royalFlush1 = [
      { suit: Suit.HEARTS, rank: Rank.ACE },
      { suit: Suit.HEARTS, rank: Rank.KING },
      { suit: Suit.HEARTS, rank: Rank.QUEEN },
      { suit: Suit.HEARTS, rank: Rank.JACK },
      { suit: Suit.HEARTS, rank: Rank.TEN },
    ];

    const royalFlush2 = [
      { suit: Suit.SPADES, rank: Rank.ACE },
      { suit: Suit.SPADES, rank: Rank.KING },
      { suit: Suit.SPADES, rank: Rank.QUEEN },
      { suit: Suit.SPADES, rank: Rank.JACK },
      { suit: Suit.SPADES, rank: Rank.TEN },
    ];

    expect(compareHands(royalFlush1, royalFlush2)).toBe(0);
  });
});
