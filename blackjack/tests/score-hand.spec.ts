import { describe, it, expect } from "vitest";
import { scoreHand } from "../model/blackjack";
import { SUIT, CARD, Card } from "../model/cards";

describe('score a hand', () => {
    describe('score an empty hand', () => {
        const hand: Card[] = [];
        const score = scoreHand(hand);
        it ('should return 2', () => {
            expect(score).toBe(0);
        })
    });

    describe('score a hand with a 2', () => {
        const hand: Card[] = [new Card(SUIT.Club, CARD.Two)];
        const score = scoreHand(hand);
        it ('should return 2', () => {
            expect(score).toBe(2);
        });
    })

    describe('score a hand with a 2 and a 5', () => {
        const hand: Card[] = [new Card(SUIT.Club, CARD.Two), new Card(SUIT.Diamond, CARD.Five)];
        const score = scoreHand(hand);
        it ('should return 7', () => {
            expect(score).toBe(7);
        });
    });

    describe('score a hand with an Ace', () => {
        const hand: Card[] = [new Card(SUIT.Club, CARD.Ace)];
        const score = scoreHand(hand);
        it ('should return 11', () => {
            expect(score).toBe(11);
        });
    });

    describe('score a hand with a King', () => {
        const hand: Card[] = [new Card(SUIT.Club, CARD.King)];
        const score = scoreHand(hand);
        it ('should return 10', () => {
            expect(score).toBe(10);
        });
    });

    describe('score a hand with a Jack, a 2, a 3, a 5 and an Ace', () => {
        const hand: Card[] = [
            new Card(SUIT.Club, CARD.Jack), 
            new Card(SUIT.Spade, CARD.Two),
            new Card(SUIT.Heart, CARD.Three),
            new Card(SUIT.Spade, CARD.Five),
            new Card(SUIT.Club, CARD.Ace)
        ];
        const score = scoreHand(hand);
        it ('should return 21', () => {
            expect(score).toBe(21);
        });
    });

    describe('score a hand with a Two Aces, a 2, a 5', () => {
        const hand: Card[] = [
            new Card(SUIT.Club, CARD.Ace), 
            new Card(SUIT.Spade, CARD.Two),
            new Card(SUIT.Spade, CARD.Five),
            new Card(SUIT.Club, CARD.Ace)
        ];
        const score = scoreHand(hand);
        it ('should return 19', () => {
            expect(score).toBe(19);
        });
    });
});