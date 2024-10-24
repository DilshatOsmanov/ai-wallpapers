<script setup>
import { onMounted, ref, watch } from 'vue'
import { getProduct } from '@/api/product'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const emit = defineEmits(['changeWallpaper'])
const activeMaterial = ref('wallpapers')
const materialList = ref([])
const loading = ref(false)

onMounted(() => {
  fetchMaterial()
})

watch(activeMaterial, () => {
  fetchMaterial()
})

const fetchMaterial = async () => {
  try {
    loading.value = true
    const { data } = await getProduct({
      type: activeMaterial.value
    })

    materialList.value = data
  } catch {
    toast('Ошибка загрузки материалов!', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true
    })
  } finally {
    loading.value = false
  }
}

const changeWallpaper = (url) => {
  if (url == null || activeMaterial.value != 'wallpapers') return

  emit('changeWallpaper', url)
}
</script>

<template>
  <div
    class="modal room-modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Выбрать материал</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select class="form-select mb-3" aria-label="Material select" v-model="activeMaterial">
            <option selected value="wallpapers">Обои</option>
            <option value="tiles">Плитка</option>
          </select>

          <div class="d-flex align-items-center justify-content-center w-100 my-5" v-if="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="room-modal__card-wrapper" v-else>
            <div
              class="room-modal__card mb-3"
              style="max-width: 540px"
              v-for="wallpaper in materialList"
              :key="wallpaper.id"
            >
              <div>
                <img
                  :src="wallpaper.image_url"
                  class="room-modal__card-img img-fluid"
                  alt="wallpaper"
                />
                <h5 class="room-modal__card-title">{{ wallpaper.name }}</h5>
              </div>

              <div class="room-modal__card-inner">
                <p class="room-modal__card-price">
                  {{ wallpaper.price.toLocaleString('ru-RU') }} {{ price_type }}
                </p>
                <button
                  class="room-modal__card-btn btn btn-sm btn-primary"
                  type="button"
                  data-bs-dismiss="modal"
                  @click="changeWallpaper(wallpaper?.image_url)"
                >
                  Выбрать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.room-modal {
  & .modal-content {
    height: 100dvh;
    border-radius: 0;
  }

  & .modal-body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  &.fade:not(.show) .modal-dialog {
    -webkit-transform: translate3d(25%, 0, 0);
    transform: translate3d(25%, 0, 0);
  }

  & .modal-dialog {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    max-width: 570px;
    width: 100%;
  }

  &__card-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__card-img {
    height: 100%;
    max-height: 140px;
    width: 100%;
    object-fit: cover;
  }

  &__card-title {
    font-size: 16px;
    margin: 10px 0;
  }

  &__card-price {
    font-size: 14px;
    margin-bottom: 10px;
  }

  &__card-inner {
    display: flex;
    flex-direction: column;
  }
}
</style>
