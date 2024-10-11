<script setup>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'

const store = useStore()

const state = reactive({
  email: null,
  password: null,
  isKeepLogin: false,
  error: false,
  loading: false
})

const rules = {
  email: {
    required: helpers.withMessage('Данное поле обязательно!', required),
    email: helpers.withMessage('Неверный формат почты!', email)
  },
  password: {
    required: helpers.withMessage('Данное поле обязательно!', required)
  },
  isKeepLogin: {}
}

const v$ = useVuelidate(rules, state)

watch(
  () => [state.email, state.password],
  () => {
    state.error = false
  }
)

const login = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    state.loading = true
    state.error = false

    await store.dispatch('login', state)
  } catch {
    state.error = true
    v$.value.$touch()
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <section class="bg-light p-3 p-md-4 p-xl-5 min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
          <div class="card border border-light-subtle rounded-4">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <div class="row">
                <div class="col-12">
                  <div class="mb-5">
                    <div class="text-center mb-4">
                      <router-link :to="{ name: 'login-page' }">
                        <img class="login__logo" src="/logo.svg" alt="Logo" />
                      </router-link>
                    </div>
                    <h4 class="login__title text-center">
                      Добро пожаловать обратно, мы скучали по вам!
                    </h4>
                  </div>
                </div>
              </div>
              <form>
                <div class="row gy-3 overflow-hidden">
                  <div class="col-12 mb-3">
                    <div class="form-floating">
                      <input
                        id="email"
                        class="form-control"
                        :class="{ 'is-invalid': v$.email.$errors.length }"
                        name="email"
                        type="email"
                        placeholder=""
                        required
                        :disabled="state.loading"
                        v-model="state.email"
                      />
                      <label for="email" class="form-label">Email</label>
                    </div>
                    <div
                      class="invalid-feedback text-start d-block"
                      v-for="error of v$.email.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                  <div class="col-12 mb-3">
                    <div class="form-floating">
                      <input
                        id="password"
                        class="form-control"
                        :class="{ 'is-invalid': v$.password.$errors.length }"
                        name="password"
                        type="password"
                        placeholder=""
                        required
                        :disabled="state.loading"
                        v-model="state.password"
                      />
                      <label for="password" class="form-label">Пароль</label>
                    </div>
                    <div
                      class="invalid-feedback text-start d-block"
                      v-for="error of v$.password.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        id="remember_me"
                        class="form-check-input"
                        name="remember_me"
                        type="checkbox"
                        :disabled="state.loading"
                        v-model="state.isKeepLogin"
                      />
                      <label
                        class="form-check-label text-secondary cursor-pointer"
                        for="remember_me"
                      >
                        Не выходить из системы
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button
                        class="btn btn-lg btn-primary"
                        type="button"
                        :disabled="state.loading"
                        @click="login"
                      >
                        {{ state.loading ? 'Загрузка...' : 'Войти' }}
                      </button>
                    </div>
                  </div>

                  <div v-if="state.error" class="col-12 mt-3">
                    <div class="invalid-feedback text-start d-block">
                      Неверно указан логин или пароль!
                    </div>
                  </div>
                </div>
              </form>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-5 mb-4 border-secondary-subtle" />
                  <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                    <router-link
                      :to="{ name: 'register-page' }"
                      class="link-secondary text-decoration-none"
                      >Создать новую учетную запись</router-link
                    >
                    <router-link
                      :to="{ name: 'password-reset-page' }"
                      class="link-secondary text-decoration-none"
                      >Забыли пароль</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="mt-5 mb-3">Или продолжить</p>
                  <div class="d-flex gap-3 flex-column">
                    <a href="#!" class="btn bsb-btn-xl btn-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-google"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                        />
                      </svg>
                      <span class="ms-2 fs-6 text-uppercase">Войти через Google</span>
                    </a>
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
