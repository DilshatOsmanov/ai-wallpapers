<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { customNumeric } from '@/core/utils/validators'

const images = ref([])
const fileInput = ref(null)
const store = useStore()
const router = useRouter()

// State for room dimensions
const state = reactive({
  width: null,
  length: null,
  height: null,
  files: [] // New state for files
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
  files: {
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

// Open file picker
const openFilePicker = () => {
  fileInput.value.click()
}

// Handle file selection and validate files
const onFileChange = (event) => {
  const files = event.target.files
  processFiles(files)
}

// Handle file drop and validate files
const handleDrop = (event) => {
  const files = event.dataTransfer.files
  processFiles(files)
}

// Helper function to process and validate files
const processFiles = (files) => {
  // Append new files to the existing state.files array
  for (let file of files) {
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      continue // Skip invalid files
    }

    state.files.push(file) // Append file to state.files

    const reader = new FileReader()
    reader.onload = (e) => {
      images.value.push({ url: e.target.result }) // Append image to images array
    }
    reader.readAsDataURL(file)
  }
}

// Remove image
const removeImage = (index) => {
  images.value.splice(index, 1)
  state.files.splice(index, 1)
}

// Generate wallpapers, validate the form and files
const generateWallpapers = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  router.push('/room')
}

// Logout
const logout = () => {
  store.dispatch('logout')
}
</script>

<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="d-flex align-items-center justify-content-end w-100">
        <div class="dropdown">
          <button
            type="button"
            class="header__avatar"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            JD
          </button>

          <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Профиль</a></li>
            <li><button class="dropdown-item" type="button" @click="logout">Выйти</button></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <section
    class="bg-light p-3 p-md-4 p-xl-5 min-vh-100 d-flex flex-column justify-content-between"
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
        <div
          class="col-12 image-upload-page__img-upload-form"
          @dragover.prevent
          @drop.prevent="handleDrop"
          style="border: 2px dashed rgba(0, 0, 0, 0.7); padding: 1rem"
        >
          <div
            class="cursor-pointer border rounded d-flex align-items-center justify-content-center image-upload-page__add-img-btn"
            @click="openFilePicker"
          >
            <input
              type="file"
              ref="fileInput"
              accept="image/png, image/gif, image/jpeg"
              multiple
              hidden
              @change="onFileChange"
            />
            <span class="fs-1">+</span>
          </div>

          <div v-for="(image, index) in images" :key="index" class="position-relative">
            <img :src="image.url" class="img-thumbnail" />
            <button
              type="button"
              class="btn-close position-absolute top-0 end-0"
              @click="removeImage(index)"
            ></button>
          </div>
        </div>

        <div
          class="d-block invalid-feedback text-start"
          v-for="error of v$.files.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Кнопка отправки -->
    <div class="container text-center">
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

      <button type="button" class="btn btn-primary btn-lg px-5" @click="generateWallpapers">
        Генерировать
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
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

<style lang="scss">
.navbar-fixed-top {
  background-color: #222222;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header__avatar {
  width: 35px;
  height: 35px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
}
</style>
