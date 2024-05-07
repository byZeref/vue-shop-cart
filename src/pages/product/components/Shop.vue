<template>
  <div
    v-for="item in productStore.filter_products"
    :key="item.id"
    class="card md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white min-h-[420px]"
  >
    <img
      class="h-48 w-full rounded-t-xl object-cover 2xl:h-40"
      :src="`${IMAGES_PATH}/${item.image}`"
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
      <p class="text-slate-500 mb-1">Precio: ${{ item.price.toFixed(2) }}</p>
      <div class="mt-auto gap-2 flex flex-col">
        <button
          v-if="!authStore.isAdmin"
          @click="addToCart(item)"
          :class="[
            !availableProduct(item).bool ? 'disabled' : '',
            'btn btn-block bg-[#003399] hover:bg-[#003399] text-white',
          ]"
        >
          Agregar al Carrito
        </button>
        <button
          v-if="authStore.isAdmin"
          onclick="product_modal_edit.showModal()"
          @click="handleEditProduct(item)"
          class="btn btn-block bg-[#003399] hover:bg-[#003399] text-white"
        >
          EDITAR PRODUCTO
        </button>
        <button
          v-if="authStore.isAdmin"
          onclick="product_modal_confirm.showModal()"
          @click="() => targetProduct = item"
          class="btn btn-block btn-error text-white"
        >
          ELIMINAR PRODUCTO
        </button>
      </div>
    </div>
  </div>

  <ProductModal
    id="product_modal_edit"
    :product="targetProduct"
    @refresh="$emit('refresh')"
  />
  <Confirmation
    :product="targetProduct"
    :loading="removing"
    @remove-product="handleDeleteProduct" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore } from "@/stores/product"
import { useCartStore } from "@/stores/cart"
import { useAuthStore } from "@/stores/auth"
import ProductModal from './ProductModal.vue'
import Confirmation from './Confirmation.vue'
import { deleteProductService } from '@/services/products'
import { notify } from '@/helpers/notify'
import { NOTIFICATION, MESSAGES } from '@/utils/constants'
const { NOTIFY_SUCCESS, NOTIFY_ERROR } = NOTIFICATION
const { MSG_DELETED_PROD, MSG_ERROR_DELETE_PROD, MSG_ERROR_DELETE_PROD_IMG } = MESSAGES

const emit = defineEmits(['refresh'])

const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const IMAGES_PATH = `${import.meta.env.VITE_PROJECT_URL}/${import.meta.env.VITE_IMAGES_PATH}`
const targetProduct = ref()

const addToCart = (item) => {
  cartStore.add(item)
}

const availableProduct = (prod) => {
  return {
    msg: prod.stock ? "Disponible" : "Agotado",
    bool: prod.stock,
  }
}

const handleEditProduct = (prod) => {
  targetProduct.value = prod
}

const removing = ref(false)

const handleDeleteProduct = async () => {
  const modal = document.getElementById('product_modal_confirm')
  removing.value = true
  const { status, error, imageError } = await deleteProductService(targetProduct.value)
  removing.value = false

  if (error) {
    console.error('error on remove product')
    notify(NOTIFY_ERROR, MSG_ERROR_DELETE_PROD)
  }
  if (imageError) {
    console.error('error on remove image')
    notify(NOTIFY_ERROR, MSG_ERROR_DELETE_PROD_IMG)
  }
  if (status === 204) {
    modal.close()
    emit('refresh')
    notify(NOTIFY_SUCCESS, MSG_DELETED_PROD)
  }
}
</script>

<style lang="css" scoped>
.card {
  & .card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
