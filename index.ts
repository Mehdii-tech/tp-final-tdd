import { Hand, HandRank, Rank, RANK_VALUES } from "./types";

export function evaluateHand(hand: Hand): HandRank {
  if (isRoyalFlush(hand)) return HandRank.ROYAL_FLUSH;
  if (isStraightFlush(hand)) return HandRank.STRAIGHT_FLUSH;
  if (isFourOfAKind(hand)) return HandRank.FOUR_OF_A_KIND;
  if (isFullHouse(hand)) return HandRank.FULL_HOUSE;
  if (isFlush(hand)) return HandRank.FLUSH;
  if (isStraight(hand)) return HandRank.STRAIGHT;
  if (isThreeOfAKind(hand)) return HandRank.THREE_OF_A_KIND;
  if (isTwoPair(hand)) return HandRank.TWO_PAIR;
  if (isOnePair(hand)) return HandRank.ONE_PAIR;
  return HandRank.HIGH_CARD;
}

function getRankCounts(hand: Hand): Map<Rank, number> {
  const rankCounts = new Map<Rank, number>();
  for (const card of hand) {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
  }
  return rankCounts;
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

function isStraightFlush(hand: Hand): boolean {
  return isFlush(hand) && isStraight(hand);
}

function isFourOfAKind(hand: Hand): boolean {
  const rankCounts = getRankCounts(hand);
  return Array.from(rankCounts.values()).includes(4);
}

function isFullHouse(hand: Hand): boolean {
  const rankCounts = getRankCounts(hand);
  const counts = Array.from(rankCounts.values());
  return counts.includes(3) && counts.includes(2);
}

function isFlush(hand: Hand): boolean {
  return hand.every((card) => card.suit === hand[0].suit);
}

function isStraight(hand: Hand): boolean {
  const values = hand
    .map((card) => RANK_VALUES[card.rank])
    .sort((a, b) => a - b);

  // Vérifier la suite normale
  if (isConsecutive(values)) return true;

  // Vérifier la suite As-5 (As peut être utilisé comme 1)
  if (values[4] === RANK_VALUES[Rank.ACE]) {
    const valuesWithAceAsOne = [
      1, // As comme 1
      ...values.slice(0, 4), // Les 4 autres cartes
    ].sort((a, b) => a - b);
    return isConsecutive(valuesWithAceAsOne);
  }

  return false;
}

function isConsecutive(values: number[]): boolean {
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) return false;
  }
  return true;
}

function isThreeOfAKind(hand: Hand): boolean {
  const rankCounts = getRankCounts(hand);
  return Array.from(rankCounts.values()).includes(3);
}

function isTwoPair(hand: Hand): boolean {
  const rankCounts = getRankCounts(hand);
  const pairs = Array.from(rankCounts.values()).filter((count) => count === 2);
  return pairs.length === 2;
}

function isOnePair(hand: Hand): boolean {
  const rankCounts = getRankCounts(hand);
  return Array.from(rankCounts.values()).includes(2);
}

export function compareHands(hand1: Hand, hand2: Hand): number {
  const rank1 = evaluateHand(hand1);
  const rank2 = evaluateHand(hand2);

  // Si les rangs sont différents, la main avec le rang le plus élevé gagne
  if (rank1 !== rank2) {
    return getHandRankValue(rank1) > getHandRankValue(rank2) ? 1 : -1;
  }

  // Pour l'instant, on retourne 0 en cas d'égalité
  return 0;
}

function getHandRankValue(rank: HandRank): number {
  const rankValues = {
    [HandRank.HIGH_CARD]: 0,
    [HandRank.ONE_PAIR]: 1,
    [HandRank.TWO_PAIR]: 2,
    [HandRank.THREE_OF_A_KIND]: 3,
    [HandRank.STRAIGHT]: 4,
    [HandRank.FLUSH]: 5,
    [HandRank.FULL_HOUSE]: 6,
    [HandRank.FOUR_OF_A_KIND]: 7,
    [HandRank.STRAIGHT_FLUSH]: 8,
    [HandRank.ROYAL_FLUSH]: 9,
  };
  return rankValues[rank];
}

export * from "./types";
