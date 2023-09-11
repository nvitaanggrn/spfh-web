<template>
  <div v-if="isVisible" class="overlay position-absolute top-0 bottom-0 start-0 end-0 bg-transparent"/>
</template>

<script>
export default {
  props: ['isVisible']
}
</script>

<style>
.overlay{
  /* z-index-fixed */
  z-index: 1030;
}
</style>