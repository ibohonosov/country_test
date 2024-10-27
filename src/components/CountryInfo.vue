<script setup lang="ts">
interface Holiday {
  name: string
  date: string
  localName: string
}

const props = defineProps<{
  countryName: string
  holidays: Holiday[]
  years: number[]
  selectedYear: number
}>()

const emit = defineEmits<{
  (e: 'updateYear', year: number): void
}>()
</script>

<template>
  <h1>Holidays in {{ countryName }}</h1>
  <div class="country-info">
    <div class="holidays_container">
      <div
        class="holidays_info"
        v-for="holiday in holidays"
        :key="holiday.date"
      >
        <h3>{{ holiday.name }}</h3>
        <p>{{ holiday.localName }}</p>
        <h3>{{ holiday.date }}</h3>
      </div>
    </div>

    <div class="buttons">
      <button
        v-for="year in years"
        :key="year"
        @click="() => emit('updateYear', year)"
        class="btn"
        :class="{ active: selectedYear === year }"
      >
        {{ year }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.country-info {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
}
.holidays_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.holidays_info {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 20px;
}
.btn {
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.btn:hover {
  transform: scale(1.1);
  background-color: #7676f6;
  color: white;
}

.active {
  font-weight: bold;
  color: #7676f6;
}
</style>
