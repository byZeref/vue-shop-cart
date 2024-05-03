<template>
  <dialog id="product_modal" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">NUEVO PRODUCTO</h4>
      <p class="mb-1 text-slate-600">Inserte los datos del nuevo producto</p>

      <Form @submit="submit" :modal="modal" :submitting="submitting" :errors="errors" />
      <!-- <FormSimple @submit="submit" :modal="modal" :submitting="submitting" :errors="errors" /> -->
    </div>
  </dialog>
</template>

<script setup>
import Form from './Form.vue'
import FormSimple from './FormSimple.vue'
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
  const { data } = form
  form.submitting = true
  let img
  if (data.image) {
    img = data.image
    const ext = img?.type.substring(6) // type: "image/..."
    const fileName = `${data.name.toLowerCase().replaceAll(' ', '-')}.${ext}`
    data.image = `products/${fileName}`
  } else {
    // TODO buscar en storage si ya existe la imagen y setearla
  }

  const { status, error } = await createProductService(data)
  
  if (status === 201) {
    if (img) {
      const { data: response, error } = await uploadImageService(img, data.image)
      if (response) {
        productCreatedOk(form)
      } else if (error) {
        errors.value = true
        data.image = img
        notify(NOTIFY_ERROR, MSG_ERROR_UPLOAD_IMAGE)
      }
    } else {
      productCreatedOk(form)
    }
  } else if (error) {
    errors.value = true
    notify(NOTIFY_ERROR, MSG_ERROR_CREATE_PROD)
  }
  form.submitting = false
}

const productCreatedOk = (form) => {
  errors.value = false
  modal.value.close()
  form.reset()
  emit('refresh')
  notify(NOTIFY_SUCCESS, MSG_CREATED_PROD)
}

</script>

<style lang="css" scoped>

</style>
