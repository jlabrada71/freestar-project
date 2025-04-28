import type { IDeal, IScorer } from './blackjack';
import type { IPlay } from './player'
import { DEALER, PLAYER } from './constants'


export class DealerProxy implements IPlay {
    gameKey: string;
    gameData: object;
    fetcher: Function;

    constructor(gameKey: string, gameData: object , fetcher: Function) {
        this.gameKey = gameKey;
        this.gameData = gameData;
        this.fetcher = fetcher;
    }
    async hit() {
        const data = await this.fetcher('/api/hit', {
            method: 'POST', 
            body: { gameKey: this.gameKey.value }
        })
        this.gameData.value = data.game;

    }

    async stand() {
        const data = await this.fetcher('/api/stand', {
            method: 'POST', 
            body: { gameKey: this.gameKey.value }
          })
          this.gameData.value = data.game;
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
        this.#game.stand();
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