# Évaluateur de Mains de Poker

Ce projet est un évaluateur de mains de poker développé en TypeScript suivant une approche TDD (Test-Driven Development). Il permet d'évaluer et de comparer des mains de poker selon les règles standard.

## Fonctionnalités

- Évaluation des mains de poker (de la plus forte à la plus faible) :

  - Quinte Flush Royale (Royal Flush)
  - Quinte Flush (Straight Flush)
  - Carré (Four of a Kind)
  - Full House
  - Couleur (Flush)
  - Suite (Straight)
  - Brelan (Three of a Kind)
  - Deux Paires (Two Pair)
  - Paire (One Pair)
  - Carte Haute (High Card)

- Gestion des cas spéciaux :

  - Suite à l'As (Ace-high straight)
  - Petite suite à l'As (Wheel straight: A-2-3-4-5)
  - Comparaison des kickers en cas d'égalité

- Validation complète des mains :
  - Vérification du nombre exact de cartes (5)
  - Validation des rangs et couleurs
  - Détection des cartes en double

## Installation

```bash
# Installation des dépendances
pnpm install
```

## Tests

```bash
# Lancement des tests
pnpm test
```

## Utilisation

```typescript
import { evaluateHand, compareHands } from "./index";
import { Suit, Rank, Hand } from "./types";

// Exemple d'une main
const hand: Hand = [
  { suit: Suit.HEARTS, rank: Rank.ACE },
  { suit: Suit.HEARTS, rank: Rank.KING },
  { suit: Suit.HEARTS, rank: Rank.QUEEN },
  { suit: Suit.HEARTS, rank: Rank.JACK },
  { suit: Suit.HEARTS, rank: Rank.TEN },
];

// Évaluation d'une main
const rank = evaluateHand(hand);

// Comparaison de deux mains
const result = compareHands(hand1, hand2);
// retourne 1 si hand1 gagne
// retourne -1 si hand2 gagne
// retourne 0 en cas d'égalité
```

## Structure du Projet

- `index.ts` : Logique principale d'évaluation et de comparaison
- `types.ts` : Définitions des types et énumérations
- `tests/index.spec.ts` : Tests unitaires

## Développement

Le projet a été développé en suivant une approche TDD avec les étapes suivantes :

1. Écriture des tests
2. Implémentation du code
3. Refactoring et optimisation

## Technologies Utilisées

- TypeScript
- Vitest (Framework de test)
- pnpm (Gestionnaire de paquets)
