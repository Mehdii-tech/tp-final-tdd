import { describe, it, expect } from "vitest";
import { Suit, Rank, HandRank, RANK_VALUES } from "../types";
import { evaluateHand } from "../index";

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
});
