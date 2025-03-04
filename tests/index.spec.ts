import { describe, it, expect } from "vitest";
import { Suit, Rank, RANK_VALUES, HandRank } from "../index";

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
