<template>
  <div id="container" class="flex flex-col mt-3">
    <!-- HEADER -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center max-md:flex-col-reverse justify-between mb-6 ml-2">
      <div class="flex flex-col md:flex-row md:space-x-2">
        <SearchFilter :loading="loading" />
        <DropdownSort :loading="loading" />
      </div>
      <button
        v-if="authStore.isAdmin"
        onclick="product_modal.showModal()" 
        :class="['btn btn-success', { disabled: loading }]"
      >
        NUEVO PRODUCTO
      </button>
    </div>
    <!-- PRODUCTS CARDS -->
    <div
      v-if="!loading"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <Shop @refresh="refresh" />
    </div>
    <div class="flex gap-10 flex-wrap" v-if="loading">
      <SkeletonProduct v-for="(index) in 4" :key="index" />
    </div>
    <div v-if="!products.length && !loading" class="flex flex-col justify-center items-center min-h-[60vh]">
      <!-- ERROR MESSAGE -->
      <div
        class="flex flex-col items-center bg-slate-300 rounded-md py-4 px-5 md:py-10 md:px-12"
      >
        <div class="flex items-center space-x-1">
          <ExclamationTriangleIcon class="h-8 w-8 text-slate-600" />
          <span>Ha ocurrido un error! Por favor vuelva a intentarlo.</span>
        </div>
        <button @click="getProducts" class="btn btn-blue-main mt-5">Recargar</button>
      </div>
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
  
  <ProductModal id="product_modal" @refresh="refresh" />
</template>

<script setup>
import DropdownSort from "@/components/DropdownSort.vue"
import SearchFilter from "@/components/SearchFilter.vue"
import Shop from "./components/Shop.vue"
import ProductModal from './components/ProductModal.vue'
import SkeletonProduct from '@/components/SkeletonProduct.vue'
import { onMounted, ref, computed } from "vue"
import { useAuthStore } from '@/stores/auth'
import { useProductStore } from "@/stores/product"
import { getProductsService } from '@/services/products'
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"
import { notify } from '@/helpers/notify'
import { MESSAGES, NOTIFICATION } from  '@/utils/constants'
const { MSG_ERROR_GET_ALL_PRODS } = MESSAGES
const { NOTIFY_ERROR } = NOTIFICATION

const authStore = useAuthStore()
const productStore = useProductStore()
const loading = ref(false)
const products = ref([])

const getProducts = async () => {
  loading.value = true
  const { data, error } = await getProductsService()
  if (data) {
    console.log('products data', data)
    products.value = data
  }
  else if (error) {
    console.log('error on get all products', error)
    notify(NOTIFY_ERROR, MSG_ERROR_GET_ALL_PRODS)
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

const refresh = async () => {
  await getProducts()
  sortProducts(products.value)
}

onMounted(async () => {
  await getProducts()
  sortProducts(products.value)
})
</script>

<style></style>
