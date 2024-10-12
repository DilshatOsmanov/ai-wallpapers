<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { verifyEmail } from '@/api/user'

const route = useRoute()
const router = useRouter()
const state = reactive({
  error: false,
  loading: false
})

onMounted(async () => {
  if (!route.query.token || !route.query.email) router.push({ name: 'login-page' })

  try {
    state.error = false
    state.loading = true

    await verifyEmail({
      token: route.query.token,
      email: route.query.email
    })
  } catch {
    state.error = true
  } finally {
    state.loading = false
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
                      Ошибка активации аккаунта, попробуйте еще раз!
                    </h4>
                    <h4 class="login__title text-center mb-0" v-else-if="!state.loading">
                      Аккаунт успешно активирован!
                    </h4>
                    <div class="d-flex justify-content-center my-5" v-else>
                      <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="!state.loading" class="row gy-3 overflow-hidden">
                <div class="col-12 mt-0">
                  <div class="d-grid">
                    <router-link class="btn btn-lg btn-primary" :to="{ name: 'login-page' }">
                      {{ state.error ? 'Войти' : 'Повторить попытку' }}
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
