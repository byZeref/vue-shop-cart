<template>
  <div id="container" class="flex flex-col mt-3 px-10">
    <h1 class="text-3xl font-semibold mb-6 ml-2">Tienda de Frutas</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Home :products="products" :cart="cart" @addToCart="addToCart" />
    </div>

    <Cart v-if="!empty_cart" class="mx-2" :products="products" :cart="cart" @clear_cart="clear_cart"
      @addToCart="addToCart" @discountFromCart="discountFromCart" />
  </div>

  <!-- TAILWIND RESPONSIVE EXAMPLE -->
  <div class="mt-10 max-w-md mx-auto bg-white rounded-xl shadow-md  md:max-w-2xl">
    <div class="md:flex">
      <div class="md:shrink-0">
        <img class="h-48 w-full object-cover md:h-full md:w-48" src="../assets/images/banana.jpg"
          alt="Modern building architecture">
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible
          accomodation for your team</a>
        <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in
          some
          sunshine? We have a list of places to do just that.</p>
      </div>
    </div>
  </div>




</template>

<script setup>
import Home from "../components/Home.vue";
import Cart from "../components/Cart.vue";
import api_request from "../js/api_request";
import { ref, computed, onMounted } from "vue";

const products = ref([])
const cart = ref([])
let empty_cart = ref(true)

const addToCart = (item) => {
  const prod = cart.value.find(el => el.id === item.id)
  if (prod && item.stock > 0) {
    prod.cant++
    prod.monto = prod.price * prod.cant
    item.stock--
  } else {
    item.stock--
    // TODO monto con 2 lugares decimales
    cart.value.push({
      id: item.id,
      product: item.name,
      cant: 1,
      price: item.price,
      monto: item.price
    })
  }
  empty_cart.value = false
}

const discountFromCart = (item) => {
  if (item.cant > 0) {
    const prod = products.value.find(el => el.id === item.id)
    prod.stock++
    item.cant--
    item.monto -= item.price
  }
  if (getCartProductsCount() === 0) {
    empty_cart.value = true
  }
}

const getCartProductsCount = () => {
  let c = 0
  cart.value.forEach(item => {
    c += item.cant
  });
  return c
}

const clear_cart = () => {
  cart.value.forEach(cart_item => {
    const prod = products.value.find(item => item.id === cart_item.id)
    prod.stock += cart_item.cant
  });
  cart.value = []
  empty_cart.value = true
}

onMounted(async () => {
  api_request(products.value)
})
</script>

<style>

</style>
