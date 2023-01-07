import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    const counter = ref(0)
    const mount = ref(0)

    function add() {
        counter.value++
    }
    function remove() {
        counter.value--
    }
    function subtotal(new_mount) {
        mount.value += new_mount
    }

    return { counter, add, remove, mount, subtotal }
})