<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import RoomWallpaperModal from '@/components/RoomWallpaperModal.vue'

const wallpaperUrl = ref('/ai-wallpapers/wallpaper-4.jpg')
const scale = ref(1) // Масштабирование (1 - начальный масштаб)
const minScale = 1 // Минимальное уменьшение
const maxScale = 3 // Максимальное увеличение
let currentRotationX = 50 // начальный угол вращения по оси X
let currentRotationZ = 45 // начальный угол вращения по оси Z
const isFirstWallGroupHide = ref(true)
const translateZ = ref(-12)

onMounted(() => {
  const h = document.querySelector('#h')
  const b = document.body

  let isDragging = false
  let startX, startY

  // Ограничение угла по оси X (вверх и вниз)
  const minRotationX = 30
  const maxRotationX = 90

  // Base rotation function
  const base = (e) => {
    if (!isDragging) return
    if ([...b.classList].includes('modal-open')) return

    const deltaX = (((e.pageX || e.touches[0].pageX) - startX) / window.innerWidth) * 120
    const deltaY = (((e.pageY || e.touches[0].pageY) - startY) / window.innerHeight) * 120

    let newRotationX = currentRotationX - deltaY
    let newRotationZ = currentRotationZ - deltaX
    updateActiveWalls(newRotationZ)

    newRotationX = Math.max(minRotationX, Math.min(maxRotationX, newRotationX))

    h.style.transform = `
      perspective(90vw)
      rotateX(${newRotationX}deg)
      rotateZ(${newRotationZ}deg)
      translateZ(${translateZ.value}vw)
    `
    updateRoomSize()
  }

  const startDrag = (e) => {
    isDragging = true
    startX = e.pageX || e.touches[0].pageX
    startY = e.pageY || e.touches[0].pageY
  }

  const stopDrag = () => {
    isDragging = false
    const transform = h.style.transform.match(/rotateX\((.*?)deg\) rotateZ\((.*?)deg\)/)
    if (transform) {
      currentRotationX = parseFloat(transform[1])
      currentRotationZ = parseFloat(transform[2])
    }
  }

  const updateActiveWalls = (newRotationZ) => {
    // Приводим значение к диапазону от 0 до 360
    let normalizedRotation = newRotationZ % 360

    // Если значение отрицательное, добавляем 360 для приведения к положительным значениям
    if (normalizedRotation < 0) {
      normalizedRotation = -normalizedRotation
    }

    // Логика активации классов
    if (
      (normalizedRotation >= 0 && normalizedRotation < 120) ||
      (normalizedRotation >= 300 && normalizedRotation < 360)
    ) {
      isFirstWallGroupHide.value = true
    } else if (normalizedRotation >= 120 && normalizedRotation < 300) {
      // Активируем вторые две стены
      isFirstWallGroupHide.value = false
    }
  }

  // Scroll zoom (desktop)
  const handleScrollZoom = (e) => {
    e.preventDefault()
    if ([...b.classList].includes('modal-open')) return

    scale.value += (e.deltaY / 2) * -0.01
    scale.value = Math.max(minScale, Math.min(maxScale, scale.value))
    translateZ.value = -12 - (scale.value - 1) * 10 // Чем меньше масштаб, тем больше translateZ

    h.style.transform = `
      perspective(90vw)
      rotateX(${currentRotationX}deg)
      rotateZ(${currentRotationZ}deg)
      translateZ(${translateZ.value}vw)
    `
    updateRoomSize()
  }

  // Pinch to zoom (mobile)
  let initialDistance = null
  const zoomSensitivity = 0.1 // Коэффициент чувствительности (уменьшите для снижения чувствительности)

  const handlePinchZoom = (e) => {
    if (e.touches.length < 2) return
    if ([...b.classList].includes('modal-open')) return

    const touch1 = e.touches[0]
    const touch2 = e.touches[1]
    const distance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY)

    if (!initialDistance) {
      initialDistance = distance
    }

    // Применяем коэффициент чувствительности
    const scaleChange = 1 + ((distance - initialDistance) / initialDistance) * zoomSensitivity
    scale.value = Math.max(minScale, Math.min(maxScale, scale.value * scaleChange))
    translateZ.value = -12 - (scale.value - 1) * 10 // Чем меньше масштаб, тем больше translateZ

    h.style.transform = `
    perspective(90vw)
    rotateX(${currentRotationX}deg)
    rotateZ(${currentRotationZ}deg)
    translateZ(${translateZ.value}vw)
  `
    updateRoomSize()
  }

  const endPinchZoom = () => {
    initialDistance = null
  }

  // Add event listeners
  b.addEventListener('mousedown', startDrag)
  b.addEventListener('mousemove', base)
  b.addEventListener('mouseup', stopDrag)
  b.addEventListener('wheel', handleScrollZoom)

  b.addEventListener('touchstart', startDrag)
  b.addEventListener('touchmove', base)
  b.addEventListener('touchmove', handlePinchZoom)
  b.addEventListener('touchend', stopDrag)
  b.addEventListener('touchend', endPinchZoom)

  onBeforeUnmount(() => {
    b.removeEventListener('mousedown', startDrag)
    b.removeEventListener('mousemove', base)
    b.removeEventListener('mouseup', stopDrag)
    b.removeEventListener('wheel', handleScrollZoom)

    b.removeEventListener('touchstart', startDrag)
    b.removeEventListener('touchmove', base)
    b.removeEventListener('touchmove', handlePinchZoom)
    b.removeEventListener('touchend', stopDrag)
    b.removeEventListener('touchend', endPinchZoom)
  })

  // initialize
  updateRoomSize()
})

