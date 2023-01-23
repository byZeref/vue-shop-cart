<template>
    <div id="search">
        <div class="relative mt-1 rounded-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-slate-500 sm:text-sm">
                    <MagnifyingGlassIcon id="search_icon" class="w-4 h-4"
                        :class="focus_search ? 'text-emerald-500' : ''" />
                </span>
            </div>
            <input type="text" v-model="filter_input" @keyup="filterProducts"
                class="block shadow-lg ml-1 mb-1 w-52 md:w-full text-slate-500 rounded-md pl-7 pr-12 border-none hover:duration-100 focus:duration-100 hover:border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500 focus:caret-emerald-500 text-sm"
                placeholder="Buscar Producto..." @focusin="toogleFocus" @focusout="toogleFocus" />
        </div>
    </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/product';

const productStore = useProductStore()
const { products } = productStore

const focus_search = ref(false)
const filter_input = ref('')

const filterProducts = () => {
    productStore.filterProds(filter_input.value.toLocaleLowerCase())
}

const toogleFocus = () => {
    focus_search.value = !focus_search.value
}


</script>

<style>

</style>
