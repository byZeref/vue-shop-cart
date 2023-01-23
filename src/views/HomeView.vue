<template>
  <div id="container" class="flex flex-col mt-3">
    <div class="flex flex-col md:flex-row justify-between mb-6 ml-2">
      <h1 class="text-3xl font-semibold mb-1">Tienda de Frutas</h1>
      <div class="flex flex-col md:flex-row md:space-x-2">
        <SearchFilter />
        <!-- TODO dropdown sort -->
        <DropdownSort />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Shop />
    </div>

    <div v-if="productStore.empty_search">
      <div class="flex flex-col md:flex-row items-center space-x-1 bg-slate-300 rounded-md py-4 px-5 md:py-10 md:px-12">
        <ExclamationTriangleIcon class="h-8 w-8 text-slate-600" />
        <div class="flex items-center">
          <h3 class="md:text-xl text-slate-600">
            <span class="text-slate-600 font-semibold">Upss!!</span>
            No se encontraron resultados en la búsqueda.
          </h3>
        </div>
      </div>
    </div>

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
import api_request from "../js/api_request";
import Shop from "../components/Shop.vue";
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import DropdownSort from "../components/DropdownSort.vue";
import SearchFilter from "../components/SearchFilter.vue";
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const productStore = useProductStore()

onMounted(async () => {
  api_request(productStore.products)
})
</script>

<style>

</style>
