<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

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

  <section class="mt-20">
    <RouterView />
  </section>
  <!-- TODO footer -->
</template>

<style scoped>
.backdrop {
  transition: box-shadow 0.1s ease;
  &.shadow {
    box-shadow: 0 20px 20px white;
  }
}
</style>
