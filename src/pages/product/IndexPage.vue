<template>
  <div id="container" class="flex flex-col mt-3">
    <!-- HEADER -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center max-md:flex-col-reverse justify-between mb-6 ml-2">
      <div class="flex flex-col md:flex-row md:space-x-2">
        <SearchFilter />
        <DropdownSort />
      </div>
      <button 
        onclick="product_modal.showModal()" 
        :class="['btn btn-success']"
      >
        NUEVO PRODUCTO
      </button>
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
          <h3 class="md:text-xl text-slate-600 max-sm:text-center">
            <span class="text-slate-600 font-semibold">Upss!!</span>
            No se encontraron resultados en la búsqueda.
          </h3>
        </div>
      </div>
    </div>
  </div>
  
  <ProductModal />
</template>

<script setup>
import DropdownSort from "@/components/DropdownSort.vue"
import SearchFilter from "@/components/SearchFilter.vue"
import Shop from "./components/Shop.vue"
import ProductModal from './components/ProductModal.vue'
import { onMounted, ref } from "vue"
import { useProductStore } from "@/stores/product"
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"
import { supabase } from '@/lib/supabaseClient'

const productStore = useProductStore()
const loading = ref(false)
const products = ref([])

const getProducts = async () => {
  loading.value = true
  const { data } = await supabase.from('products').select() //.limit(2)
  if (data) {
    console.log('products data', data)
    products.value = data
  }
  loading.value = false
}

const sortProducts = (prods) => {
  prods.sort((a, b) => {
    if (a.stock && !b.stock) return -1
    if (!a.stock && !b.stock) return 1
    return 0
  })
  productStore.setProducts(prods)
}

onMounted(async () => {
  await getProducts()
  sortProducts(products.value)
})
</script>

<style></style>
