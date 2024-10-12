<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import { googleAuth } from '@/api/user'

const store = useStore()
const route = useRoute()
const router = useRouter()
const error = ref(false)

onMounted(async () => {
  if (!route.query.code) router.push({ name: 'login-page' })
  try {
    const {data} = await googleAuth({code: route.query.code})
    
    store.dispatch('setToken', {
      access_token: data.access_token,
      refresh_token: data.refresh_token
    })
  } catch {
    error.value = true
  }
})
</script>

<template>
  <section class="bg-light p-3 p-md-4 p-xl-5 min-vh-100">
    <span v-if="!error">Google auth redirect...</span>
    <span v-else style="color: red">Something went wrong</span>
  </section>
</template>
