import { describe, it, expect } from "vitest";
import { Game, PLAYER, DEALER, Dealer, Player } from "../model/blackjack";
import { type Card, newCard, SUIT, CARD } from '../model/cards';

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

function areSame(card1: Card, card2: Card ) {
    return card1.card === card2.card && card1.suit === card2.suit;
}

describe('Dealing', () => {
    const game = new Game();
    const cards: Card[] = [
        newCard(SUIT.Diamond, CARD.Five),
        newCard(SUIT.Club, CARD.Ace),
        newCard(SUIT.Club, CARD.Eight),
        newCard(SUIT.Club, CARD.Five),
        newCard(SUIT.Club, CARD.Four),
    ]
    game.init(cards);
    const dealer = new Dealer(game, game);
    dealer.deals();

    it('should give two cards to the dealer', () => {
        expect(game.hands[DEALER].length).toBe(2);
        expect(areSame(game.hands[DEALER][0], newCard(SUIT.Club, CARD.Five))).toBe(true);
        expect(areSame(game.hands[DEALER][1], newCard(SUIT.Club, CARD.Ace))).toBe(true);
    })

    it('should give two cards to the player', () => {
        expect(game.hands[PLAYER].length).toBe(2);
        expect(areSame(game.hands[PLAYER][0], newCard(SUIT.Club, CARD.Four))).toBe(true);
        expect(areSame(game.hands[PLAYER][1], newCard(SUIT.Club, CARD.Eight))).toBe(true);
    })

    it('should remove 4 cards from the set', () => {
        expect(game.cards.length).toBe(1);
    })
})

describe('Player Hits', () => {
    const game = new Game();
    game.init();
    const dealer = new Dealer(game, game);
    dealer.deals();

    const player = new Player(dealer);
    player.hit();

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
     const cards: Card[] = [
        newCard(SUIT.Heart, CARD.Five),
        newCard(SUIT.Diamond, CARD.Five),
        newCard(SUIT.Club, CARD.Ace),
        newCard(SUIT.Club, CARD.Eight),
        newCard(SUIT.Club, CARD.Five),
        newCard(SUIT.Club, CARD.Four),
    ]
    game.init(cards);

    const dealer = new Dealer(game, game);
    dealer.deals();
    
    const player = new Player(dealer);
    player.hit();

     player.stand();

     it('the dealer takes cards until he has more that 17 points', () => {
        expect(game.scoreOf(DEALER)).toBeGreaterThan(16);
        expect(game.hands[DEALER].length).toBe(3);
     })             

     it('should remove those cards from the set', () => {
        expect(game.cards.length).toBe(0);
     })
})

