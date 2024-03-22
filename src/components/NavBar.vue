<template>
  <!-- TODO change mobile menu -->
  <div class="navbar bg-base-100 shadow rounded-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost p-1 lg:hidden">
          <Bars3CenterLeftIcon class="w-7 h-7" />
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-40 md:w-52"
        >
          <li><a>Inicio</a></li>
          <!-- <li tabindex="0">
            <a class="justify-between">
              Parent
              <ChevronRightIcon class="w-4 h-4" />
            </a>
            <ul class="p-2 bg-white shadow-lg">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li> -->
          <li><a>Contacto</a></li>
        </ul>
      </div>
      <img
        src="../assets/images/logo.png"
        class="main-image desktop max-lg:hidden"
        alt="fruit-logo"
      />
      <RouterLink to="/" class="max-lg:hidden text-2xl font-medium">
        <!-- Masticando -->
      </RouterLink>
    </div>
    <img
      src="../assets/images/logo.png"
      class="main-image lg:hidden"
      alt="fruit-logo"
    />
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Inicio</a></li>
        <!-- <li tabindex="0">
          <a>
            Parent
            <ChevronDownIcon class="w-4 h-4" />
          </a>
          <ul class="p-2 bg-white shadow-lg">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li> -->
        <li><a>Contacto</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <ShoppingCartIcon class="w-6 h-6" />
            <span
              v-if="store.counter > 0"
              class="badge badge-sm bg-accent border-none indicator-item"
              >{{ store.counter }}</span
            >
          </div>
        </label>
        <div
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-60 bg-base-100 shadow"
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
            <span class="text-slate-500"
              >Subtotal: ${{ store.mount.toFixed(2) }}</span
            >
            <div class="card-actions">
              <label
                for="cart-modal"
                :class="[
                  store.counter === 0 ? 'disabled' : '',
                  'btn btn-outline btn-accent btn-block',
                ]"
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
</template>

<script setup>
import { ref } from "vue";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { useCartStore } from "../stores/cart";
import CartModal from "../components/CartModal.vue";

const store = useCartStore();
const link_color = "#3ABFF8";
</script>

<style lang="css">
ul > li > a:active {
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
  z-index: 100;
}
</style>
