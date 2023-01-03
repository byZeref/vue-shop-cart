<template>
  <h1 class="text-3xl font-semibold">Home View</h1>

  <Home :msg="getMsg" :array="array" :counter="counter" @increment="increment" @decrement="decrement" />

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Home from "../components/Home.vue";

const msg = ref('Siroo')
const counter = ref(0)
const array = ref([])

const setData = () => {
  array.value.push(
    {
      id: 1,
      name: 'Pedro',
      age: 20
    },
    {
      id: 2,
      name: 'Paco',
      age: 50
    },
    {
      id: 3,
      name: 'Pancho',
      age: 45
    }
  )
}
const getMsg = computed(() => {
  return msg.value
})

const increment = () => {
  counter.value++
  array.value.forEach(item => {
    item.age++
  });
}
const decrement = () => {
  counter.value--
  array.value.forEach(item => {
    item.age--
  });
}

onMounted(() => {
  setData()
})

</script>

<style>

</style>
