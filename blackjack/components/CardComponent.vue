<template>
    <div v-if="props.isFaceDown" class="bg-red-300 rounded-2xl p-5 w-32 h-40 border-8 border-red-50">
        <slot>
            <p>🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲</p>
        </slot>
    </div>
    <div v-else class="bg-slate-50 rounded-2xl p-5 w-32 h-40">
        <slot>
            <div>
                <div class="text-6xl text-center">
                    {{ charToImage( props.card.suit)}}
                </div>
                <div class="text-center">
                    {{ props.card.card }}
                </div>
            </div>
        </slot>
    </div>
</template>
<script setup>

const props = defineProps({
    card: {
        type: Object,
        required: true
    },
    isFaceDown: {
        type: Boolean,
        default: false 
    }
})

function charToImage(char) {
    if (char == 0) return '♤'
    if (char == 1) return '❤' 
    if (char == 2) return '◆'
    return '♣'
}

</script>