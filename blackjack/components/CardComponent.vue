<template>
    <div v-if="props.isFaceDown" class="bg-red-300 rounded-2xl p-5 w-32 h-40 border-8 border-red-50 shadow-xl">
        <slot>
            <p>🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲 🚲</p>
        </slot>
    </div>
    <Transition name="fade">
        <div v-if="!props.isFaceDown" class="bg-slate-50 rounded-2xl p-5 w-32 h-40 shadow-xl">
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
    </Transition>
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

<style scoped>
.slide-fade-enter-active {
  transition: all 2.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>