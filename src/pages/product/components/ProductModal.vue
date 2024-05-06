<template>
  <dialog :id="id" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">{{ title }}</h4>
      <p class="mb-1 text-slate-600">{{ subtitle }}</p>

      <Form
        :product="product"
        :modal="modal"
        :submitting="submitting"
        :errors="errors" 
        @submit="submit"
      />
      <!-- <FormSimple @submit="submit" :modal="modal" :submitting="submitting" :errors="errors" /> -->
    </div>
  </dialog>
</template>

<script setup>
import Form from './Form.vue'
import { ref, computed } from 'vue'
import { createProductService, uploadImageService, updateProductService } from '@/services/products'
import { notify } from '@/helpers/notify'
import { NOTIFICATION, MESSAGES } from '@/utils/constants'
const { NOTIFY_SUCCESS, NOTIFY_ERROR } = NOTIFICATION
const { MSG_CREATED_PROD, MSG_ERROR_SAVE_PROD, MSG_ERROR_UPLOAD_IMAGE, MSG_UPDATED_PROD } = MESSAGES

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    required: false,
  },
})
const emit = defineEmits(['refresh'])
const title = computed(() => props.product ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO')
const subtitle = computed(() => props.product ? 'Modifique los datos del producto' : 'Inserte los datos del nuevo producto')
const modal = ref()
const submitting = ref(false)
const errors = ref(false)

const submit = async (form) => {
  const isEditing = props.product !== undefined
  const { data } = form
  form.submitting = true
  let img
  if (data.image) {
    img = data.image
    const ext = img?.type.substring(6) // type: "image/..."
    const fileName = `${data.name.toLowerCase().replaceAll(' ', '-')}.${ext}`
    data.image = `products/${fileName}`
  }

  const { status, error } = isEditing
    ? await updateProductService(props.product.id, data)
    : await createProductService(data)
  
  if ((!isEditing && status === 201) || (isEditing && status === 204)) {
    if (img) {
      const { data: response, error } = await uploadImageService(img, data.image)
      if (response) {
        success(form)
      } else if (error) {
        errors.value = true
        data.image = img
        notify(NOTIFY_ERROR, MSG_ERROR_UPLOAD_IMAGE)
      }
    } else {
      success(form)
    }
  } else if (error) {
    errors.value = true
    notify(NOTIFY_ERROR, MSG_ERROR_SAVE_PROD)
  }
  form.submitting = false
}

const success = (form) => {
  errors.value = false
  modal.value.close()
  form.reset()
  emit('refresh')
  notify(NOTIFY_SUCCESS, props.product ? MSG_UPDATED_PROD : MSG_CREATED_PROD)
}

</script>

<style lang="css" scoped>

</style>
