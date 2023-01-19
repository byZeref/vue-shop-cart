import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    return { products }
})