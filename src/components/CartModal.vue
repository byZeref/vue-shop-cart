<template>
  <input type="checkbox" id="cart-modal" class="modal-toggle" />
  <div class="modal max-md:modal-bottom">
    <div v-if="!cartStore.empty" class="modal-box bg-white w-full md:max-w-3xl">
      <div
        class="flex items-center justify-between border-b border-slate-300 pb-4 px-1 md:px-2"
      >
        <h3 class="font-semibold text-slate-600 md:text-lg uppercase">
          Carrito de Compras
        </h3>
        <button @click="clearCart" class="btn btn-outline btn-error btn-sm text-xs">
          Vaciar Carrito
        </button>
      </div>
      <!-- ERROR ALERT -->
      <div
        v-if="cartStore.cart.some((el) => el.buyValidated === false)"
        class="alert max-sm:gap-0 justify-start alert-error shadow-lg mt-3"
      >
        <XCircleIcon class="w-6 h-6" />
        <div class="flex flex-col gap-1 md:gap-0 items-start">
          <span>
            Error! No tenemos disponibilidad para algunos de sus productos.
          </span>
          <span class="text-xs">Disminuya la cantidad si es posbile.</span>
        </div>
      </div>

      <div class="w-full">
        <div
          v-for="item in cartStore.cart"
          :key="item.id"
          class="flex items-center border-b border-slate-300"
        >
          <!-- PRODUCTS -->
          <div class="basis-1/3 md:basis-1/4 px-1 md:px-2 py-4">
            <p
              :class="[
                !item.buyValidated ? 'text-error' : 'text-slate-700',
                'text-base md:text-lg font-bold',
              ]"
            >
              {{ item.product }}
            </p>
            <p
              :class="[
                !item.buyValidated ? 'text-error' : 'text-slate-500',
                'max-md:text-sm',
              ]"
            >
              Cantidad: {{ item.cant }}
            </p>
          </div>
          <!-- ACTION BUTTONS -->
          <div
            class="basis-1/2 md:basis-2/4 flex justify-center md px-0 md:px-2 py-4 items-center"
          >
            <button
              @click="addToCart(item)"
              :class="['btn btn-success btn-sm btn-square']"
            >
              <PlusIcon class="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              @click="removeFromCart(item)"
              class="btn btn-error btn-sm btn-square mx-1"
            >
              <MinusIcon class="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <!-- MOUNTS -->
          <div class="basis-1/6 md:basis-1/4 px-1 md:px-2 py-4 text-end">
            <p class="font-semibold">${{ item.monto.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <!-- SUBTOTAL -->
      <div
        class="flex justify-end items-center px-1 md:px-2 pt-2 font-semibold"
      >
        <div class="flex items-center">
          <p>Subtotal ({{ cartStore.counter }} productos):</p>
          <p class="text-lg ml-1">${{ cartStore.mount.toFixed(2) }}</p>
        </div>
      </div>
      <!-- ACTION MODAL BUTTONS -->
      <div class="modal-action">
        <button :class="[loadingBuy ? 'loading' : '', 'btn btn-accent']">
          <a
            :href="`https://wa.me/${PHONE_NUMBER}?text=${message}`"
            target="_blank"
            class="flex items-center gap-1"
          >
            <WhatsApp />
            REALIZAR EL PEDIDO
          </a>
        </button>
        <label for="cart-modal" class="btn">CERRAR</label>
      </div>
    </div>
    <!-- CARRITO VACIO -->
    <div v-else class="modal-box bg-white w-full md:max-w-3xl">
      <div :class="`text-${modalInfoCss}`">
        <p class="flex items-center font-semibold text-sm md:text-lg">
          <InformationCircleIcon
            v-if="buyMsgeCode !== 1 && buyMsgeCode !== 2"
            class="w-7 h-7 mr-1"
          />
          <CheckCircleIcon v-if="buyMsgeCode === 1" class="w-7 h-7 mr-1" />
          <span>{{ cartStore.cleaningMsge }}</span>
        </p>
      </div>
      <div class="modal-action">
        <label for="cart-modal" :class="`btn btn-${modalInfoCss}`">CERRAR</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import WhatsApp from "@/components/WhatsApp.vue";
import { ref, computed } from "vue";
import {
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { useProductStore } from "../stores/product";
import { useCartStore } from "../stores/cart";

const PHONE_NUMBER = import.meta.env.VITE_COMPANY_PHONE_NUMBER
const productStore = useProductStore();
const cartStore = useCartStore();
const loadingBuy = ref(false);
const modalInfoCss = ref("");
const errorAlert = ref([]);
const buyMsgeCode = computed(() => {
  if (cartStore.cleaningCode === 1) {
    modalInfoCss.value = "accent";
  }
  if (cartStore.cleaningCode === 2) {
    modalInfoCss.value = "error";
  }
  if (cartStore.cleaningCode !== 1 && cartStore.cleaningCode !== 2) {
    modalInfoCss.value = "slate-600";
  }
  return cartStore.cleaningCode;
});

const message = computed(() => {
  const { cart } = cartStore;
  let text = "Hola, quisiera realizar una compra de los siguientes productos: ";
  let total = 0;
  cart.forEach((item, index) => {
    const units = item.cant > 1 ? "unidades" : "unidad";
    const subtotal = item.cant * item.price;
    total += subtotal;
    text += `${item.product} - ${item.cant} ${units} ($${subtotal}.00)`;
    if (index + 1 < cart.length) text += " | ";
  });
  text += `. *${"`"}TOTAL $${total}.00${"`"}*`;
  return text;
});

// const buy = () => {
//     errorAlert.value = []
//     const { products } = productStore
//     const { cart } = cartStore
//     loadingBuy.value = true
//     setTimeout(() => {
//         products.forEach(prod => {
//             const item = cart.find(el => el.id === prod.id)
//             if (item) {
//                 if (prod.stock < item.cant) {
//                     item.buyValidated = false
//                 } else {
//                     item.buyValidated = true
//                 }
//             }
//         })
//         if (!cart.some(el => el.buyValidated === false)) {
//             cart.forEach(item => {
//                 const prod = products.find(el => el.id === item.id)
//                 prod.stock -= item.cant
//             });
//             cartStore.clear(1)
//         }
//         loadingBuy.value = false
//     }, 1500);
// }
const buy = () => {
  errorAlert.value = [];
  const { products } = productStore;
  const { cart } = cartStore;
  loadingBuy.value = true;
  setTimeout(() => {
    // window.location = `https://wa.me/5355187626?text=hello`;
    loadingBuy.value = false;
  }, 1000);
};

const outOfStock = (item) => {
  const prod = productStore.products.find((el) => el.id === item.id);
  return item.cant >= prod.stock ? true : false;
};

const addToCart = (item) => {
  const prod = productStore.products.find((el) => el.id === item.id);
  cartStore.add(prod);
};

const removeFromCart = (item) => {
  cartStore.remove(item);
  checkEmptyCart();
};

const removeFullProd = (item) => {
  cartStore.removeFullProduct(item);
  checkEmptyCart();
};

const checkEmptyCart = () => {
  if (cartStore.empty) cartStore.cleaningCode = 0;
};

const clearCart = () => {
  cartStore.clear(0);
};
</script>

<style scoped></style>
