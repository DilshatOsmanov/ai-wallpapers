<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  document.addEventListener(
    'touchmove',
    function (event) {
      if (event.scale !== 1) {
        event.preventDefault()
      }
    },
    { passive: false }
  )
})
</script>

<template>
  <RouterView />
</template>