// Functions to handle zoom from buttons
const zoomIn = () => {
  scale.value = Math.min(maxScale, scale.value + 0.05)
  translateZ.value = -12 - (scale.value - 1) * 10 // Чем больше масштаб, тем меньше translateZ

  document.querySelector('#h').style.transform = `
    perspective(90vw)
    rotateX(${currentRotationX}deg)
    rotateZ(${currentRotationZ}deg)
    translateZ(${translateZ.value}vw)
  `
  updateRoomSize()
}

const zoomOut = () => {
  scale.value = Math.max(minScale, scale.value - 0.05)
  translateZ.value = -12 - (scale.value - 1) * 10 // Чем меньше масштаб, тем больше translateZ

  document.querySelector('#h').style.transform = `
    perspective(90vw)
    rotateX(${currentRotationX}deg)
    rotateZ(${currentRotationZ}deg)
    translateZ(${translateZ.value}vw)
  `
  updateRoomSize()
}

// Размеры комнаты в метрах
const roomLengthMeters = 4 // Длина (в метрах)
const roomWidthMeters = 3 // Ширина (в метрах)
const roomHeightMeters = 2.5 // Высота (в метрах)
const baseLength = 27 // Основанное значение для длины (например, 27vw)

const doorWidthMeters = 0.9 // Ширина (в метрах)
const doorHeightMeters = 1.8 // Высота (в метрах)

const windowLengthMeters = 0.7 // Длина (в метрах)
const windowWidthMeters = 1.3 // Ширина (в метрах)
const windowHeightMeters = 1.2 // Высота (в метрах)

const wallDepth = 1 // Толщина стены (в vw)
const lineDepth = 0.1 // Толщина стены (в vw)

const updateRoomSize = () => {
  const root = document.documentElement
  if (roomLengthMeters < roomWidthMeters) {
    root.style.setProperty('--room-length', `${baseLength * scale.value}vw`)
    root.style.setProperty(
      '--room-width',
      `${(baseLength * roomWidthMeters * scale.value) / roomLengthMeters}vw`
    )
    root.style.setProperty(
      '--room-height',
      `${(baseLength * roomHeightMeters * scale.value) / roomLengthMeters}vw`
    )

    root.style.setProperty(
      '--door-width',
      `${(baseLength * doorWidthMeters * scale.value) / roomLengthMeters}vw`
    )
    root.style.setProperty(
      '--door-height',
      `${(baseLength * doorHeightMeters * scale.value) / roomLengthMeters}vw`
    )

    root.style.setProperty(
      '--window-length',
      `${(baseLength * windowLengthMeters * scale.value) / roomLengthMeters}vw`
    )
    root.style.setProperty(
      '--window-width',
      `${(baseLength * windowWidthMeters * scale.value) / roomLengthMeters}vw`
    )
    root.style.setProperty(
      '--window-height',
      `${(baseLength * windowHeightMeters * scale.value) / roomLengthMeters}vw`
    )
  } else {
    root.style.setProperty('--room-width', `${baseLength * scale.value}vw`)
    root.style.setProperty(
      '--room-length',
      `${(baseLength * roomLengthMeters * scale.value) / roomWidthMeters}vw`
    )
    root.style.setProperty(
      '--room-height',
      `${(baseLength * roomHeightMeters * scale.value) / roomWidthMeters}vw`
    )

    root.style.setProperty(
      '--door-width',
      `${(baseLength * doorWidthMeters * scale.value) / roomWidthMeters}vw`
    )
    root.style.setProperty(
      '--door-height',
      `${(baseLength * doorHeightMeters * scale.value) / roomWidthMeters}vw`
    )

    root.style.setProperty(
      '--window-length',
      `${(baseLength * windowLengthMeters * scale.value) / roomWidthMeters}vw`
    )
    root.style.setProperty(
      '--window-width',
      `${(baseLength * windowWidthMeters * scale.value) / roomWidthMeters}vw`
    )
    root.style.setProperty(
      '--window-height',
      `${(baseLength * windowHeightMeters * scale.value) / roomWidthMeters}vw`
    )
  }

  root.style.setProperty('--wall-depth', `${wallDepth * scale.value}vw`)
  root.style.setProperty('--half-wall-depth', `${(wallDepth * scale.value) / 2}vw`)
  root.style.setProperty('--line-depth', `${lineDepth * scale.value}vw`)
}

