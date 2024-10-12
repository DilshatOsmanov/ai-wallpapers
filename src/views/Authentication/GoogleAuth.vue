<script setup>
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import { googleAuth } from '@/api/user'

const store = useStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  error: false
})

onMounted(async () => {
  if (!route.query.code) router.push({ name: 'login-page' })
  try {
    state.error = false
    const { data } = await googleAuth({ code: route.query.code })

    store.dispatch('setToken', {
      access_token: data.access_token,
      refresh_token: data.refresh_token
    })
  } catch {
    state.error = true
  }
})
</script>

<template>
  <section class="bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
          <div class="card border border-light-subtle rounded-4">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <div class="row">
                <div class="col-12">
                  <div class="mb-5">
                    <div class="text-center mb-4">
                      <img class="login__logo" src="/logo.svg" alt="Logo" />
                    </div>
                    <h4 class="login__title text-center mb-0" v-if="state.error">
                      Что-то пошло не так! Попробуйте снова!
                    </h4>
                    <div class="d-flex justify-content-center my-5" v-else>
                      <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="state.error" class="row gy-3 overflow-hidden">
                <div class="col-12 mt-0">
                  <div class="d-grid">
                    <router-link class="btn btn-lg btn-primary" :to="{ name: 'login-page' }">
                      Повторить попытку
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
