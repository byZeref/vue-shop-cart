<template>
  <dialog id="product_modal" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">NUEVO PRODUCTO</h4>
      <p class="mb-1 text-slate-600">Inserte los datos del nuevo producto</p>

      <Form @submit="submit" :modal="modal" :submitting="submitting" :errors="errors" />
    </div>
  </dialog>
</template>

<script setup>
import Form from './Form.vue'
import { ref } from 'vue'
import { createProductService, uploadImageService } from '@/services/products'
import { notify } from '@/helpers/notify'
import { NOTIFICATION, MESSAGES } from '@/utils/constants'
const { NOTIFY_SUCCESS, NOTIFY_ERROR } = NOTIFICATION
const { MSG_CREATED_PROD, MSG_ERROR_CREATE_PROD, MSG_ERROR_UPLOAD_IMAGE } = MESSAGES

defineProps({
  product: {
    type: Object,
    required: false,
  },
})
const emit = defineEmits(['refresh'])
const modal = ref()
const submitting = ref(false)
const errors = ref(false)

const submit = async (form) => {
  submitting.value = true
  let img
  if (form.image) {
    img = form.image
    const ext = img?.type.substring(6) // type: "image/..."
    const fileName = `${form.name.toLowerCase().replaceAll(' ', '-')}.${ext}`
    form.image = `products/${fileName}`
  }

  const { status, error } = await createProductService(form)
  
  if (status === 201) {
    if (img) {
      const { data, error } = await uploadImageService(img, form.image)
      if (data) {
        productCreatedOk()
      } else if (error) {
        errors.value = true
        form.image = img
        notify(NOTIFY_ERROR, MSG_ERROR_UPLOAD_IMAGE)
      }
    } else {
      productCreatedOk()
    }
  } else if (error) {
    errors.value = true
    notify(NOTIFY_ERROR, MSG_ERROR_CREATE_PROD)
  }
  submitting.value = false
}

const productCreatedOk = () => {
  errors.value = false
  modal.value.close()
  emit('refresh')
  notify(NOTIFY_SUCCESS, MSG_CREATED_PROD)
}

</script>

<style lang="css" scoped>

</style>
