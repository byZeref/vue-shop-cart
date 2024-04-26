<template>
  <dialog id="product_modal" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">NUEVO PRODUCTO</h4>
      <p class="mb-1 text-slate-600">Inserte los datos del nuevo producto</p>

      <Form @submit="submit" :modal="modal" :submitting="submitting" />
    </div>
  </dialog>
</template>

<script setup>
import Form from './Form.vue'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
import { toast } from 'vue3-toastify'

defineProps({
  product: {
    type: Object,
    required: false,
  },
})
const emit = defineEmits(['refresh'])
const modal = ref()
const submitting = ref(false)

const submit = async (form) => {
  console.log('form data', form)
  submitting.value = true
  // upload image
  if (form.image) {
    const { data, error } = await uploadImage(form.image, form.name)
    console.log('upload image response', data)
    if (data) {
      form.image = data.path
    } else if (error) {
      console.error('error on upload image', error);
    }
  }
  // create product
  const { status, error } = await createProduct(form)
  console.log('create product status', status)
  submitting.value = false
  
  if (status === 201) {
    modal.value.close()
    emit('refresh')
    toast('Producto agregado correctamente!', {
      theme: 'light',
      type: 'success',
      pauseOnFocusLoss: false,
    })
  } else if (error) {
    console.error('error on create product', error)
    toast('Error! No se pudo agregar el producto.', {
      theme: 'light',
      type: 'error',
      pauseOnFocusLoss: false,
    })
  }
}

// TODO extraer logica a 'services'
const uploadImage = async (img, product) => {
  const ext = img.type.substring(6) // type: "image/..."
  const fileName = `${product.toLowerCase().replaceAll(' ', '-')}.${ext}`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(`products/${fileName}`, img)

  return { data, error }
}

const createProduct = async (product) => {
  const { status, error } = await supabase
    .from('products')
    .insert(product)

  return { status, error }
}

</script>

<style lang="css" scoped>

</style>
