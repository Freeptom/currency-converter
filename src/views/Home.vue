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
        <select v-model="base">
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
          id="amount"
          name="amount"
          v-model="amount"
          placeholder="Enter amount to convert"
        />
      </div>

      <div class="form__item">
        <label for="target-currency">My target currency is</label>
        <select
          id="target"
          name="target"
          v-model="target"
          placeholder="enter target currency"
        >
          <option disabled value="">Enter Target currency</option>
          <!-- set first option to default currency -->
          <option>{{ this.defaultCurrency }}</option>
          <!-- loop through all other country codes -->
          <option v-for="code in this.codes" :key="code">
            {{ code }}
          </option>
        </select>
      </div>

      <button @click.prevent="checkForm">Convert</button>

      <p>Converted amount: {{ this.convertedAmt }}</p>
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
      amount: 0,
      base: "",
      target: "",
      convertedAmt: null
    };
  },

  created() {
    this.getDefaultRates();
  },

  computed: {
    ...mapState(["defaultCurrency", "rates"]),
    ...mapGetters(["codes"])
  },

  methods: {
    ...mapActions(["getDefaultRates", "getNewCurrencyRates"]),

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
        this.convertedAmt = this.amount;
        return;
      }
      this.fetchRates();
    },

    async fetchRates() {
      await this.$store.dispatch("getNewCurrencyRates", this.base);
      // once rates returned, filter them by target currency
      this.targetRate(this.target);
    },

    targetRate(target) {
      const rate = this.rates[target].rate;
      this.conversion(rate, this.amount);
    },

    conversion(rate, amount) {
      this.convertedAmt = (parseFloat(amount) * rate).toFixed(2);
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
  margin: 0 auto;
  border-radius: 1rem;
  padding: 2rem 4rem;
  max-width: 600px;
  background: #222429;
  &__item {
    margin: 0 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  label {
    font-weight: 800;
  }
  select,
  input {
    padding: 0.5rem;
    min-width: 220px;
    font-weight: 800;
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
  }
  select,
  input::placeholder {
    color: $white;
  }
}
</style>
