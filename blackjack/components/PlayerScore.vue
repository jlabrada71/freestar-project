<template>
    <div class="bg-cyan-200 w-40 h-40 p-10 rounded-3xl flex flex-col gap-2 items-center">
        <h2 class="text-xl">Score</h2>
        <p class="text-4xl font-black">{{ props.score }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    score: {
        type:Number,
        required: true,
    }
})
</script>