// Change room wallpaper
const changeWallpaper = (url) => {
  if (url == null || url == undefined) return
  wallpaperUrl.value = url
}
</script>

<template>
  <button type="button" class="order-btn btn btn-success btn-lg">Оформить заказ</button>

  <section
    class="bg-light d-flex flex-column justify-content-between position-relative overflow-hidden"
  >
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <router-link
          :to="{ name: 'images-upload-page' }"
          class="btn btn-secondary navbar-btn pull-left"
          >Назад</router-link
        >

        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          class="btn btn-primary navbar-btn pull-right"
        >
          Выбрать материал
        </button>
      </div>
    </nav>

    <div class="room__wrapper">
      <div class="room__zoom-buttons">
        <div class="container">
          <div class="d-flex align-items-end justufy-content-center flex-column">
            <button type="button" class="btn btn-dark mb-1" @click="zoomIn">
              <svg
                fill="#fff"
                height="15px"
                width="15px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <polygon
                      points="289.391,222.609 289.391,0 222.609,0 222.609,222.609 0,222.609 0,289.391 222.609,289.391 222.609,512     289.391,512 289.391,289.391 512,289.391 512,222.609   "
                    />
                  </g>
                </g>
              </svg>
            </button>
            <button type="button" class="btn btn-secondary" @click="zoomOut">
              <svg
                fill="#fff"
                height="16px"
                width="15px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <rect y="222.609" width="512" height="66.783" />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="h" class="house">
        <div class="floor">
          <div class="floor__front face"></div>
          <div class="floor__back face"></div>
          <div class="floor__right face"></div>
          <div class="floor__left face"></div>
          <div class="floor__top face"></div>
          <div class="floor__bottom face"></div>
        </div>

        <div class="wall-left" :class="{ active: !isFirstWallGroupHide }">
          <div class="wall-left__front face"></div>
          <div class="wall-left__right face">
            <span :style="`background-image: url('${wallpaperUrl}')`"></span>
            <div class="room-window" :class="{ active: !isFirstWallGroupHide }"></div>
          </div>
          <div class="wall-left__left face bordered"></div>
          <div class="wall-left__top face"></div>
          <div class="wall-left__bottom face"></div>
        </div>

        <div class="wall-right" :class="{ active: isFirstWallGroupHide }">
          <div class="wall-right__back face"></div>
          <div class="wall-right__right face bordered"></div>
          <div class="wall-right__left face">
            <span :style="`background-image: url('${wallpaperUrl}')`"></span>
          </div>
          <div class="wall-right__top face"></div>
          <div class="wall-right__bottom face"></div>
        </div>

        <div class="wall-top" :class="{ active: !isFirstWallGroupHide }">
          <div class="wall-top__front face">
            <span :style="`background-image: url('${wallpaperUrl}')`"></span>
            <div class="room-door" :class="{ active: !isFirstWallGroupHide }"></div>
          </div>
          <div class="wall-top__back face bordered"></div>
          <div class="wall-top__top face"></div>
          <div class="wall-top__bottom face"></div>
          <div class="wall-top__right face"></div>
        </div>

        <div class="wall-bottom" :class="{ active: isFirstWallGroupHide }">
          <div class="wall-bottom__front face bordered"></div>
          <div class="wall-bottom__back face">
            <span :style="`background-image: url('${wallpaperUrl}')`"></span>
          </div>
          <div class="wall-bottom__top face"></div>
          <div class="wall-bottom__bottom face"></div>
          <div class="wall-bottom__left face"></div>
        </div>
      </div>
    </div>
  </section>

  <RoomWallpaperModal @changeWallpaper="changeWallpaper" />
</template>

<style lang="scss">
.navbar-fixed-top {
  background-color: #222222;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.order-btn {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
