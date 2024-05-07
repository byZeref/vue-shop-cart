<script setup>
const PHONE_NUMBER = import.meta.env.VITE_COMPANY_PHONE_NUMBER
const FACEBOOK_URL = import.meta.env.VITE_COMPANY_FACEBOOK_URL
const INSTAGRAM_URL = import.meta.env.VITE_COMPANY_INSTAGRAM_URL
</script>

<template>
  <footer class="footer gap-y-6 max-md:justify-center max-md:text-center items-center py-4 bg-white text-[#24478d]">
    <aside class="items-center grid-flow-col">
      <p class="">Copyright © 2024 - Todos los derechos reservados</p>
    </aside> 
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end max-md:mx-auto">
      <a :href="FACEBOOK_URL" target="_blank">
        <img src="@/assets/icons/facebook.svg" alt="facebook icon">
      </a>
      <a :href="INSTAGRAM_URL" target="_blank">
        <img src="@/assets/icons/instagram.svg" alt="instagram icon">
      </a>
      <a :href="`https://wa.me/${PHONE_NUMBER}`" target="_blank">
        <img class="ml-[2px]" src="@/assets/icons/whatsapp.svg" alt="whatsapp icon">
      </a>
    </nav>
  </footer>
</template>

<style scoped>

</style>
