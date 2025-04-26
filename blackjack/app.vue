<template>
 

  <div class="font-bold bg-cyan-100 p-10 gap-10 flex flex-col">
    <div class="text-7xl font-black"> <span>{{ gameData.status }}</span></div>
    
    <div>
      <div class="bg-slate-50 p-10 h-56">
        <h1>Dealer Cards</h1>
        <div class="flex h-full">
          <div class="flex gap-5 grow h-full">
            <CardComponent v-if="isPlaying" :card="{suit: '-', card:'-'}">Back</CardComponent>
            <CardComponent v-for="card in dealerCards" :key="card.suit+card.card" :card="card" />
          </div>
          <div v-if="!isPlaying" class="bg-cyan-400 w-40 p-10 rounded-3xl">
            <h2>Score</h2>
            {{ gameData.dealerScore }}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-slate-50 p-10 h-56">
      <h1>Player Cards</h1>
      <div class="flex gap-5 h-full">
        <div class="flex gap-5 grow">
          <CardComponent v-for="card in gameData.playerHand" :key="card.suit+card.card" :card="card" />
        </div>
        <div class="bg-cyan-400 w-40 p-10 rounded-3xl">
          <h2>Score</h2>
          {{ gameData.playerScore }}
        </div>
      </div>

    </div>
    <div class="flex gap-5 p-5">
      <div v-if="!isPlaying" class="flex gap-5 p-5" >
        <button @click="initGame" class="bg-cyan-200 px-3 py-2 rounded-2xl border-4 border-cyan-400 hover:bg-cyan-300 active:bg-cyan-400">Init game</button>
      </div>
      <div v-else class="flex gap-10 p-5">
        <button @click="hit" class="bg-cyan-200 px-3 py-2 rounded-2xl border-4 border-cyan-400 hover:bg-cyan-300 active:bg-cyan-400 w-40">Hit</button>
        <button @click="stand" class="bg-cyan-200 px-3 py-2 rounded-2xl border-4 border-cyan-400 hover:bg-cyan-300 active:bg-cyan-400 w-40">Stand</button>
      </div> 
    </div>
  </div>
</template>

<script setup>

const gameKey = ref(null)
const gameData = ref({}); 
const isPlaying = computed(() => gameData.value.status == 'Playing...')

const dealerCards = computed(() => !isPlaying.value ? gameData.value.dealerHand: gameData.value.dealerHand.filter((card, i) => i > 0));

  async function initGame() {
    const data = await $fetch('/api/init-game', {
      method: 'GET',
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
