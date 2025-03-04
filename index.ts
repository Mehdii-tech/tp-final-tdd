import { Hand, HandRank, Rank } from "./types";

export function evaluateHand(hand: Hand): HandRank {
  if (isRoyalFlush(hand)) return HandRank.ROYAL_FLUSH;
  if (isFourOfAKind(hand)) return HandRank.FOUR_OF_A_KIND;
  if (isFullHouse(hand)) return HandRank.FULL_HOUSE;

  return HandRank.HIGH_CARD; // Temporaire, à compléter
}

function isRoyalFlush(hand: Hand): boolean {
  const isFlush = hand.every((card) => card.suit === hand[0].suit);
  const ranks = new Set(hand.map((card) => card.rank));
  const royalCards = new Set([
    Rank.TEN,
    Rank.JACK,
    Rank.QUEEN,
    Rank.KING,
    Rank.ACE,
  ]);

  return (
    isFlush &&
    ranks.size === 5 &&
    [...ranks].every((rank) => royalCards.has(rank))
  );
}

function isFourOfAKind(hand: Hand): boolean {
  const rankCounts = new Map<Rank, number>();

  for (const card of hand) {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
  }

  return Array.from(rankCounts.values()).includes(4);
}

function isFullHouse(hand: Hand): boolean {
  const rankCounts = new Map<Rank, number>();

  for (const card of hand) {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
  }

  const counts = Array.from(rankCounts.values());
  return counts.includes(3) && counts.includes(2);
}

export * from "./types";
