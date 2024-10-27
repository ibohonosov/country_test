import './assets/main.css'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import Country from '@/pages/Country.vue'
import Home from '@/pages/Home.vue'

const app = createApp(App)

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/country/:code/:name',
    name: 'Country',
    component: Country,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
