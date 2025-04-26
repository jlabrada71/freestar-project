import { Game, Dealer } from '../../model/blackjack';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { gameKey } = body;
  if (gameKey) {
    await useStorage().removeItem(gameKey);
  }
  const game = new Game();
  game.init();
  
  const dealer = new Dealer(game, game);
  dealer.deals();
  
  const newGameKey = 'KEY:' + (1000 + Math.random() * 9999);
  // const cached = await useStorage().getItem('some-key')
  // if (cached) return cached
  const data = game.getData();

  await useStorage().setItem(newGameKey, data)
  // return data
  return {
    gameKey: newGameKey,
    game: data
  }
})