describe('Determine the winner', () => {

    describe('The player wins when it has 21 and the dealer less than 21', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Nine),
            newCard(SUIT.Club, CARD.Ace),
            newCard(SUIT.Club, CARD.Eight),
            newCard(SUIT.Club, CARD.Five),
            newCard(SUIT.Club, CARD.Four),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        const player = new Player(dealer);
        player.hit();
        
        const status = game.status();

        it('the status should be The Player Wins ', () => {
            expect(status).toBe('The Player Wins');
        });

        it('the dealer should have 16 ', () => {
            expect(game.hands[DEALER].length).toBe(2);
            expect(areSame(game.hands[DEALER][0], newCard(SUIT.Club, CARD.Five))).toBe(true);
            expect(areSame(game.hands[DEALER][1], newCard(SUIT.Club, CARD.Ace))).toBe(true);
            expect(game.scoreOf(DEALER)).toBe(16);
        });

        it('the player should have 21 ', () => {
            expect(game.hands[PLAYER].length).toBe(3);
            expect(areSame(game.hands[PLAYER][0], newCard(SUIT.Club, CARD.Four))).toBe(true);
            expect(areSame(game.hands[PLAYER][1], newCard(SUIT.Club, CARD.Eight))).toBe(true);
            expect(areSame(game.hands[PLAYER][2], newCard(SUIT.Diamond, CARD.Nine))).toBe(true);
            expect(game.scoreOf(PLAYER)).toBe(21);
        });
    });

    describe('The player wins when it has more than the dealer but less than 21 and has standed', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Seven),
            newCard(SUIT.Club, CARD.Six),
            newCard(SUIT.Club, CARD.King),
            newCard(SUIT.Club, CARD.Five),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
        player.stand();

        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('The Player Wins');
        });

        it('should have standed ', () => {
            expect(game.hasStanded()).toBe(true);
        });

        it('the dealer should have 16 ', () => {
            expect(game.scoreOf(DEALER)).toBe(18);
        });

        it('the player should have 19 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(19);
        });
    });

    describe('The player wins when it has more than the dealer but less than 21 and has standed', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Seven),
            newCard(SUIT.Club, CARD.Queen),
            newCard(SUIT.Club, CARD.King),
            newCard(SUIT.Club, CARD.Eight),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
    

        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('Playing...');
        });

        it('should have standed ', () => {
            expect(game.hasStanded()).toBe(false);
        });

        it('the dealer should have 18 ', () => {
            expect(game.scoreOf(DEALER)).toBe(18);
        });

        it('the player should have 19 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(19);
        });
    });

    describe('The player wins when the dealer gets more than 21', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Ten),
            newCard(SUIT.Club, CARD.Seven),
            newCard(SUIT.Club, CARD.King),
            newCard(SUIT.Club, CARD.Five),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
        player.stand();

        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('The Player Wins');
        });

        it('the dealer should have 22 ', () => {
            expect(game.scoreOf(DEALER)).toBe(22);
        });

        it('the player should have 19 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(19);
        });
    });

    describe('The dealer wins when it has more than the player and less than 22', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Seven),
            newCard(SUIT.Club, CARD.Six),
            newCard(SUIT.Club, CARD.Five),
            newCard(SUIT.Club, CARD.Five),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
        player.stand();

        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('The Dealer Wins');
        });

        it('the dealer should have 16 ', () => {
            expect(game.scoreOf(DEALER)).toBe(18);
        });

        it('the player should have 19 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(14);
        });
    });

    describe('The dealer wins when the player gets more than 21', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Ten),
            newCard(SUIT.Club, CARD.Seven),
            newCard(SUIT.Club, CARD.King),
            newCard(SUIT.Club, CARD.Five),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
        player.hit();

        const status = game.status();

        it('the status should be The Dealer Wins ', () => {
            expect(status).toBe('The Dealer Wins');
        });

        it('the dealer should have 12', () => {
            expect(game.scoreOf(DEALER)).toBe(12);
        });

        it('the player should have 19 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(29);
        });
    });

    describe('when the player and the dealer have the same amount lower than 22 and greater than 16 is a draw', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Five),
            newCard(SUIT.Club, CARD.Ace),
            newCard(SUIT.Club, CARD.Eight),
            newCard(SUIT.Club, CARD.Eight),
            newCard(SUIT.Club, CARD.Four),
            newCard(SUIT.Club, CARD.Four),
            newCard(SUIT.Club, CARD.Nine),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
        player.hit();
        player.stand();
        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('Push');
        });

        it('the dealer should have 21 ', () => {
            expect(game.scoreOf(DEALER)).toBe(21);
        });

        it('the player should have 21 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(21);
        });
    });

    

    describe('when the dealer has a seven and a ten and the player a nine, three, three, two the score should be 17/17, and the status playing', () => {
        const game = new Game();
        const cards: Card[] = [
            newCard(SUIT.Diamond, CARD.Five),
            newCard(SUIT.Club, CARD.Ace),
            newCard(SUIT.Club, CARD.Two),
            newCard(SUIT.Club, CARD.Three),
            newCard(SUIT.Club, CARD.Ten),
            newCard(SUIT.Club, CARD.Three),
            newCard(SUIT.Club, CARD.Seven),
            newCard(SUIT.Club, CARD.Nine),
        ]
        game.init(cards);
        const dealer = new Dealer(game, game);
        dealer.deals();
        
        const player = new Player(dealer);
        player.hit();
        player.hit();

        const status = game.status();

        it('the status should be playing ', () => {
            expect(status).toBe('Playing...');
        });

        it('the dealer should have 12 ', () => {
            expect(game.scoreOf(DEALER)).toBe(17);
        });

        it('the player should have 9 ', () => {
            expect(game.scoreOf(PLAYER)).toBe(17);
        });
    });
});



