<script setup lang="ts">
import { Country } from '@/api/api'

defineProps<{ countriesArray: Country[] }>()
</script>

<template>
  <div class="title">CountriesList</div>
  <div class="content">
    <router-link
      v-for="country in countriesArray"
      :key="country.countryCode"
      class="countries"
      :to="{
        name: 'Country',
        params: { code: country.countryCode, name: country.name },
      }"
    >
      <h3>{{ country.name }}</h3>
    </router-link>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.content a {
  color: black;
}
.content a:hover {
  transition: all 0.3s ease-in-out;
  color: white;
}
.countries {
  display: flex;
  gap: 1rem;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  justify-content: center;
  color: black;
  transition: all 0.3s ease-in-out;
}

.countries:hover {
  transform: scale(1.1);
  background-color: #7676f6;
}
</style>
