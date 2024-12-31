<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { customNumeric } from '@/core/utils/validators'
import Swal from 'sweetalert2'

import { createRoom } from '@/api/room'
import ImagesUpload from '@/components/ImagesUpload.vue'

const router = useRouter()

// State for room dimensions
const state = reactive({
  width: null,
  length: null,
  height: null,
  wall_files_1: [],
  wall_files_2: [],
  wall_files_3: [],
  wall_files_4: [],
  loading: false
})

// Vuelidate validation rules
const rules = {
  width: {
    required: helpers.withMessage('Данное поле обязательно!', required),
    numeric: helpers.withMessage('Поле должно быть числовым!', customNumeric)
  },
  length: {
    required: helpers.withMessage('Данное поле обязательно!', required),
    numeric: helpers.withMessage('Поле должно быть числовым!', customNumeric)
  },
  height: {
    required: helpers.withMessage('Данное поле обязательно!', required),
    numeric: helpers.withMessage('Поле должно быть числовым!', customNumeric)
  },
  wall_files_1: {
    required: helpers.withMessage('Необходимо загрузить хотя бы одно изображение!', required),
    validFileFormat: helpers.withMessage('Формат файла должен быть PNG или JPG!', (files) => {
      return files.every((file) => ['image/png', 'image/jpeg'].includes(file.type))
    }),
    validFileSize: helpers.withMessage('Размер файла не должен превышать 5МБ!', (files) => {
      return files.every((file) => file.size <= 5 * 1024 * 1024) // 5MB
    })
  },
  wall_files_2: {
    required: helpers.withMessage('Необходимо загрузить хотя бы одно изображение!', required),
    validFileFormat: helpers.withMessage('Формат файла должен быть PNG или JPG!', (files) => {
      return files.every((file) => ['image/png', 'image/jpeg'].includes(file.type))
    }),
    validFileSize: helpers.withMessage('Размер файла не должен превышать 5МБ!', (files) => {
      return files.every((file) => file.size <= 5 * 1024 * 1024) // 5MB
    })
  },
  wall_files_3: {
    required: helpers.withMessage('Необходимо загрузить хотя бы одно изображение!', required),
    validFileFormat: helpers.withMessage('Формат файла должен быть PNG или JPG!', (files) => {
      return files.every((file) => ['image/png', 'image/jpeg'].includes(file.type))
    }),
    validFileSize: helpers.withMessage('Размер файла не должен превышать 5МБ!', (files) => {
      return files.every((file) => file.size <= 5 * 1024 * 1024) // 5MB
    })
  },
  wall_files_4: {
    required: helpers.withMessage('Необходимо загрузить хотя бы одно изображение!', required),
    validFileFormat: helpers.withMessage('Формат файла должен быть PNG или JPG!', (files) => {
      return files.every((file) => ['image/png', 'image/jpeg'].includes(file.type))
    }),
    validFileSize: helpers.withMessage('Размер файла не должен превышать 5МБ!', (files) => {
      return files.every((file) => file.size <= 5 * 1024 * 1024) // 5MB
    })
  }
}

const v$ = useVuelidate(rules, state)

