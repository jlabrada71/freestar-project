import { Game, Dealer } from '../../model/blackjack';

export default defineEventHandler(async (event) => {
    const game = new Game();
    game.init();
    
    const dealer = new Dealer(game, game);
    dealer.deals();
    
    const gameKey = 'KEY:' + (1000 + Math.random() * 9999);
    // const cached = await useStorage().getItem('some-key')
    // if (cached) return cached
    const data = game.getData();

    await useStorage().setItem(gameKey, data)
    // return data
    return {
      gameKey,
      game: data

    }
  })