<template>
  <div id="container" class="flex flex-col mt-3">
    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between mb-6 ml-2">
      <div class="flex flex-col md:flex-row md:space-x-2">
        <SearchFilter />
        <DropdownSort />
      </div>
    </div>
    <!-- PRODUCTS CARDS -->
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <Shop />
    </div>
    <!-- EMPTY SEARCH -->
    <div v-if="productStore.empty_search">
      <div
        class="flex flex-col md:flex-row items-center space-x-1 bg-slate-300 rounded-md py-4 px-5 md:py-10 md:px-12"
      >
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
</template>

<script setup>
import api_request from "../js/api_request";
import Shop from "../components/Shop.vue";
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import DropdownSort from "../components/DropdownSort.vue";
import SearchFilter from "../components/SearchFilter.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import { PRODUCTS } from '@/utils/constants'

const productStore = useProductStore();

onMounted(async () => {
  // api_request(productStore.products);
  const { products: store_products } = productStore
  PRODUCTS.forEach(item => {
      store_products.push(item)
  })
  store_products.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
  })
});
</script>

<style></style>
