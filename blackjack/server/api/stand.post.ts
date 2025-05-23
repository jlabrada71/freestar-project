import { Game, Dealer, Player } from '../../model/blackjack';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { gameKey } = body;

  const game = new Game();

  const val = await useStorage().getItem(gameKey)
  if (!val) {
    throw new Error('Game not found');
  }
  game.setData(val);

  
  const dealer = new Dealer(game, game);
  const player = new Player(dealer);
  player.stand();

  
  const data = game.getData();

  await useStorage().setItem(gameKey, data)
  // return data
  return {
    gameKey,
    game: data

  }
})