<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  const handleTouchMove = (event) => {
    // Отключаем только при масштабировании
    if (event.scale && event.scale !== 1) {
      event.preventDefault()
    }
  }

  document.addEventListener('touchmove', handleTouchMove, { passive: false })

  // Убираем обработчик при размонтировании
  onUnmounted(() => {
    document.removeEventListener('touchmove', handleTouchMove)
  })
})
</script>

<template>
  <RouterView />
</template>
