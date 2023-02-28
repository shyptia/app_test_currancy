<script>
  import ErrorNotification from './ErrorNotification.vue';
import InputLabel from './InputLabel.vue';

  export default {
    components: {
    ErrorNotification,
    InputLabel,
},
    data() {
      return {
        currencyName: '',
        errorMessage: '',
      }
    },
    methods: {
      submitForm() {
        if (this.currencyName.length !== 3 || this.currencyName !== this.currencyName.toUpperCase()) {
          this.errorMessage = 'Please enter valid currancy';

          return;
        }

        this.$emit('add-currency', {
          name: this.currencyName,
        });
        
        this.currencyName = '';
      },
      closeForm() {
        this.$emit('close');
      },
    } 
  }
</script>

<template>
  <section class="popup__section">
    <form class="popup__form">
      <InputLabel 
        :forId="'currancy_name'"
        :text="'Please enter currancy you want to add:'"
      />

      <input 
        id="currancy_name"
        type="text" 
        v-model="currencyName"
        class="popup__input"
      >

      <button 
        type="submit" 
        @click.prevent="submitForm"
        class="popup_add-currency"
      >
        Add Currency
      </button>
    </form>

    <button 
      type="button" 
      @click="closeForm"
      class="popup__button"
    >
      X
    </button>

    <ErrorNotification
      v-if="this.errorMessage"
      :text="this.errorMessage" 
      @close="this.errorMessage = ''" 
    />
  </section>
</template>

<style scoped>
  .popup__section {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 40px;
    height: 150px;
    width: 500px;

    background-color: #669933;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);

    animation: fadeIn 0.5s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .popup__input {
    width: 50%;
  }

  .popup__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .popup__input {
    padding: 5px;
    margin: 10px 0;

    font-size: 16px;

    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s;
  }

  .popup__input:hover {
    border-color: #669933;
  }

  .popup__input:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }

  .popup_add-currency {
    margin: 0 auto 10px;
    padding: 5px 10px;
    width: max-content;

    font-size: 16px;

    border-radius: 5px;
    border: none;
    background-color: #bce982;

    transition: all 0.3s;
  }
  .popup_add-currency:hover {
    background-color: #a0cc67;
  }

  .popup__button {
    position: absolute;
    right: 5px;
    top: 5px;

    background-color: transparent;
    border: none;
  }
</style>
