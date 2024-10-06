<script setup>
import { ref } from 'vue'

const wallpaperList = ref([
  {
    id: 1,
    title: 'Обои Cristiana Masi I Damaschi 23613',
    description:
      'Cristiana Masi всегда следит за качеством продукции. Данная модель обоев имеет артикул 23613. Виниловые обои часто используют как в квартирах, так и в загородных домах.',
    price: 3000,
    wallpaperImg: '/ai-wallpapers/wallpaper.jpg'
  },
  {
    id: 2,
    title: 'Обои Rasch Nubia',
    description:
      'Коллекция текстильных обоев Rasch Textil Nubia - творение немецких дизайнеров с выверенными линиями и формами гармонично сочетающимися друг с другом, как сообщающиеся сосуды.',
    price: 3500,
    wallpaperImg: '/ai-wallpapers/wallpaper-2.jpg'
  },
  {
    id: 3,
    title: 'Обои Rasch Nubia 085180',
    description:
      'Коллекция текстильных обоев Rasch Textil Nubia - творение немецких дизайнеров с выверенными линиями и формами гармонично сочетающимися друг с другом, как сообщающиеся сосуды.',
    price: 4500,
    wallpaperImg: '/ai-wallpapers/wallpaper-3.jpg'
  }
])
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
          <select class="form-select mb-3" aria-label="Material select">
            <option selected value="wallpaper">Обои</option>
            <option value="1">Плитка</option>
            <option value="2">Краска</option>
            <option value="3">Панели</option>
          </select>

          <div class="room-modal__card-wrapper">
            <div
              class="room-modal__card mb-3"
              style="max-width: 540px"
              v-for="wallpaper in wallpaperList"
              :key="wallpaper.id"
            >
              <div>
                <img
                  :src="wallpaper.wallpaperImg"
                  class="room-modal__card-img img-fluid"
                  alt="wallpaper"
                />
                <h5 class="room-modal__card-title">{{ wallpaper.title }}</h5>
              </div>

              <div class="room-modal__card-inner">
                <p class="room-modal__card-price">
                  {{ wallpaper.price.toLocaleString('ru-RU') }} тг/рулон
                </p>
                <button
                  class="room-modal__card-btn btn btn-sm btn-primary"
                  type="button"
                  data-bs-dismiss="modal"
                  @click="$emit('changeWallpaper', wallpaper?.wallpaperImg)"
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
