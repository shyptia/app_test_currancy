<!-- eslint-disable no-unused-vars -->
<script>
  import SelectCurrancy from './SelectCurrancy.vue';
  import InputComponent from './InputComponent.vue';
  import InputLabel from './InputLabel.vue';
  import ErrorNotification from './ErrorNotification.vue';
  import { getCurrancy } from '../api/currencies';

  export default {
    components: {
      SelectCurrancy,
      InputComponent,
      InputLabel,
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
        convertFrom: 'USD',
        convertTo: 'BBD',
        currancyRate: 0,
        amountConvertFrom: 0,
        amountConvertTo: 0,
        errorMessage: '',
        isFirstInputFocused: false,
        isSecondInputFocused: false,
      }
    },
    mounted() {
      this.getExchangeRate();
      console.log(this.currancyRate);
    },
    watch: {
      convertFrom() {
        this.getExchangeRate();
        this.resetValues();
      },
      convertTo() {
        this.getExchangeRate();
        this.resetValues();
      },
      amountConvertFrom: {
        handler() {
          console.log(this.isFirstInputFocused);
          console.log(this.currancyRate);
          if (!this.isSecondInputFocused) {
            this.amountConvertTo = +(this.amountConvertFrom * this.currancyRate).toFixed(4);
          }
        },
        deep: true,
      },
      amountConvertTo: {
        handler() {
          if (!this.isFirstInputFocused) {
            this.amountConvertFrom = +(this.amountConvertTo / this.currancyRate).toFixed(4);
          }
        },
        deep: true,
      },
    },
    methods: {
      getExchangeRate() {
        getCurrancy(this.convertFrom)
          .then(response => {
            this.currancyRate = response.data.conversion_rates[this.convertTo];
          })
          .catch(error => {
            this.currancyRate = 0;
            this.resetValues();
            this.errorMessage = 'Something went wrong'
          });
      },
      resetValues() {
        this.amountConvertFrom = 0;
        this.amountConvertTo = 0;
      },
      resetError() {
        this.errorMessage = '';
      },
      handleFirstInputFocused() {
        this.isSecondInputFocused = false;
        this.isFirstInputFocused = true;
      },
      handleSecondInputFocused() {
        this.isFirstInputFocused = false;
        this.isSecondInputFocused = true;
      },
    },
  }
</script>

<template>
  <form class="form">
    <h2 class="form__header">
      Currency conversion form
    </h2>

    <InputLabel 
      :forId="'convert_from'" 
      :text="'Choose currancy convert from:'"
    />

    <div>
      <InputComponent 
        :idValue="'convert_from'" 
        :amount="amountConvertFrom"
        v-model="this.amountConvertFrom"
        @change="$event => this.amountConvertFrom = Number($event)"
        @focus="handleFirstInputFocused()"
      />

      <SelectCurrancy 
        :initial-currancy="this.convertFrom" 
        :currencies="currencies"
        @select="$event => this.convertFrom = $event"
      />
    </div>
    
    <InputLabel 
      :forId="'convert_to'" 
      :text="'Choose currancy convert to:'"
    />

    <div>
      <InputComponent 
        :idValue="'convert_to'" 
        :amount="amountConvertTo"
        v-model="this.amountConvertTo"
        @change="$event => this.amountConvertTo = Number($event)"
        @focus="handleSecondInputFocused()"
      />

      <SelectCurrancy 
        :initial-currancy="this.convertTo" 
        :currencies="currencies"
        @select="$event => this.convertTo = $event"
      />
    </div>

    <ErrorNotification 
      v-if="errorMessage" 
      :text="errorMessage"
      @close="resetError"
    />
  </form>

</template>

<style scoped>
  .form {
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

  .form__header {
    margin: 0 0 20px;
    text-align: center;
  }
</style>
