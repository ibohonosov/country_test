<script setup lang="ts">
import { getCountries } from '@/api/api'
import { computed, onMounted, ref } from 'vue'
import CountriesList from '@/components/CountriesList.vue'
import RandomCountriesWidget from '@/components/RandomCountriesWidget.vue'

const countries = ref<Country[]>([])
const searchCountry = ref('')

const fetchCountries = async () => {
  try {
    const { data } = await getCountries()
    countries.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(fetchCountries)

const filteredCountries = computed(() => {
  if (!searchCountry.value) {
    return countries.value
  }
  return countries.value.filter(country =>
    country.name.toLowerCase().includes(searchCountry.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="home">
    <div class="home__countries">
      <input
        class="home__search"
        type="text"
        v-model="searchCountry"
        placeholder="Search for a country"
      />
      <CountriesList :countriesArray="filteredCountries" />
    </div>
    <div class="home__random">
      <RandomCountriesWidget />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.home__search {
  border: none;
  padding: 12px;
}
.home__countries {
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  align-items: center;
  gap: 1rem;
}
.home__random {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
}
</style>
