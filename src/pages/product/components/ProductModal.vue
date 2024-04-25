<template>
  <dialog id="product_modal" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">NUEVO PRODUCTO</h4>
      <p class="mb-1 text-slate-600">Inserte los datos del nuevo producto</p>

      <Form @submit="submit" :modal="modal"  />
    </div>
  </dialog>
</template>

<script setup>
import Form from './Form.vue'
import { ref } from 'vue'

defineProps({
  product: {
    type: Object,
    required: false,
  },
})
const emit = defineEmits(['submit'])
const modal = ref()

const submit = async () => {
  // handle supabase action (create | update)

  // setTimeout(() => {
  //   modal.value.close()
  // }, 2000);
}

</script>

<style lang="css" scoped>

</style>