// Generate wallpapers, validate the form and files
const generateWallpapers = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    // Создаем объект FormData
    state.loading = true

    const formData = new FormData()
    formData.append('width', state.width.toString().replace(',', '.'))
    formData.append('height', state.height.toString().replace(',', '.'))
    formData.append('length', state.length.toString().replace(',', '.'))
    state.wall_files_1.forEach((file, index) => {
      formData.append(`image_files`, file)
    })

    await createRoom(formData)
    router.push({ name: 'room-page' })
  } catch {
    Swal.fire({
      text: 'Ошибка сервера!',
      icon: 'error',
      showCancelButton: false,
      showConfirmButton: false
    })
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <section
    class="bg-light p-3 p-md-4 p-xl-5 d-flex flex-column justify-content-between"
    style="padding-top: 5rem !important"
  >
    <div class="container">
      <!-- Заголовок -->
      <div class="row mb-4">
        <div class="col-12 text-center">
          <h1 class="image-upload-page__title fw-bold">
            Выберите картинки для генерации обоев для вашей комнаты с помощью ИИ
          </h1>
          <p class="image-upload-page__subtitle lead text-muted">
            Загрузите изображения, и наш искусственный интеллект поможет вам создать уникальные обои
            для вашего пространства.
          </p>
        </div>
      </div>

      <!-- Зона загрузки изображений -->
      <div class="row mb-4">
        <label for="wall-1" class="form-label text-start w-100">Стена №1</label>
        <ImagesUpload id="wall-1" :loading="state.loading" v-model:files="state.wall_files_1" />

        <div
          class="d-block invalid-feedback text-start"
          v-for="error of v$.wall_files_1.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>

      <div class="row mb-4">
        <label for="wall-2" class="form-label text-start w-100">Стена №2</label>
        <ImagesUpload id="wall-2" :loading="state.loading" v-model:files="state.wall_files_2" />

        <div
          class="d-block invalid-feedback text-start"
          v-for="error of v$.wall_files_2.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>

      <div class="row mb-4">
        <label for="wall-3" class="form-label text-start w-100">Стена №3</label>
        <ImagesUpload id="wall-3" :loading="state.loading" v-model:files="state.wall_files_3" />

        <div
          class="d-block invalid-feedback text-start"
          v-for="error of v$.wall_files_3.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>

      <div class="row mb-4">
        <label for="wall-4" class="form-label text-start w-100">Стена №4</label>
        <ImagesUpload id="wall-4" :loading="state.loading" v-model:files="state.wall_files_4" />

        <div
          class="d-block invalid-feedback text-start"
          v-for="error of v$.wall_files_4.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>

      <!-- Кнопка отправки -->
      <div class="text-center">
        <div class="mb-3">
          <label for="input-room-length" class="form-label text-start w-100">Длина комнаты</label>
          <div class="input-group">
            <input
              id="input-room-length"
              type="text"
              aria-label="Room length"
              aria-describedby="length-addon"
              inputmode="decimal"
              class="form-control"
              :class="{ 'is-invalid': v$.length.$errors.length }"
              :disabled="state.loading"
              v-model="state.length"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="length-addon">м</span>
            </div>
          </div>
          <div
            class="invalid-feedback text-start"
            v-for="error of v$.length.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </div>
        </div>

        <div class="mb-3">
          <label for="input-room-width" class="form-label text-start w-100">Ширина комнаты</label>
          <div class="input-group">
            <input
              id="input-room-width"
              type="text"
              aria-label="Room width"
              aria-describedby="width-addon"
              inputmode="decimal"
              class="form-control"
              :class="{ 'is-invalid': v$.width.$errors.length }"
              :disabled="state.loading"
              v-model="state.width"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="width-addo2">м</span>
            </div>
          </div>
          <div
            class="invalid-feedback text-start"
            v-for="error of v$.width.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </div>
        </div>

        <div class="mb-3">
          <label for="input-room-height" class="form-label text-start w-100">Высота комнаты</label>
          <div class="input-group">
            <input
              id="input-room-height"
              type="text"
              aria-label="Room height"
              aria-describedby="height-addon"
              inputmode="decimal"
              class="form-control"
              :class="{ 'is-invalid': v$.height.$errors.length }"
              :disabled="state.loading"
              v-model="state.height"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="height-addon">м</span>
            </div>
          </div>
          <div
            class="invalid-feedback text-start"
            v-for="error of v$.height.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </div>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-lg px-5"
          :disabled="state.loading"
          @click="generateWallpapers"
        >
          {{ state.loading ? 'Загрузка...' : 'Генерировать' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.img-thumbnail {
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  object-fit: contain;

  @media screen and (max-width: 768px) {
    padding: 0.25rem;
  }
}

.image-upload-page {
  &__title {
    font-size: 2.5rem;

    @media screen and (max-width: 992px) {
      font-size: 2rem;
    }

    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__subtitle {
    font-size: 1.25rem;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  &__img-upload-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    @media screen and (max-width: 1200px) {
    }
    @media screen and (max-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;

      .btn-close {
        width: 10px;
        height: 10px;
        padding: 2px;
        margin: 2px;
      }
    }
  }

  &__add-img-btn {
    min-height: 205px;

    @media screen and (max-width: 1200px) {
      min-height: 145px;
    }
    @media screen and (max-width: 992px) {
      min-height: 130px;
    }
    @media screen and (max-width: 576px) {
      min-height: 100px;
    }
  }
}

.input-group-text {
  border-radius: 0 var(--bs-border-radius) var(--bs-border-radius) 0;
}
</style>
