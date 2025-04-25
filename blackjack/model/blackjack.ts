import { type Card, type IShuffler, CARD, fisherYatesShuffler, newSetOfCards, cardValue } from './cards'

export function scoreHand(hand: Card[]) {
    const total = hand.reduce((acc, card) => acc + cardValue(card), 0);
    if (total < 22) return total;
    const reducedTotal = hand.reduce((acc, card) => card.card === CARD.Ace && acc > 22 ? acc - 10: acc , total)
    return reducedTotal;
}

export const DEALER = 0;
export const PLAYER = 1;



export class Game {
    
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

    dealing() {
        if (this.#cards.length < 4) {
            return;
        }
        this.giveTo(DEALER);
        this.giveTo(PLAYER);
        this.giveTo(DEALER);
        this.giveTo(PLAYER);
    }

    hit() {
        this.giveTo(PLAYER);
    }

    stand() {
        while(scoreHand(this.#hands[DEALER]) < 17) {
            this.giveTo(DEALER);
        }
    }

    status() {
        if (scoreHand(this.#hands[PLAYER]) == 21 ) {
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