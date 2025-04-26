<template>
 

  <div class="font-bold bg-cyan-100 p-10 gap-5 flex flex-col">
    <div class="text-7xl font-black"> <span>{{ gameData.status }}</span></div>

    <div>
      <PlayerContainer title="Dealer Cards" :hand="gameData.dealerHand" :score="gameData.dealerScore" :show-player-score="!isPlaying" :first-card-face-down="isPlaying"/>
      <PlayerContainer title="Player Cards" :hand="gameData.playerHand" :score="gameData.playerScore"  />
    </div>

    <div class="flex gap-5 p-5">
      <div v-if="!isPlaying" class="flex gap-5 p-5" >
        <BlueButton @click="initGame" >Start Game</BlueButton>
      </div>
      <div v-else class="flex gap-10 p-5">
        <BlueButton @click="hit">Hit</BlueButton>
        <BlueButton @click="stand">Stand</BlueButton>
      </div> 
    </div>
  </div>
</template>

<script setup>

const gameKey = ref(null)
const gameData = ref({ status: 'Click "Start Game" to begin', playerScore:0, dealerScore: 0, playerHand: [], dealerHand: []}); 
const isPlaying = computed(() => gameData.value.status === 'Playing...')

  async function initGame() {
    const data = await $fetch('/api/init-game', {
      method: 'POST',
      body: { gameKey: gameKey.value }
    })
    gameKey.value = data.gameKey;
    gameData.value = data.game;
  }

  async function hit() {
    const data = await $fetch('/api/hit', {
      method: 'POST', 
      body: { gameKey: gameKey.value }
    })
    gameData.value = data.game;
  }

  async function stand() {
    const data = await $fetch('/api/stand', {
      method: 'POST', 
      body: { gameKey: gameKey.value }
    })
    gameData.value = data.game;
  }
</script>
