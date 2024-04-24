<template>
  <div class="navbar bg-white shadow rounded-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div @click="dropdownVisible = true" tabindex="0" role="button" class="btn btn-ghost p-1 lg:hidden">
          <Bars3CenterLeftIcon class="w-7 h-7" />
        </div>
        <ul
          v-show="dropdownVisible"
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-40 md:w-52"
        >
          <li @click="dropdownVisible = false"><RouterLink to="/">Inicio</RouterLink></li>
          <li @click="dropdownVisible = false"><RouterLink to="/productos">Productos</RouterLink></li>
          <li>
            <label for="contact-modal">Contacto</label>
          </li>
        </ul>
      </div>
      <img
        src="/images/logo.png"
        class="main-image desktop max-lg:hidden"
        alt="fruit-logo"
      />
      <RouterLink to="/" class="max-lg:hidden text-2xl font-medium">
        <!-- Masticando -->
      </RouterLink>
    </div>
    <img src="/images/logo.png" class="main-image lg:hidden" alt="fruit-logo" />
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink to="/" class="max-lg:hidden">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink to="/productos" class="max-lg:hidden">Productos</RouterLink>
        </li>
        <li><label for="contact-modal">Contacto</label></li>
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label @click="dropdownCartVisible = true" tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <ShoppingCartIcon class="w-6 h-6" />
            <span v-if="store.counter > 0" class="badge badge-sm bg-accent text-white border-none indicator-item">
              {{ store.counter }}
            </span>
          </div>
        </label>
        <div
          v-show="dropdownCartVisible"
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-60 bg-white shadow"
        >
          <div class="card-body">
            <span class="font-bold text-lg text-slate-600">
              {{ store.counter }}
              {{
                store.counter === 1
                  ? "Producto Agregado"
                  : "Productos Agregados"
              }}
            </span>
            <span class="text-slate-500">Subtotal: ${{ store.mount.toFixed(2) }}</span>
            <div class="card-actions">
              <label 
                @click="dropdownCartVisible = false"
                for="cart-modal" 
                :class="[store.counter === 0 ? 'disabled' : '','btn btn-outline btn-accent btn-block',]"
              >
                Ver Carrito
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CartModal />
  <ContactModal />
</template>

<script setup>
import { ref } from "vue"
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline"
import { useCartStore } from "../stores/cart"
import CartModal from "../components/CartModal.vue"
import ContactModal from "../components/ContactModal.vue"

const store = useCartStore()
const link_color = "#003399"
const dropdownVisible = ref(true)
const dropdownCartVisible = ref(true)
</script>

<style lang="css">
ul > li > a:active,
ul > li > label:active {
  background-color: v-bind(link_color);
}
.main-image {
  aspect-ratio: 16/9;
  height: 50px;
  width: auto;
  &.desktop {
    margin-left: 12px;
  }
}
.navbar {
  position: fixed;
  width: calc(100% - 64px) !important;
  max-width: calc(1536px - 64px);
  box-sizing: border-box;
  z-index: 100;
}
.router-link-active,
.router-link-exact-active {
  background-color: #003399;
  color: #fff !important;
  &:hover,
  &:focus {
    background-color: #003399;
  }
}
</style>
