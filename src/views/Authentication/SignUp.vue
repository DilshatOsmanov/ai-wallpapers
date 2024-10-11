<script setup>
import { reactive, watch } from 'vue'

import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import Swal from 'sweetalert2'

import { addUser } from '@/api/user'

const router = useRouter()

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
                  <div class="d-flex gap-2 gap-sm-3 align-items-center justify-content-center">
                    <a href="#" class="btn btn-lg btn-outline-danger p-2 p-md-3 lh-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-google"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                        />
                      </svg>
                    </a>
                    <a href="#" class="btn btn-lg btn-outline-primary p-2 p-md-3 lh-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-facebook"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                        />
                      </svg>
                    </a>
                    <a href="#" class="btn btn-lg btn-outline-info p-2 p-md-3 lh-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-twitter"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                        />
                      </svg>
                    </a>
                    <a href="#" class="btn btn-lg btn-outline-dark p-2 p-md-3 lh-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-apple"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"
                        />
                        <path
                          d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"
                        />
                      </svg>
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
