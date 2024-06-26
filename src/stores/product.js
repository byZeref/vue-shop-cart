import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const filter_products = ref(products.value)
    const empty_search = ref(false)

    const setProducts = (prods) => {
        products.value = [...prods]
        filter_products.value = [...prods]
    }

    const filterProds = ((value) => {
        (value) ? filter_products.value = products.value.filter(item => item.name.toLowerCase().includes(value))
            : (filter_products.value = products.value)

        filter_products.value.length === 0 ? empty_search.value = true : empty_search.value = false
    })

    const sortProds = (value) => {
        if (value === 'nombre') {
            filter_products.value.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
            })
        }
        else if (value === 'precio') {
            filter_products.value.sort((a, b) => {
                if (a.price > b.price) return 1
                if (a.price < b.price) return -1
                return 0
            })
        }
        else if (value === 'disponibilidad') {
            filter_products.value.sort((a, b) => {
                if (a.stock && !b.stock) return -1
                if (!a.stock && b.stock) return 1
                return 0
            })
        }
    }

    return { products, filter_products, filterProds, empty_search, sortProds, setProducts }
})