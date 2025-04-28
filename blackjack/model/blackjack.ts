import { type Card, type IShuffler, CARD, fisherYatesShuffler, newSetOfCards, cardValue } from './cards'
import { DEALER, PLAYER } from './constants';

export function scoreHand(hand: Card[]) {
    const total = hand.reduce((acc, card) => acc + cardValue(card), 0);
    if (total < 22) return total;
    const reducedTotal = hand.reduce((acc, card) => card.card === CARD.Ace && acc > 21 ? acc - 10: acc , total)
    return reducedTotal;
}


export interface IDeal {
    stand(): unknown;
    hasCards(): boolean;
    giveTo(player: number): void;
}

export interface IScorer {
    scoreOf(player:number):number;
}
export class Game implements IDeal, IScorer {
    
    
    #hands: Card[][];

    #cards: Card[];
    #shuffler: IShuffler;
    #standed: boolean;

    constructor(shuffler = fisherYatesShuffler ) {
        this.#hands = [[],[]]
        this.#shuffler = shuffler;
        this.#cards = this.#shuffler(newSetOfCards());
        this.#standed = false;
    }

    init(initialSet?:Card[] ) {
        this.#hands[DEALER] = [];
        this.#hands[PLAYER] = [];
        this.#cards = initialSet || this.#shuffler(newSetOfCards());
        this.#standed = false;
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

    stand() {
        this.#standed = true;
    }

    hasStanded(): boolean {
        return this.#standed;
    }

    status() {

        const dealerScore = this.scoreOf(DEALER);
        const playerScore = this.scoreOf(PLAYER)

        if (dealerScore === playerScore && 
           (dealerScore === 21 ||
           (dealerScore > 16 && dealerScore < 21 &&  this.#standed))) {
            return 'Push';
        }

        if (playerScore > 21 || (dealerScore < 22 && dealerScore > playerScore && this.#standed) ) {
            return 'The Dealer Wins';
        }

        if (playerScore === 21 || 
           (playerScore > dealerScore && this.#standed) || 
            dealerScore > 21 ) {
            return 'The Player Wins';
        }

        return 'Playing...';
        
    }

    getData() {
        return {
            cards: this.#cards,
            dealerHand: this.#hands[DEALER],
            playerHand: this.#hands[PLAYER],
            dealerScore: this.scoreOf(DEALER),
            playerScore: this.scoreOf(PLAYER),
            status: this.status(),
        }
    }

    setData(data) {
        this.#cards = data.cards;
        this.#hands[DEALER] = data.dealerHand;
        this.#hands[PLAYER] = data.playerHand;
    }

    get cards(): Card[] {
        return this.#cards
    }

    get hands() {
        return this.#hands;
    }
}