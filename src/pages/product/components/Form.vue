<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
defineProps({
  product: {
    type: Object,
    required: false,
  },
  modal: {
    type: Object,
    required: true,
  }
})

const form = ref({
  name: '',
  price: '',
  stock: true,
  image: null,
})
const file = ref()
const imagePreview = ref()

const previewImage = () => {
  form.value.image = file.value.files[0] // ev.target.files[0]
  console.log(form.value.image)

  if (form.value.image) {
    const reader = new FileReader()
    reader.onload = (e) => {
        imagePreview.value = e.target.result
    };
    reader.readAsDataURL(form.value.image)
  } else {
    imagePreview.value = null
  }
}

const submit = () => {
  // validate form

  // trigger event submit
  console.log('submit', form.value)
  emit('submit', form.value)
  reset()
}

const reset = () => {
  form.value = {
    name: '',
    price: '',
    stock: true,
    image: null,
  }
  imagePreview.value = null
  file.value.value = null
}

</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-4">
    <!-- NAME -->
    <input
      v-model="form.name"
      type="text"
      placeholder="Nombre"
      :class="['input input-bordered bg-white w-full']"
    />
    <!-- PRICE -->
    <input 
      v-model="form.price"
      type="text" min="0" 
      placeholder="Precio" 
      :class="['input input-bordered bg-white w-full']"
    />
    <!--! IMAGE -->
    <input
      @change="previewImage"
      ref="file"
      type="file"
      accept="image/*"
      class="file-input file-input-ghost file-input-bordered w-full bg-white" 
    />
    <img v-if="imagePreview" ref="image" class="w-full" :src="imagePreview" alt="">
    <!-- STOCK -->
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-x-3">
        <input
          v-model="form.stock"
          type="checkbox"
          class="checkbox checkbox-success" 
        />
        <span class="text-slate-500 text-base">Disponible</span> 
      </label>
    </div>
    <!-- BUTTONS -->
    <div class="buttons flex justify-end gap-x-4 mt-5">
      <label
        class="btn btn-outline hover:opacity-[0.95] flex items-center"
        @click="() => {
          modal.close()
          reset()
        }"
      >
        CANCELAR
      </label>
      <button
        type="submit"
        class="btn btn-success hover:opacity-[0.95] flex items-center"
      >
        GUARDAR
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>
