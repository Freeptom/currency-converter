<template>
  <div class="home">
    <h1>Currency Converter</h1>
    <form>
      <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      </p>

      <label for="base-currency">Please select a base currency</label>
      <select
        id="base"
        name="base"
        v-model="base"
        placeholder="enter base currency"
      >
        <option disabled value="">Please select a base currency</option>
        <!-- set first option to default currency -->
        <option>{{ this.defaultCurrency }}</option>
        <!-- loop through all other country codes -->
        <option v-for="code in this.codes" :key="code">
          {{ code }}
        </option>
      </select>

      <label for="amount">Amount to convert:</label>
      <input
        type="number"
        id="amount"
        name="amount"
        v-model="amount"
        placeholder="enter amount to convert"
      />

      <label for="target-currency">Choose a target currency:</label>
      <select
        id="target"
        name="target"
        v-model="target"
        placeholder="enter target currency"
      >
        <option disabled value="">Please select a target currency</option>
        <!-- set first option to default currency -->
        <option>{{ this.defaultCurrency }}</option>
        <!-- loop through all other country codes -->
        <option v-for="code in this.codes" :key="code">
          {{ code }}
        </option>
      </select>

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
      base: null,
      target: null,
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
          this.errors.push('Please select a base and target currency.');
        return;
      }
      if (!this.base) {
          this.errors.push('Please select a base currency.');
        return;
      }
      if (!this.target) {
          this.errors.push('Please select a target currency.');
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
