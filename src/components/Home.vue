<template>
    <div>
        <h3 class="text-xl">Componente hijo ;)</h3>
        <p>El mensaje es <span class="font-bold">{{ msg }}</span></p>
        <button class="btn-emerald" @click="msg = 'cambio desde hijo'">Mensaje</button>
    </div>
    <div class="mt-4">
        <h3>Contador: <span :class="[counter > 0 ? 'posit' : 'negat']">{{ counter }}</span></h3>
        <button @click="ev()" @click.prevent.right="$emit('decrement')" class="btn-cyan">Incrementar</button>
    </div>
    <div class="flex flex-col">
        <div v-for="(item, index) in array" :key="item.id">
            {{ index + 1 }} - {{ item.name }} ({{ item.age }} años)
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed } from "vue";

const emit = defineEmits(['increment', 'decrement'])
const props = defineProps({
    msg: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        required: true
    },
    array: {
        type: Array
    }
})
const ev = () => {
    emit('increment')
}

</script>

<style scoped>
.posit {
    color: green;
}

.negat {
    color: red;
}
</style>
