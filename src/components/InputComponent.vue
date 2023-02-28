<script>
  export default {
    props: {
      idValue: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    emits: ['change'],
  }
</script>

<template>
  <input 
    type="number" 
    :id="idValue"
    :value="amount"
    @input="$event => $emit('change', $event.target.value)"
    min="0"
    class="form__input"
  >
</template>

<style>
  .form__input {
    padding: 5px;
    margin-bottom: 10px;

    font-size: 12px;

    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s;
  }

  .form__input:hover {
    border-color: #669933;
  }

  .form__input:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }

  @media (min-width: 640px) {
    .form__input {
      font-size: 14px;
    }

    .form__input:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }

  @media (min-width: 1024px) {
    .form__input {
      font-size: 16px;
    }

    .form__input:focus {
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.4);
    }
  }
</style>
