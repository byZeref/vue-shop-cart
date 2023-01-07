<template>
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">

            <div class="mt-10 relative z-10">
                <div class="panel border rounded-sm border-sky-500">
                    <h3
                        class="panel_title font-semibold text-sky-500 text-lg uppercase absolute px-2 ml-4 z-30 bg-white">
                        Carrito
                    </h3>
                    <div class="mx-1 md:mx-6 my-5">
                        <table class="w-full text-sm text-left">
                            <thead>
                                <tr class="border-b">
                                    <th class="px-1 py-2 md:p-3">Producto</th>
                                    <th class="px-1 py-2 md:p-3">
                                        <p class="max-md:hidden">Cantidad</p>
                                        <p class="md:hidden">Cant</p>
                                    </th>
                                    <th class="px-1 py-2 md:p-3">Monto</th>
                                    <th class="px-1 py-2 md:p-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item) in cart" :key="item.id">
                                    <tr v-if="item.cant > 0" class="border-b">
                                        <td class="py-2 md:p-3">{{ item.product }}</td>
                                        <td class="py-2 md:p-3">{{ item.cant }}</td>
                                        <td class="py-2 md:p-3">${{ item.monto.toFixed(2) }}</td>
                                        <td class="py-2 md:p-3 space-x-2">
                                            <button @click="add(item)"
                                                :class="[!availableProduct(item.id) ? 'disabled' : '', 'btn btn-success btn-xs md:btn-sm btn-square']">
                                                <PlusIcon class="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                            <button @click="discount(item)"
                                                :class="[item.cant === 0 ? 'disabled' : '', 'btn btn-error btn-xs md:btn-sm btn-square']">
                                                <MinusIcon class="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                                <tr class="text-base">
                                    <td class="uppercase font-semibold py-2 md:p-2">Total</td>
                                    <td class="uppercase font-semibold py-2 md:p-2">{{ totals.tot_prods }}</td>
                                    <td class="uppercase font-semibold py-2 md:p-2">${{ totals.tot_monto.toFixed(2) }}
                                    </td>
                                    <td class="py-2 md:p-2 text-sm">
                                        <button @click="$emit('clear_cart')"
                                            class="btn btn-error btn-xs md:btn-sm text-xs">
                                            <p class="md:hidden">Vaciar</p>
                                            <p class="max-md:hidden">Vaciar Carrito</p>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="modal-action">
                <label for="my-modal-6" class="btn">Yay!</label>
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
