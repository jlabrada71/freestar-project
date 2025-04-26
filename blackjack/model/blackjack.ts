import { type Card, type IShuffler, CARD, fisherYatesShuffler, newSetOfCards, cardValue } from './cards'

export function scoreHand(hand: Card[]) {
    const total = hand.reduce((acc, card) => acc + cardValue(card), 0);
    if (total < 22) return total;
    const reducedTotal = hand.reduce((acc, card) => card.card === CARD.Ace && acc > 22 ? acc - 10: acc , total)
    return reducedTotal;
}

export const DEALER = 0;
export const PLAYER = 1;


interface IPlay {
    hit(): void;
    stand(): void;
}

interface IDeal {
    hasCards(): boolean;
    giveTo(player: number): void;
}

export class Player {
    #dealer: IPlay;
    constructor(dealer: IPlay) {
        this.#dealer = dealer;
    }

    hit() {
        this.#dealer.hit();
    }

    stand() {
        this.#dealer.stand();
    }
} 

export class Dealer implements IPlay {
    #game: IDeal;
    #scorer: IScorer;
    constructor(game: IDeal, scorer: IScorer) {
        this.#game = game;
        this.#scorer = scorer;
    }

    hit() {
        this.#game.giveTo(PLAYER);
    }

    stand() {
        while(this.#scorer.scoreOf(DEALER) < 17 && this.#game.hasCards()) {
            this.#game.giveTo(DEALER);
        }
    }

    deals() {
        this.#game.giveTo(PLAYER);
        this.#game.giveTo(DEALER);
        this.#game.giveTo(PLAYER);
        this.#game.giveTo(DEALER);
    }
}

export interface IScorer {
    scoreOf(player:number):number;
}
export class Game implements IDeal, IScorer {
    
    #hands: Card[][];

    #cards: Card[];
    #shuffler: IShuffler;

    constructor(shuffler = fisherYatesShuffler ) {
        this.#hands = [[],[]]
        this.#shuffler = shuffler;
        this.#cards = this.#shuffler(newSetOfCards());
    }

    init(initialSet?:Card[] ) {
        this.#hands[DEALER] = [];
        this.#hands[PLAYER] = [];
        this.#cards = initialSet || this.#shuffler(newSetOfCards());
    }

    scoreOf(player: number) {
        return scoreHand(this.hands[player])
    }

    giveTo(player: number) {
        if( this.cards.length == 0 ) {
            return;
        }

        const card = this.#cards.pop();
        if (!card) { 
            return;
        }

        this.#hands[player].push(card);
    }

    hasCards() {
        return this.#cards.length > 0;
    }


    status() {

        if (this.scoreOf(DEALER) > 16 && this.scoreOf(DEALER) < 22 && this.scoreOf(DEALER) === this.scoreOf(PLAYER)) {
            return 'Push';
        }

        if (this.scoreOf(PLAYER) > 21 || (this.scoreOf(DEALER) < 22 && this.scoreOf(DEALER) > this.scoreOf(PLAYER)) ) {
            return 'Dealer Won';
        }

        if (this.scoreOf(PLAYER) == 21 || this.scoreOf(PLAYER) > this.scoreOf(DEALER) || this.scoreOf(DEALER) > 21 ) {
            return 'Player Won';
        }

        return 'Playing...';
        
    }

    get cards(): Card[] {
        return this.#cards
    }

    get hands() {
        return this.#hands;
    }
}