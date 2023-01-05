<template>
    <div class="mt-10 relative z-10">
        <div class="panel border rounded-sm border-slate-400">
            <h3 class="panel_title font-semibold text-lg absolute px-2 ml-4 z-30 bg-white">Carrito</h3>
            <div class="mx-6 my-5">
                <table class="w-full text-sm text-left">
                    <thead>
                        <tr class="border-b">
                            <th class="p-3">Producto</th>
                            <th class="p-3">Cantidad</th>
                            <th class="p-3">Monto</th>
                            <th class="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item) in cart" :key="item.id">
                            <tr v-if="item.cant > 0" class="border-b">
                                <td class="p-3">{{ item.product }}</td>
                                <td class="p-3">{{ item.cant }}</td>
                                <td class="p-3">${{ item.monto.toFixed(2) }}</td>
                                <td class="p-3 space-x-2">
                                    <button @click="add(item)"
                                        :class="[!availableProduct(item.id) ? 'disabled' : '', 'bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-700 duration-150 text-white p-1 rounded-sm']">
                                        <PlusIcon class="w-4 h-4" />
                                    </button>
                                    <button @click="discount(item)"
                                        :class="[item.cant === 0 ? 'disabled' : '', 'bg-red-400 hover:bg-red-500 active:bg-red-700 duration-150 text-white p-1 rounded-sm']">
                                        <MinusIcon class="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        </template>
                        <tr class="text-base">
                            <td class="uppercase font-semibold p-2">Total</td>
                            <td class="uppercase font-semibold p-2">{{ totals.tot_prods }}</td>
                            <td class="uppercase font-semibold p-2">$ {{ totals.tot_monto.toFixed(2) }}</td>
                            <td class="p-2 text-sm">
                                <button @click="$emit('clear_cart')"
                                    class="bg-red-400 hover:bg-red-500 active:bg-red-700 duration-150 rounded-sm text-sm text-white px-2 py-1">
                                    Vaciar Carrito
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['clear_cart', 'addToCart', 'discountFromCart'])
const props = defineProps({
    cart: {
        type: Array,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
})

const totals = computed(() => {
    const totals = {
        tot_prods: 0,
        tot_monto: 0
    }
    props.cart.forEach(item => {
        totals.tot_prods += item.cant
        totals.tot_monto += item.monto
    });
    totals.tot_monto.toFixed(2)
    return totals
})

const add = (item) => {
    const prod = props.products.find(el => el.id === item.id)
    emit('addToCart', prod)
}

const discount = (item) => {
    emit('discountFromCart', item)
}

// se repite en Home pq no hay state-manager
const availableProduct = (id) => {
    const prod = props.products.find(item => item.id === id)
    return prod.stock > 0 ? true : false
}

</script>

<style scoped>
.panel>.panel_title {
    top: -1rem;
    /* -16px */
}
</style>
