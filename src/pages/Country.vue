<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getCountryHolidays } from '@/api/api'
import { onMounted, ref } from 'vue'
import CountryInfo from '@/components/CountryInfo.vue'

const route = useRoute()

interface Holiday {
  name: string
  date: string
}

const holidays = ref<Holiday[]>([])
const countryCode = route.params.code as string
const countryName = route.params.name as string
const selectedYear = ref<number>(new Date().getFullYear())

const years: number[] = []
for (let i = 2020; i <= 2030; i++) {
  years.push(i)
}

const updateYear = (year: number) => {
  selectedYear.value = year
  fetchCountryHolidays(year)
}

const fetchCountryHolidays = async (year: number) => {
  try {
    const { data } = await getCountryHolidays(countryCode, year)
    holidays.value = data
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await fetchCountryHolidays(selectedYear.value)
})
</script>

<template>
  <div class="country_container">
    <CountryInfo
      @update-year="updateYear"
      :countryName="countryName"
      :holidays="holidays"
      :years="years"
      :selectedYear="selectedYear"
    />
  </div>
</template>

<style scoped>
.country_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
}
</style>
