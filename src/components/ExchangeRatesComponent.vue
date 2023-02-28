<!-- eslint-disable no-unused-vars -->
<script>
  import { getCurrancy } from '../api/currencies';
  import SelectCurrancy from './SelectCurrancy.vue';
  import ErrorNotification from './ErrorNotification.vue';
  
  export default {
    components: {
      SelectCurrancy,
      ErrorNotification,
    },
    props: {
      currencies: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        selectedCurrency: 'USD',
        selectedCurrencyTo: 'EUR',
        currancyRate: null,
        errorMessage: '',
      };
    },
    mounted() {
      this.getExchangeRate();
    },
    watch: {
      selectedCurrency() {
        this.getExchangeRate();
      },
      selectedCurrencyTo() {
        this.getExchangeRate();
      },
    },
    methods: {
      getExchangeRate() {
        getCurrancy(this.selectedCurrency)
          .then(response => {
            this.currancyRate = response.data.conversion_rates[this.selectedCurrencyTo];
          })
          .catch(error => {
            this.errorMessage = 'Something went wrong';
          });
      },
      resetError() {
        this.errorMessage = '';
      },
    },
  };
</script>

<template>
  <section class="exchange-rate">
    <h2 class="exchange-rate__header">
      Find out about current exchange rates
    </h2>

    <form>
      <div>
        <label for="currency_select">Select a currency:</label>
        <SelectCurrancy
          id="currency_select"
          :initial-currancy="this.selectedCurrency" 
          :currencies="['USD', 'EUR', 'UAH']"
          @select="$event => this.selectedCurrency = $event"
        />
      </div>

      <div>
        <label for="currency_select_to">Select a currency convert to:</label>
        <SelectCurrancy
          id="currency_select_to"
          :initial-currancy="this.selectedCurrencyTo" 
          :currencies="currencies"
          @select="$event => this.selectedCurrencyTo = $event"
        />
      </div>
    </form>

    <ErrorNotification 
      v-if="this.errorMessage"
      :text="this.errorMessage"
      @close="resetError"
    />

    <p class="exchange-rate__amount" v-else>
      {{ `1 ${this.selectedCurrencyTo} costs ${(1 / this.currancyRate).toFixed(5)} ${this.selectedCurrency}💲💲💲` }}
    </p>
  </section>
</template>

<style>
  .exchange-rate {
    display: flex;
    flex-direction: column;
    margin: 10px auto 0;
    padding: 20px 40px;
    width: max-content;

    background-color: #ffffcc;
    border-radius: 10px;
    border: 3px solid #669933;

    transition: all 0.3s;
  }

  .exchange-rate__header {
    margin: 0 0 20px;
    text-align: center;
  }

  .exchange-rate__amount {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
</style>
