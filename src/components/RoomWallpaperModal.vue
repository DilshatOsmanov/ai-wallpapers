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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Выбрать обои</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="card room-modal__card mb-3"
            style="max-width: 540px"
            data-bs-dismiss="modal"
            v-for="wallpaper in wallpaperList"
            :key="wallpaper.id"
            @click="$emit('changeWallpaper', wallpaper?.wallpaperImg)"
          >
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="wallpaper.wallpaperImg"
                  class="room-modal__card-img img-fluid rounded-start"
                  alt="wallpaper"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title fw-bold">{{ wallpaper.title }}</h5>
                  <p class="card-text" style="font-size: 14px">
                    {{ wallpaper.description }}
                  </p>
                  <p class="fw-semibold text-body-secondary mt-1">
                    {{ wallpaper.price.toLocaleString('ru-RU') }} тг/рулон
                  </p>
                </div>
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
    height: 100vh;
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

  &__card {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      box-shadow:
        0 8px 17px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.15);
    }
  }

  &__card-img {
    height: 100%;
    max-height: 240px;
    width: 100%;
    object-fit: cover;
  }
}
</style>
