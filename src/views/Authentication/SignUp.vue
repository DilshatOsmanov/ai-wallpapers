<script setup>
import { reactive, watch } from 'vue'

import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import Swal from 'sweetalert2'

import { addUser } from '@/api/user'

const router = useRouter()

const baseUrl = import.meta.env.VITE_API_PATH
const state = reactive({
  name: null,
  email: null,
  password: null,
  isAgreeWithTerms: false,
  error: false,
  loading: false
})

const rules = {
  name: {
    required: helpers.withMessage('Данное поле обязательно!', required)
  },
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

watch(
  () => [state.email, state.password],
  () => {
    state.error = false
  }
)

const SignUp = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    state.loading = true
    state.error = false

    await addUser(state)

    Swal.fire({
      title: 'Аккаунт успешно создан!',
      text: 'Мы отправили письмо на вашу почту для активации аккаунта',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Продолжить'
    }).then((result) => {
      router.push({ name: 'login-page' })
    })
  } catch {
    state.error = true
    v$.value.$touch()
  } finally {
    state.loading = false
  }
}
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
                      <router-link :to="{ name: 'login-page' }">
                        <img class="login__logo" src="/logo.svg" alt="Logo" />
                      </router-link>
                    </div>
                    <h2 class="h4 text-center">Регистрация</h2>
                    <h3 class="fs-6 fw-normal text-secondary text-center m-0">
                      Введите свои данные для регистрации
                    </h3>
                  </div>
                </div>
              </div>
              <form>
                <div class="row gy-3 overflow-hidden">
                  <div class="col-12 mb-3">
                    <div class="form-floating">
                      <input
                        id="name"
                        class="form-control"
                        :class="{ 'is-invalid': v$.name.$errors.length }"
                        name="name"
                        type="text"
                        placeholder=""
                        required
                        :disabled="state.loading"
                        v-model="state.name"
                      />
                      <label for="name" class="form-label">Имя</label>
                    </div>
                    <div
                      class="invalid-feedback text-start d-block"
                      v-for="error of v$.name.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
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
                        id="iAgree"
                        class="form-check-input"
                        type="checkbox"
                        name="iAgree"
                        :disabled="state.loading"
                        v-model="state.isAgreeWithTerms"
                      />
                      <label class="form-check-label text-secondary" for="iAgree">
                        Я согласен с
                        <a href="#!" class="link-primary text-decoration-none"
                          >условиями конфиденциальности</a
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button
                        class="btn btn-lg btn-primary"
                        type="button"
                        :disabled="!state.isAgreeWithTerms || state.loading"
                        @click="SignUp"
                      >
                        {{ state.loading ? 'Загрузка...' : 'Зарегистрироваться' }}
                      </button>
                    </div>
                  </div>

                  <div v-if="state.error" class="col-12 mt-3">
                    <div class="invalid-feedback text-start d-block">Ошибка сервера!</div>
                  </div>
                </div>
              </form>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-5 mb-4 border-secondary-subtle" />
                  <p class="m-0 text-secondary text-center">
                    У вас уже есть аккаунт?
                    <router-link
                      :to="{ name: 'login-page' }"
                      class="link-primary text-decoration-none"
                      >Войти</router-link
                    >
                  </p>
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
