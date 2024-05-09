import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore('cart', () => {
    const counter = ref(0)
    const mount = ref(0)
    const cart = ref([])
    const cleaningCode = ref(0)

    const empty = computed(() => {
        return counter.value === 0
    })
    const cleaningMsge = computed(() => {
        switch (cleaningCode.value) {
            case 1:
                return 'Se realizó la compra con éxito! Gracias por preferirnos.'
            case 2:
                return 'Ocurrió un error! No tenemos disponibilidad para algunos de sus productos.'
            default:
                return 'El carrito esta vacío! Agregue algún producto para verlo aquí.'
        }
    })

    // item es un producto general (productStore)
    function add(item) {
        const prod = cart.value.find(el => el.id === item.id)
        if (prod && item.stock) {
            prod.cant++
            prod.monto = prod.price * prod.cant
            prod.buyValidated = true
            subtotal(prod.price)
        } else {
            cart.value.push({
                id: item.id,
                product: item.name,
                cant: 1,
                price: item.price,
                monto: item.price,
                buyValidated: true
            })
            mount.value += item.price
        }
        counter.value++
    }

    // item es un producto del carrito (cartStore)
    function remove(item) {
        if (item.cant === 1) {
            const i = cart.value.findIndex(el => el.id === item.id)
            cart.value.splice(i, 1)
        } else {
            item.cant--
            item.monto -= item.price
        }
        subtotal(item.price * (-1)) // para q lo reste
        counter.value--
    }

    function removeFullProduct(item) {
        const index = cart.value.findIndex(el => el.id === item.id)
        counter.value -= item.cant
        mount.value -= item.monto

        cart.value.splice(index, 1)

    }

    function subtotal(new_mount) {
        mount.value += new_mount
    }

    function clear(code) {
        cleaningCode.value = code
        cart.value = []
        counter.value = 0
        mount.value = 0
    }

    return { cart, counter, add, remove, mount, subtotal, empty, clear, removeFullProduct, cleaningMsge, cleaningCode }
})