export interface IPlay {
    hit(): void;
    stand(): void;
}

export class Player implements IPlay{
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