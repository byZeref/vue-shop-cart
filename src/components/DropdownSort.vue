<template>
  <div class="w-52">
    <Listbox v-model="selected">
      <div class="relative mt-1">
        <ListboxButton
          id="menu-button"
          class="relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300 text-sm"
        >
          <span
            class="flex truncate text-slate-500 hover:opacity-80 duration-200"
          >
            Orden:
            <p class="font-semibold ml-1">{{ selected }}</p>
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-slate-500"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="opt in options"
              :key="opt"
              :value="opt"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-emerald-100 text-emerald-800' : 'text-gray-900',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ opt }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useProductStore } from "../stores/product";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const productStore = useProductStore();
const options = ref(["Nombre", "Precio", "Disponibilidad"]);
const selected = ref(options.value[0]);

watch(selected, () => {
  productStore.sortProds(selected.value.toLocaleLowerCase());
});
</script>

<style scoped>
#menu-button {
  background-color: #fff;
}
</style>
