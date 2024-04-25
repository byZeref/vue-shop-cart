<template>
  <dialog id="product_modal" class="modal max-md:modal-bottom" ref="modal">
    <div :class="['modal-box bg-white w-full md:max-w-md']">
      <h4 class="text-xl font-semibold text-slate-700 mb-4">NUEVO PRODUCTO</h4>
      <p class="mb-1 text-slate-600">Inserte los datos del nuevo producto</p>

      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Nombre"
          :class="['input input-bordered bg-white w-full', { 'input-error': error.name }]"
        />
        <input 
          v-model="form.price"
          type="text" min="0" 
          placeholder="Precio" 
          :class="['input input-bordered bg-white w-full', { 'input-error': error.price }]"
        />
        <input
          type="file"
          accept="image/*"
          class="file-input file-input-ghost file-input-bordered w-full bg-white" 
        />
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

        <div class="buttons flex justify-end gap-x-4 mt-5">
          <label
            onclick="product_modal.close()"
            class="btn btn-outline hover:opacity-[0.95] flex items-center"
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
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
const modal = ref()

const form = ref({
  name: '',
  price: '',
  stock: true,
  image: null,
})
const error = ref({
  name: false,
  price: false,
  stock: false,
  image: false,
})

const submit = async () => {
  console.log('submit', form.value)
  setTimeout(() => {
    modal.value.close()
  }, 2000);
}

</script>

<style lang="css" scoped>

</style>
