<template>
  <div class="home">
    <h1>Currency Converter</h1>

    <form class="form">
      <div class="errors-list" v-if="errors.length">
        <p><strong>Please correct the following error(s):</strong></p>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div class="form__item">
        <label for="base-currency">My base currency is</label>
        <select v-model="base" name="base">
          <option disabled value="">Enter base currency</option>
          <!-- set first option to default currency -->
          <option>{{ this.defaultCurrency }}</option>
          <!-- loop through all other country codes -->
          <option v-for="code in this.codes" :key="code">
            {{ code }}
          </option>
        </select>
      </div>

      <div class="form__item">
        <label for="amount">The amount I have is</label>
        <input
          type="number"
          name="amount"
          v-model="amount"
          placeholder="Enter amount to convert"
          step="0.01"
        />
      </div>

      <div class="form__item">
        <label for="target-currency">My target currency is</label>
        <select name="target" v-model="target">
          <option disabled value="">Enter target currency</option>
          <!-- set first option to default currency -->
          <option>{{ this.defaultCurrency }}</option>
          <!-- loop through all other country codes -->
          <option v-for="code in this.codes" :key="code">
            {{ code }}
          </option>
        </select>
      </div>

      <button @click.prevent="checkForm">Convert</button>

      <div class="calculation" v-if="showCalc">
        <p>
          <strong>{{ this.record.amount }} {{ this.record.base }} =</strong>
        </p>
        <p class="calculation__converted">
          <strong
            >{{ this.record.convertedAmt }} {{ this.record.target }}</strong
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      errors: [],
      base: "",
      target: "",
      amount: "",
      record: {
        base: "",
        target: "",
        amount: "",
        convertedAmt: null
      },
      showCalc: false
      // localHist: []
    };
  },

  created() {
    this.getDefaultRates();
  },

  mounted() {
    if (this.history.length === 0 && localStorage.history) {
      this.captureHistory(JSON.parse(localStorage.history));
    }
  },

  computed: {
    ...mapState(["defaultCurrency", "rates", "history"]),
    ...mapGetters(["codes"])
  },

  methods: {
    ...mapActions(["getDefaultRates", "getNewCurrencyRates", "captureHistory"]),

    checkForm() {
      this.errors = [];
      if (!this.base && !this.target) {
        this.errors.push("Please select a base and target currency.");
        return;
      }
      if (!this.base) {
        this.errors.push("Please select a base currency.");
        return;
      }
      if (!this.target) {
        this.errors.push("Please select a target currency.");
        return;
      }
      if (this.base == this.target) {
        // if base is same as target, return amount entered
        this.record.convertedAmt = this.amount;
        return;
      }
      this.fetchRates();
    },

    async fetchRates() {
      await this.$store.dispatch("getNewCurrencyRates", this.base);
      // once all rates returned, get the rate for target currency
      this.getTargetRate(this.target, this.base);
    },

    getTargetRate(target) {
      const rate = this.rates[target].rate;
      this.calculateRate(rate, this.amount);
    },

    calculateRate(rate, amount) {
      // calculate conversion amount
      this.record.convertedAmt = (parseFloat(amount) * rate).toFixed(2);
      this.setRecordFigs();
    },

    setRecordFigs() {
      // set fixed figures that will only update on a conversion
      this.record.base = this.base;
      this.record.amount = this.amount;
      this.record.target = this.target;
      this.showCalc = true;
      this.saveToHistory();
    },

    saveToHistory() {
      // pass converted figs to history state
      const newRecord = { ...this.record };
      this.captureHistory(newRecord);
    }
  },

  watch: {
    // When history state updates, update local storage too
    history: {
      handler(currentVal) {
        localStorage.history = JSON.stringify(currentVal);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.errors-list {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-left: solid 4px #8d2728;
  background: #fcb7b8;
  color: #8d2728;
  margin-bottom: 2rem;
  border-radius: 0 4px 4px 0;
}

.form {
  margin: 0 2rem 2rem 2rem;
  border-radius: 1rem;
  padding: 2rem 1rem;
  background: #222429;

  @media only screen and (min-width: $tablet-width) {
    margin: 0 auto;
    max-width: 600px;
    padding: 2rem 4rem;
  }
  &__item {
    margin: 0 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:last-of-type {
      margin-bottom: 2rem;
    }
    @media only screen and (min-width: $tablet-width) {
      flex-direction: row;
      align-items: center;
    }
  }
  label {
    font-weight: 800;
    margin-bottom: 1rem;
  }
  select,
  input {
    padding: 0.5rem;
    min-width: 100%;
    min-width: 220px;
    font-size: 1rem;
    height: 48px;
    background: none;
    color: $white;
    border: none;
    border-left: solid 2px $primary--dark;
    outline-color: $primary--dark;
    transition: background-color 250ms ease-out, border-width 100ms ease-out;
    &:hover {
      background: $black--light;
      border-left: solid 4px $primary--dark;
    }
    @media only screen and (min-width: 600px) {
      min-width: 220px;
    }
  }
  select,
  input::placeholder {
    color: $white;
  }
  button {
    display: block;
    width: 100%;
    background: $primary--dark;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 800;
    border: none;
    padding: 12px 24px;
    color: $white;
    &:hover {
      cursor: pointer;
    }
    @media only screen and (min-width: $tablet-width) {
      margin: 0 0 0 auto;
      width: auto;
      font-size: 1.2rem;
    }
  }
}

.calculation {
  margin: 1rem 0;
  p {
    margin: 0;
  }
  &__converted {
    font-size: 2rem;
  }
}
</style>
