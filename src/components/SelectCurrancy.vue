<script>
  export default {
    props: {
      currencies: {
        type: Array,
        required: true
      },
      initialCurrancy: {
        type: String,
        required: true
      }
    },
    emits: ['select'],
  }
</script>

<template>
  <select 
    :value="initialCurrancy" 
    @change="$event => $emit('select', $event.target.value)"
    class="form__select"
  >
    <option 
      v-for="currancy in currencies" 
      :key="currancy" 
      :value="currancy"
    >
      {{ currancy }}
    </option>
  </select>
</template>

<style>
.form__select {
  display: inline-block;
  padding: 5px;
  margin: 0 0 10px 5px;

  font-size: 12px;

  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  background-color: #fff;
}

.form__select:hover {
  border-color: #669933;
}

.form__select:focus {
  box-shadow: 0 0 0 0.2rem rgba(25, 173, 69, 0.25);
  outline: none;
}

@media (min-width: 640px) {
  .form__select {
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  .form__select {
    font-size: 16px;
  }
}
</style>
