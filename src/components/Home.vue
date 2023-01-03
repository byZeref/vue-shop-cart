<template>
    <div>
        <h3 class="text-xl">Componente hijo ;)</h3>
        <p>El mensaje es <span class="font-bold">{{ msg }}</span></p>
        <button class="btn-emerald" @click="msg = 'cambio desde hijo'">Mensaje</button>
    </div>
    <div class="mt-4">
        <!-- <h3>Contador: <span :class="[counter > 0 ? 'posit' : 'negat']">{{ counter }}</span></h3> -->
        <h3>Contador: <span :class="counterClass()">{{ counter }}</span></h3>
        <button @click="ev()" @click.prevent.right="$emit('decrement')" class="btn-cyan">Incrementar</button>
    </div>
    <div class="my-3">
        <input class="rounded-sm text-sm mr-3" type="text" v-model="filter">
    </div>
    <div class="flex flex-col space-y-2">
        <div class="border border-cyan-500 rounded-sm py-2 pl-2" v-for="(item, index) in arr_filter" :key="item.id">
            {{ index + 1 }} - {{ item.name }} ({{ item.age }} años)
        </div>
    </div>

    <div class="mt-4">
        <table>
            <thead>
                <th class="hover:cursor-pointer select-none" @click="arr_sort('name')">Nombre</th>
                <th class="hover:cursor-pointer select-none" @click="arr_sort('age')">Edad</th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input class="rounded-sm text-sm" type="text" v-model="name_filter">
                    </td>
                    <td>
                        <input class="rounded-sm text-sm" type="text" v-model="age_filter">
                    </td>
                </tr>
                <tr class="border-y" v-for="(item, index) in arr_filter" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";

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
const filter = ref('')
const name_filter = ref('')
const age_filter = ref('')

let name_sorted = false
let age_sorted = false

const arr_filter = computed(() => {
    if (name_filter.value) {
        return props.array.filter(item => item.name.toLowerCase().includes(name_filter.value.toLowerCase()))
    }
    if (age_filter.value) {
        return props.array.filter(item => item.age.toString().includes(age_filter.value))
    }
    return props.array.filter(item => item.name.toLowerCase().includes(filter.value.toLowerCase()))
})

const arr_sort = (crit) => {
    if (crit === 'name') {
        if (name_sorted) {
            name_sorted = false
            return props.array.reverse()
        }
        name_sorted = true
        return props.array.sort(function (a, b) {
            if (a.name > b.name) {
                return 1
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        })
    }
    if (crit === 'age') {
        if (age_sorted) {
            age_sorted = false
            return props.array.reverse()
        }
        age_sorted = true
        return props.array.sort(function (a, b) {
            return a.age - b.age;
        })
    }
}

const ev = () => {
    emit('increment')
}

const counterClass = () => {
    if (props.counter === 0) {
        return 'cero'
    }
    if (props.counter > 0) {
        return 'posit'
    }
    if (props.counter < 0) {
        return 'negat'
    }
}

</script>

<style scoped>
.posit {
    color: green;
}

.negat {
    color: red;
}

.cero {
    color: black;
}
</style>
