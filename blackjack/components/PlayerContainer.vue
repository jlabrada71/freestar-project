<template>
    <div class="bg-cyan-800 p-10 flex flex-col">
        <h1 class="text-slate-100 text-3xl mb-4 mt-0">{{ title }}</h1>
        <div class="flex">
          <div class="flex gap-5 grow">
            <!-- <CardComponent v-if="isPlaying" :card="{suit: '-', card:'-'}">Back of Card</CardComponent> -->
            <CardComponent v-for="(card, i) in props.hand" :key="card.suit+card.card" :card="card" :is-face-down="firstCardFaceDown && (i == 0)" />
          </div>
          <PlayerScore v-if="props.showPlayerScore"  :score="props.score" />
        </div>
      </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    hand: {
        type: Array,
        required: true
    },
    score: {
        type: Number,
        required: true,
    },
    showPlayerScore: {
        type: Boolean,
        default: true  
    },
    firstCardFaceDown: {
        type: Boolean,
        default: false
    }
})
</script>