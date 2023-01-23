import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const filter_products = ref(products.value)
    const empty_search = ref(false)

    const filterProds = ((value) => {
        (value) ? filter_products.value = products.value.filter(item => item.name.toLowerCase().includes(value))
            : (filter_products.value = products.value)

        filter_products.value.length === 0 ? empty_search.value = true : empty_search.value = false
    })

    return { products, filter_products, filterProds, empty_search }
})