<script>
  import initialCurrencies from './data/initialCurrenciesForConversion';
  import FormComponent from './components/FormComponent.vue';
  import ExchangeRatesComponent from './components/ExchangeRatesComponent.vue';
  import PopUpComponent from './components/PopUpComponent.vue';

  export default {
    data() {
      let currencies = initialCurrencies;
      const currenciesFromStorage = localStorage.getItem('currencies');

      if (currenciesFromStorage) {
        currencies = JSON.parse(currenciesFromStorage);
      }

      return {
        currencies,
        isPopUpOpen: false,
      }
    },
    watch: {
      currencies: {
        handler() {
          localStorage.setItem('currencies', JSON.stringify(this.currencies));
        },
        deep: true,
      }
    },
    components: {
      FormComponent,
      ExchangeRatesComponent,
      PopUpComponent,
    },
    methods: {
      addCurrancy($event) {
        this.currencies.push($event.name);
        this.isPopUpOpen = false;
      },
    },
  }
</script>

<template>
  <main >
    <FormComponent :currencies="currencies" />

    <ExchangeRatesComponent :currencies="currencies" />

    <button 
      @click="$event => this.isPopUpOpen = true"
      class="add-curracy_button"
    >
      Add new currancy
    </button>

    <PopUpComponent 
      v-if="isPopUpOpen" 
      @add-currency="addCurrancy"
      @close="$event => this.isPopUpOpen = false"
  />
  </main>
</template>

<style>
body {
  margin: 0;
  height: 100vh;

  background-image: url('https://celes.club/uploads/posts/2022-05/1654015315_2-celes-club-p-dollari-oboi-krasivie-3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.add-curracy_button {
  display: block;
  padding: 20px 35px;
  margin: 10px auto;

  font-size: 14px;
  font-weight: bold;
  color: #33d385;

  border-radius: 15px;
  background-color: #1d4410;
  
  transition: all 0.3s;
}

.add-curracy_button:hover {
  background-color: #082d0c;
}

.add-curracy_button:active {
  background-color: #051d07;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.3);
}

@media (min-width: 640px) {
  .add-curracy_button {
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  .add-curracy_button {
    font-size: 20px;
  }
}
</style>
