export enum SUIT { Club , Diamond , Heart , Spade }
export enum CARD { 
    Ace = 'ACE', 
    Two = 'TWO', 
    Three = 'THREE',
    Four = 'FOUR',
    Five = 'FIVE',
    Six = 'SIX',
    Seven = 'SEVEN',
    Eight = 'EIGHT',
    Nine = 'NINE',
    Ten = 'TEN',
    Jack = 'JACK', 
    Queen = 'QUEEN', 
    King = 'KING'
}

export class Card {
    #suit: SUIT;
    #card: CARD; 

    constructor(suit: SUIT, card: CARD) {
        this.#card = card;
        this.#suit = suit;
    }

    get card(): CARD {
        return this.#card;
    }

    get suit(): SUIT {
        return this.#suit;
    }
}

export function cardValue( card: Card) {
    switch(card.card) {
        case CARD.Ace: return 11; 
        case CARD.Two: return 2; 
        case CARD.Three: return 3;
        case CARD.Four: return 4;
        case CARD.Five : return 5;
        case CARD.Six: return  6;
        case CARD.Seven: return  7;
        case CARD.Eight: return  8;
        case CARD.Nine: return  9;
        case CARD.Ten: return  10;
        case CARD.Jack: return  10; 
        case CARD.Queen: return  10;
        case CARD.King: return  10;
    }
    return -1;

}

export function newSetOfCards(): Card[] {
    const suits = [SUIT.Club, SUIT.Diamond, SUIT.Heart, SUIT.Spade];
    const cards = [CARD.Ace, CARD.Two, CARD.Three, CARD.Four, CARD.Five, CARD.Six, CARD.Seven, CARD.Eight, CARD.Nine, CARD.Ten, CARD.Jack, CARD.Queen, CARD.King ];
    const set: Card[] = [];
    suits.forEach(suit => {
        cards.forEach(card => {
            set.push(new Card(suit, card))
        }) 
    })
    return set;
}

export interface IShuffler {
    (cards: Card[]): Card[];
};

export const nonShuffler: IShuffler = function (cards: Card[]) {
    return cards
}


// https://bost.ocks.org/mike/shuffle/
export const fisherYatesShuffler: IShuffler = function(array: Card[]) {
    let m = array.length;
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      const i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      const t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }