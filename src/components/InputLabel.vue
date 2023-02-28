<script>
  export default {
    props: {
      forId: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>

<template>
  <label 
    :for="forId" 
    class="content"
  >
    {{ text }}
  </label>
</template>

<style>
  .content {
    font-size: 18px;
  }
</style>
