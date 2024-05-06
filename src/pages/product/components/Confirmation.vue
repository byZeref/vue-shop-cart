<script setup>
import { ref } from 'vue'
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  loading: Boolean,
})
defineEmits(['removeProduct'])

const modal = ref()

</script>

<template>
  <dialog id="product_modal_confirm" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">CONFIRMACIÓN</h4>
      <p class="text-slate-600">
        Seguro que desea eliminar el producto <strong>{{ product?.name }}</strong>?
      </p>
      <div class="flex items-center gap-x-1 text-red-500">
        <ExclamationTriangleIcon class="w-5" />
        <p>Esta acción es irreversible.</p>
      </div>
      
      <div class="flex vf-col-12 gap-x-2 justify-end mt-10">
        <button
          @click="() => modal.close()"
          class="btn btn-error btn-outline hover:text-white"
        >
          Cancelar
        </button>
        <button
          @click="$emit('removeProduct')"
          class="btn btn-error text-white min-w-32"
        >
        <span v-if="loading" class="loading"></span>
        <span v-else>ELIMINAR</span>
        </button>

      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>
