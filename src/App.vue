<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

const handleScroll = () => {
  const el = document.querySelector(".backdrop");
  window.scrollY > 5
    ? el.classList.add("shadow")
    : el.classList.remove("shadow");
}

onMounted(() => window.addEventListener("scroll", () => handleScroll()))
</script>

<template>
  <section class="navbar-container">
    <div class="backdrop w-full h-[110px] bg-white fixed inset-0 z-10"></div>
    <NavBar />
  </section>

  <section class="mt-20 mb-10">
    <RouterView />
  </section>

  <section class="mt-auto">
    <Footer />
  </section>
</template>

<style>
/* load vueform css */
@import './../node_modules/@vueform/vueform/dist/vueform.css';

.backdrop {
  transition: box-shadow 0.1s ease;
  &.shadow {
    box-shadow: 0 20px 20px white;
  }
}
</style>
