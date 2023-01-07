<template>
  <div id="container" class="flex flex-col mt-3">
    <h1 class="text-3xl font-semibold mb-6 ml-2">Tienda de Frutas</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Shop :products="products" :cart="cart" @addToCart="addToCart" />
    </div>

    <!-- TODO mostrar el carrito en un modal -->
    <Cart v-if="!empty_cart" class="mx-2" :products="products" :cart="cart" @clear_cart="clear_cart"
      @addToCart="addToCart" @discountFromCart="discountFromCart" />
  </div>

  <!-- TAILWIND RESPONSIVE EXAMPLE -->
  <!-- <div class="mt-10 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
  </div> -->


</template>

<script setup>
import Shop from "../components/Shop.vue";
import Cart from "../components/Cart.vue";
import api_request from "../js/api_request";
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cart";

const products = ref([])
const cart = ref([]) // TODO cart debe estar en el store para acceder desde el navbar
let empty_cart = ref(true)
const store = useCartStore()

const addToCart = (item) => {
  const prod = cart.value.find(el => el.id === item.id)
  if (prod && item.stock > 0) {
    prod.cant++
    prod.monto = prod.price * prod.cant
    item.stock--
    store.subtotal(prod.price)
  } else {
    item.stock--
    cart.value.push({
      id: item.id,
      product: item.name,
      cant: 1,
      price: item.price,
      monto: item.price
    })
    store.mount += item.price
  }
  store.add()
  empty_cart.value = false
}

const discountFromCart = (item) => {
  if (item.cant > 0) {
    const prod = products.value.find(el => el.id === item.id)
    prod.stock++
    item.cant--
    item.monto -= item.price
    store.subtotal(item.price * (-1)) // para q lo reste
  }
  if (getCartProductsCount() === 0) {
    empty_cart.value = true
  }
  store.remove()
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
  store.counter = 0
  store.mount = 0
}

onMounted(async () => {
  api_request(products.value)
})
</script>

<style>

</style>
