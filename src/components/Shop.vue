<template>
  <div
    v-for="item in productStore.filter_products"
    :key="item.id"
    class="card md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white min-h-[420px]"
  >
    <img
      class="h-48 w-full rounded-t-xl object-cover 2xl:h-40"
      :src="`/images/${item.image}`"
      :alt="`Imagen de ${item.name}`"
    />

    <div class="p-8 card-content">
      <div
        id="heading"
        class="mb-2 md:mb-1 flex flex-col items-start md:flex-row md:justify-between md:items-center gap-1"
      >
        <h3 class="text-lg font-semibold uppercase text-[#003399]">
          {{ item.name }}
        </h3>
        <span
          :class="[
            availableProduct(item).bool
              ? 'bg-emerald-400'
              : 'bg-red-400 min-w-[80px]',
            'text-xs font-semibold rounded-sm px-2 py-1 text-center',
          ]"
        >
          {{ availableProduct(item).msg }}
        </span>
      </div>
      <p class="text-slate-500 mb-1">Precio: ${{ item.price }}.00</p>
      <button
        @click="addToCart(item)"
        :class="[
          !availableProduct(item).bool ? 'disabled' : '',
          'btn btn-block mt-8 bg-[#003399]',
        ]"
      >
        Agregar al Carrito
      </button>
    </div>
  </div>

  <!-- <button @click="goTop" class="btn">TOP</button> -->
</template>

<script setup>
import { useProductStore } from "../stores/product"
import { useCartStore } from "../stores/cart"

const productStore = useProductStore()
const cartStore = useCartStore()

const addToCart = (item) => {
  cartStore.add(item)
}

const availableProduct = (prod) => {
  return {
    msg: prod.stock ? "Disponible" : "Agotado",
    bool: prod.stock,
  }
}
</script>

<style lang="css" scoped>
.card {
  & .card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    & button.btn {
      margin-top: auto;
    }
  }
}
</style>
