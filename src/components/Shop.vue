<template>
    <div v-for="(item) in products" :key="item.id" class="md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white">

        <img class="h-48 w-full rounded-t-xl object-cover 2xl:h-40"
            :src="'src/assets/images/' + item.name.toLowerCase() + '.jpg'" alt="">

        <div class="p-8">
            <div id="heading" class="mb-2 md:mb-1 md:flex justify-between items-center">
                <h3 class="text-lg font-semibold uppercase text-sky-500">{{ item.name }}</h3>
                <span
                    :class="[availableProduct(item).bool ? 'bg-emerald-400' : 'bg-red-400', 'text-xs font-semibold rounded-sm px-2 py-1']">
                    {{ availableProduct(item).msg }}
                </span>
            </div>
            <p class=" text-slate-500 mb-1">Precio: ${{ item.price }}</p>
            <p class="text-slate-500">
                Stock:
                <span class="font-semibold">{{ item.stock }}</span>
                {{ item.stock === 1 ? 'unidad' : 'unidades' }}
            </p>
            <button @click="$emit('addToCart', item)"
                :class="[!availableProduct(item).bool ? 'disabled' : '', 'btn btn-info btn-block mt-8']">
                Agregar al Carrito
            </button>
        </div>

    </div>

</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    products: {
        type: Array,
        required: true
    },
    cart: {
        type: Array,
        required: true
    }
})
const emits = defineEmits(['addToCart'])

const availableProduct = (prod) => {
    return {
        msg: prod.stock > 0 ? 'Disponible' : 'No disponible',
        bool: prod.stock > 0 ? true : false
    }
}

// const av_prod_color = 'text-emerald-500'
</script>

<style>
/* #app {
    background-color: black;
} */

/* h3 {
    color: v-bind(av_prod_color);
} */
</style>
