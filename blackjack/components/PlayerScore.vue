<template>
    <div class="bg-cyan-200 w-40 p-10 rounded-3xl">
        <h2 class="text-xl">Score</h2>
        {{ props.score }}
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