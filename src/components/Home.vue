<template>
    <div v-for="(item) in products" :key="item.id"
        class="flex flex-col flex-auto border border-sky-500 mx-2 px-4 py-2 rounded-sm w-52">
        <div id="image" class="mb-4">
            <img class="h-32" :src="'src/assets/images/' + item.name.toLowerCase() + '.jpg'" alt="">
        </div>
        <div id="heading" class="flex max-xl:flex-col justify-between max-xl:items-start items-center mb-2">
            <h3 class="text-lg font-semibold ">{{ item.name }}</h3>
            <span
                :class="[availableProduct(item).bool ? 'bg-emerald-400' : 'bg-red-400', 'text-xs font-semibold rounded-sm px-2 py-1']">
                {{ availableProduct(item).msg }}
            </span>
        </div>
        <p class="text-sm text-slate-600 mb-1">Precio: ${{ item.price }}</p>
        <p class="text-sm">
            Stock:
            <span class="font-semibold">{{ item.stock }}</span>
            {{ item.stock === 1 ? 'unidad' : 'unidades' }}
        </p>
        <button @click="$emit('addToCart', item)"
            :class="[!availableProduct(item).bool ? 'disabled' : '', 'block text-white bg-sky-400 hover:bg-sky-500 active:bg-sky-600 duration-200 py-2 rounded-sm mt-5']">
            Comprar
        </button>
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

<style scoped>
/* h3 {
    color: v-bind(av_prod_color);
} */
</style>
