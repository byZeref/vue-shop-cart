<template>
  <div class="flex flex-col gap-4 w-full sm:w-72">
    <div class="skeleton h-60 sm:h-48 w-full"></div>
    <div class="skeleton h-6 sm:h-5 w-40"></div>
    <div class="skeleton h-6 sm:h-5 w-full"></div>
    <div class="skeleton h-6 sm:h-5 w-full"></div>
  </div>
</template>

<style scoped>
.skeleton {
  background-color: #e5e6e6 !important;
  background-image: 
    linear-gradient( 105deg, transparent 0%, transparent 40%, 
    var(--fallback-b1,#fff 50%, transparent 60%, transparent 100% ));
}
</style>
