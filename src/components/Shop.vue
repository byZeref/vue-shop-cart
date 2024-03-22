<template>
  <div
    v-for="item in productStore.filter_products"
    :key="item.id"
    class="card md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white min-h-[420px]"
  >
    <img
      class="h-48 w-full rounded-t-xl object-cover 2xl:h-40"
      :src="`src/assets/images/${item.image}`"
      :alt="`Imagen de ${item.name}`"
    />

    <div class="p-8 card-content">
      <div
        id="heading"
        class="mb-2 md:mb-1 flex flex-col items-start md:flex-row md:justify-between md:items-center gap-1"
      >
        <h3 class="text-lg font-semibold uppercase text-sky-500">
          {{ item.name }}
        </h3>
        <span
          :class="[
            availableProduct(item).bool ? 'bg-emerald-400' : 'bg-red-400',
            'text-xs font-semibold rounded-sm px-2 py-1',
          ]"
        >
          {{ availableProduct(item).msg }}
        </span>
      </div>
      <p class="text-slate-500 mb-1">Precio: ${{ item.price }}.00</p>
      <!-- <p class="text-slate-500">
                Stock:
                <span class="counter font-semibold">{{ item.stock }}</span>
                {{ item.stock === 1 ? 'unidad' : 'unidades' }}
            </p> -->
      <button
        @click="addToCart(item)"
        :class="[
          !availableProduct(item).bool ? 'disabled' : '',
          'btn btn-info btn-block mt-8',
        ]"
      >
        Agregar al Carrito
      </button>
      <!-- <button @click="addToCart(item)"
                :class="[outOfStock(item) ? 'disabled' : '', 'btn btn-info btn-block mt-8']">
                Agregar al Carrito
            </button> -->
    </div>
  </div>

  <!-- <button @click="goTop" class="btn">TOP</button> -->
</template>

<script setup>
import { useProductStore } from "../stores/product";
import { useCartStore } from "../stores/cart";

const productStore = useProductStore();
const cartStore = useCartStore();

// const goTop = () => {
//     window.scroll(0, 0)
// }

const addToCart = (item) => {
  cartStore.add(item);
};

const outOfStock = (prod) => {
  const cart_prod = cartStore.cart.find((el) => el.id === prod.id);

  if (cart_prod) {
    return prod.stock <= cart_prod.cant ? true : false;
  } else {
    return prod.stock === 0 ? true : false;
  }
};

const availableProduct = (prod) => {
  return {
    msg: prod.stock ? "Disponible" : "No disponible",
    bool: prod.stock,
  };
};
// const availableProduct = (prod) => {
//   return {
//     msg: prod.stock > 0 ? "Disponible" : "No disponible",
//     bool: prod.stock > 0 ? true : false,
//   };
// };
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
