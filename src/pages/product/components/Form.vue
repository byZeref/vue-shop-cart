<script setup>
import { ref, watch } from 'vue'
import { Validator } from '@vueform/vueform'
import { getProductsService } from '@/services/products'

const emit = defineEmits(['submit'])
const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  product: {
    type: Object,
    required: false,
  },
  submitting: {
    type: Boolean,
    required: true,
  },
  errors: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const unique = class extends Validator {
  get msg() {
    return 'Ya existe este producto. Introduzca un nombre diferente.'
  }

  get isAsync() {
    return true
  }

  async check(value) {
    const { data } = await getProductsService()
    const exists = data.some(product => {
      return product.name.toLowerCase() === value.toLowerCase() 
        && product.name.toLowerCase() !== props.product?.name.toLowerCase()
    })
    return !exists
  }
}

const form = ref()
const name = ref()
const price = ref()
const stock = ref()
const file = ref()
const imagePreview = ref()

const previewImage = () => {
  // if (!file.value.files[0].type.includes('image')) {
  if (!file.value.data.image?.type.includes('image')) {
    file.value.value = null
    return;
  }

  // form.value.image = file.value.files[0] // ev.target.files[0]
  form.value.image = file.value.data.image // ev.target.files[0]
  if (form.value.image) {
    const reader = new FileReader()
    reader.onload = (e) => {
        imagePreview.value = e.target.result
    }
    reader.readAsDataURL(form.value.image)
  } else {
    imagePreview.value = null
  }
}

const submit = () => {
  emit('submit', form.value)
}

const reset = () => {
  form.value.reset()
  imagePreview.value = null
  file.value.value = null
}

const closeModal = () => {
  props.modal.close()
  reset()
}

watch([() => props.submitting, () => props.product], (newV, oldV) => {
  if (newV[0] === false && oldV[0] === true && !props.errors) reset()
  if (newV[1]) {
    name.value.value = props.product.name
    price.value.value = props.product.price
    stock.value.value = props.product.stock
  }
})
</script>

<template>
  <Vueform 
    ref="form"
    :endpoint="false"
    @submit="submit"
    :display-errors="false"
    :messages="{ required: 'Este campo no puede estar vacío', min: 'Mas de 2 caracteres tronco' }"
  >
    <TextElement
      name="name"
      ref="name"
      placeholder="Nombre"
      size="lg"
      :rules="['required', 'min:2', unique]"
      :debounce="500"
    />
    <TextElement
      name="price"
      ref="price"
      input-type="number"
      placeholder="Precio"
      size="lg"
      :rules="['required', 'numeric', 'min:0']"
      :messages="{ min: 'El precio debe ser un número mayor a 0', numeric: 'El precio debe ser un número mayor a 0' }"
      :debounce="500"
    />
    <FileElement
    ref="file"
    input-type="file"
    name="image"
    accept="image/*"
    view="image"
    :description="imagePreview ? '' : 'Seleccione la imagen del producto'"
    :preview-url="imagePreview"
    :upload-temp-endpoint="false"
    :removeTemp="false"
    :remove="false"
    @change="previewImage"
    @remove="() => imagePreview = null"
    />
    <div v-if="imagePreview" class="vf-col-12">
      <img 
        :src="imagePreview" alt=""
        ref="image"
        class="w-auto max-h-[300px] object-contain mx-auto"
      >
    </div>
    <CheckboxElement 
      name="stock"
      ref="stock"
      size="lg"
      :default="true"
    >
      <span class="text-slate-500 text-base">Disponible</span>
    </CheckboxElement>
    <div class="flex vf-col-12 gap-x-2 justify-end mt-3">
      <ButtonElement @click="closeModal" button-label="Cancelar" secondary />
      <ButtonElement button-label="Guardar" submits />
    </div>
  </Vueform>
</template>

<style scoped>

</style>
