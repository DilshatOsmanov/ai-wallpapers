<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (!route.query.token || !route.query.refresh_token) router.push({ name: 'login-page' })

  store.dispatch('setToken', {
    access_token: route.query.token,
    refresh_token: route.query.refresh_token
  })
})
</script>

<template>
  <section class="bg-light p-3 p-md-4 p-xl-5 min-vh-100">Google auth redirect...</section>
</template>
