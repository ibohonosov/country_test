<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRandomCountryHoliday } from '@/api/api.ts'

const randomCountries = ref([])

const fetchRandomCountries = async () => {
  try {
    randomCountries.value = await getRandomCountryHoliday()
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  await fetchRandomCountries()
})
</script>

<template>
  <h1>Random Countries Widget</h1>
  <div
    class="random_countries"
    v-for="countries in randomCountries"
    :key="countries"
  >
    <h3>{{ countries.name }}</h3>
    <p>{{ countries.holidayName }}</p>
    <p>{{ countries.dateHoliday }}</p>
  </div>
</template>

<style scoped>
.random_countries {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 90%;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  color: black;
  transition: all 0.3s ease-in-out;
}
</style>
