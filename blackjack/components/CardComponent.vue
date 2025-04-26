<template>
    <div  class="bg-red-300 rounded-2xl p-5 w-32 h-full">
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
    }
})

function charToImage(char) {
    if (char == 0) return '♤'
    if (char == 1) return '❤' 
    if (char == 2) return '◆'
    return '♣'
}

</script>