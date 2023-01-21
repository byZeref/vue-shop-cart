<template>
    <div v-for="(item) in products" :key="item.id" class="md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white">

        <img class="h-48 w-full rounded-t-xl object-cover 2xl:h-40"
            :src="`src/assets/images/${item.name.toLowerCase()}.jpg`" :alt="`Imagen de ${item.name}`">

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
                <span class="counter font-semibold">{{ item.stock }}</span>
                {{ item.stock === 1 ? 'unidad' : 'unidades' }}
            </p>
            <button @click="addToCart(item)"
                :class="[outOfStock(item) ? 'disabled' : '', 'btn btn-info btn-block mt-8']">
                Agregar al Carrito
            </button>
        </div>
    </div>
    <!-- <button @click="goTop" class="btn">TOP</button> -->
</template>

<script setup>
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';

const productStore = useProductStore()
const { products } = productStore
const cartStore = useCartStore()

// const goTop = () => {
//     window.scroll(0, 0)
// }

const addToCart = (item) => {
    cartStore.add(item)
}

const outOfStock = (prod) => {
    const cart_prod = cartStore.cart.find(el => el.id === prod.id)

    if (cart_prod) {
        return prod.stock <= cart_prod.cant ? true : false
    } else {
        return prod.stock === 0 ? true : false
    }
}

const availableProduct = (prod) => {
    return {
        msg: prod.stock > 0 ? 'Disponible' : 'No disponible',
        bool: prod.stock > 0 ? true : false
    }
}

</script>

<style>

</style>
