<script setup>
import { ref } from 'vue'

const props = defineProps({
  files: Array,
  loading: Boolean
})
const emit = defineEmits(['update:files'])

const images = ref([])
const fileInput = ref(null)

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
  if (props.loading) return

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

    emit('update:files', [...props.files, file]) // Append file to state.files
    // state.files.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      images.value.push({ url: e.target.result }) // Append image to images array
    }
    reader.readAsDataURL(file)
  }
}

// Remove image
const removeImage = (index) => {
  if (props.loading) return

  images.value.splice(index, 1)

  let temp = [...props.files]
  temp.splice(index, 1)
  emit('update:files', temp)
}
</script>

<template>
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
        :disabled="loading"
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
</template>
