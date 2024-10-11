<script setup>
import { reactive } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import Swal from 'sweetalert2'

import { checkEmail, resetPassword } from '@/api/user'

const route = useRoute()
const router = useRouter()

const state = reactive({
  email: null,
  password: null,
  loading: false
})

const rules = {
  email: {
    required: helpers.withMessage('Данное поле обязательно!', required),
    email: helpers.withMessage('Неверный формат почты!', email)
  },
  password: {
    required: helpers.withMessage('Данное поле обязательно!', required),
    passwordValidator: helpers.withMessage(
      'Пароль должен содержать от 12 до 24 символов, включая хотя бы одну заглавную букву, одну строчную букву и одну цифру.',
      helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{12,24}$/)
    )
  }
}

const v$ = useVuelidate(rules, state)

const fetchCheckEmail = async () => {
  const isFormCorrect = await v$.value.email.$validate()
  if (!isFormCorrect) return

  try {
    state.loading = true

    await checkEmail({ email: state.email })

    Swal.fire({
      title: 'Запрос успешно создан!',
      text: 'Мы отправили письмо на вашу почту для восстановления аккаунта',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Продолжить'
    }).then((result) => {
      router.push({ name: 'login-page' })
    })
  } catch (error) {
    Swal.fire({
      text: error.response.status == 404 ? 'Пользователь не найден!' : 'Ошибка сервера!',
      icon: 'error',
      showCancelButton: false,
      showConfirmButton: false
    })
    v$.value.$touch()
  } finally {
    state.loading = false
  }
}

const fetchResetPassword = async () => {
  const isFormCorrect = await v$.value.password.$validate()
  if (!isFormCorrect) return

  try {
    state.loading = true

    await resetPassword({
      token: route.query.token,
      email: route.query.email,
      password: state.password
    })

    Swal.fire({
      text: 'Пароль успешно восстановлен!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Продолжить'
    }).then((result) => {
      router.push({ name: 'login-page' })
    })
  } catch {
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
                    <h2 class="h4 text-center">Сброс пароля</h2>
                    <h3 class="fs-6 fw-normal text-secondary text-center m-0">
                      Укажите адрес электронной почты, связанный с вашей учетной записью, чтобы
                      восстановить пароль.
                    </h3>
                  </div>
                </div>
              </div>
              <form>
                <div class="row gy-3 overflow-hidden">
                  <div class="col-12 mb-3" v-if="!route.query.token">
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
                  <div v-else class="col-12 mb-3">
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
                    <div class="d-grid">
                      <button
                        v-if="!route.query.token"
                        class="btn btn-lg btn-primary"
                        type="button"
                        :disabled="state.loading"
                        @click="fetchCheckEmail"
                      >
                        {{ state.loading ? 'Загрузка...' : 'Сбросить пароль' }}
                      </button>

                      <button
                        v-else
                        class="btn btn-lg btn-primary"
                        type="button"
                        :disabled="state.loading"
                        @click="fetchResetPassword"
                      >
                        {{ state.loading ? 'Загрузка...' : 'Восстановить пароль' }}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-5 mb-4 border-secondary-subtle" />
                  <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                    <router-link
                      :to="{ name: 'login-page' }"
                      class="link-secondary text-decoration-none"
                      >Войти</router-link
                    >
                    <router-link
                      :to="{ name: 'register-page' }"
                      class="link-secondary text-decoration-none"
                      >Зарегистрироваться</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="mt-5 mb-3">Или продолжить</p>
                  <div class="d-flex gap-3 flex-column">
                    <a :href="baseUrl + '/oauth/google-login'" class="btn bsb-btn-xl btn-danger">
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
