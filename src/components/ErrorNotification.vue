<script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
    },
    emits: ['close'],
  }
</script>

<template>
  <div class="notification">
    <p class="notification__content">
      {{ text }}
    </p>

    <button 
      type="button" 
      class="notification__close"
      @click.prevent="$emit('close')"
    >
      X
    </button>
  </div>
</template>

<style>
.notification {
  position: relative;
  padding: 10px;
  margin-bottom: 0 auto 10px;
  color: #d8000c;
  background-color: #ffd2d2;
  border: 1px solid #d8000c;
  border-radius: 4px;
  animation: shake 0.5s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}

.notification__content {
  margin: 0;
}

.notification__close {
  position: absolute;
  right: 5px;
  top: 5px;

  color: #d8000c;
  background-color: transparent;
  border: none;
}
</style>
