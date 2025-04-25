import { describe, it, expect } from "vitest";
import { Game, scoreHand, PLAYER, DEALER } from "../model/blackjack";
import { Card, SUIT, CARD } from '../model/cards';

describe('Game initialization', () => {
    const game = new Game();
    game.init();
    it('should have the player with no cards', ()=>{
        expect(game.hands[PLAYER].length).toBe(0)
    });

    it('should have the dealer with no cards', ()=>{
        expect(game.hands[DEALER].length).toBe(0)
    })

    it('should have the card set full', ()=>{
        expect(game.cards.length).toBe(52);
    })
})

describe('Dealing', () => {
    const game = new Game();
    game.init();
    game.dealing();

    it('should give two cards to the dealer', () => {
        expect(game.hands[DEALER].length).toBe(2);
    })

    it('should give two cards to the player', () => {
        expect(game.hands[PLAYER].length).toBe(2);
    })

    it('should remove 4 cards from the set', () => {
        expect(game.cards.length).toBe(48);
    })
})

describe('Player Hits', () => {
    const game = new Game();
    game.init();
    game.dealing();
    game.hit();

    // console.log(game.hands[DEALER][0].card)
    // console.log(game.hands[DEALER][1].card)
    // console.log(game.hands[PLAYER][0].card)
    // console.log(game.hands[PLAYER][1].card)
    // console.log(game.hands[PLAYER][2].card)

    it('should give one card to the player', () => {
        expect(game.hands[PLAYER].length).toBe(3);
    })

    it('should give no card to the dealer', () => {
        expect(game.hands[DEALER].length).toBe(2);
    })

    it('should remove 1 cards from the set', () => {
        expect(game.cards.length).toBe(47);
    })
})

describe('Player Stands', () => {
    const game = new Game();
    game.init();
    game.dealing();
    game.stand();

    it('the dealer takes cards until he has more that 17 points', () => {
        expect(scoreHand(game.hands[DEALER])).toBeGreaterThan(16);
        // expect(game.hands[DEALER].length).toBe(3);
    })             

    it('should remove those cards from the set', () => {
       expect(game.cards.length).toBe(50 - game.hands[DEALER].length);
    })
})

describe('Determine the winner', () => {

    describe('The player wins when it has more than the dealer and reach 21', () => {
        const game = new Game();
        const cards: Card[] = [
            new Card(SUIT.Diamond, CARD.Five),
            new Card(SUIT.Club, CARD.Ace),
            new Card(SUIT.Club, CARD.Eight),
            new Card(SUIT.Club, CARD.Five),
            new Card(SUIT.Club, CARD.Four),
        ]
        game.init(cards);
        game.dealing();
        game.hit();
        const status = game.status();

        it('the status should be Player won ', () => {
            expect(status).toBe('Player Won');
        });

        it('the dealer should have 12 ', () => {
            expect(scoreHand(game.hands[DEALER])).toBe(12);
        });

        it('the player should have 21 ', () => {
            expect(scoreHand(game.hands[PLAYER])).toBe(21);
        });
    });

    describe('when the player has more than the dealer and less than 21 and has not stand', () => {
        const game = new Game();
        const cards: Card[] = [
            new Card(SUIT.Diamond, CARD.Five),
            new Card(SUIT.Club, CARD.Ace),
            new Card(SUIT.Club, CARD.Eight),
            new Card(SUIT.Club, CARD.Five),
            new Card(SUIT.Club, CARD.Four),
        ]
        game.init(cards);
        game.dealing();
        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('Playing...');
        });

        it('the dealer should have 12 ', () => {
            expect(scoreHand(game.hands[DEALER])).toBe(12);
        });

        it('the player should have 21 ', () => {
            expect(scoreHand(game.hands[PLAYER])).toBe(16);
        });

    });
});



