<template>
  <div class="history">
    <h1>Conversion History</h1>
    <table>
      <thead>
        <tr>
          <th colspan="4" class="table-main-heading">Conversions</th>
        </tr>
        <tr>
          <th @click="sort('base')">Base Currency</th>
          <th @click="sort('target')">Target Currency</th>
          <th @click="sort('amount')">Amount to Convert</th>
          <th @click="sort('convertedAmt')">Converted Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in sortedCurrencies" :key="index">
          <td v-for="item in record" :key="item">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "History",
  data() {
    return {
      currentSort: "base",
      currentSortDir: "asc"
    };
  },

  methods: {
    ...mapActions(["captureHistory"]),
    sort: function(sortType) {
      //if sortType == current sort, reverse
      if (sortType === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = sortType;
    }
  },
  computed: {
    ...mapState(["history"]),
    sortedCurrencies() {
      return this.history.slice().sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  },

  mounted() {
    if (this.history.length === 0 && localStorage.history) {
      this.captureHistory(JSON.parse(localStorage.history));
    }
  }
};
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  border-radius: 1rem;
  margin: 0 auto;
  background: $grey;
  td,
  th {
    padding: 0.5rem;
    @media only screen and (min-width: $tablet-width) {
      padding: 1rem;
    }
  }
  th {
    border-right: 2px solid $primary--dark;
    &:last-child {
      border-right: none;
    }
    &:hover {
      cursor: pointer;
      user-select: none;
    }
  }
  td {
    border-top: 2px solid $primary--dark;
    border-right: 2px solid $primary--dark;
    &:last-child {
      border-right: none;
    }
    &:last-child,
    &:nth-child(3) {
      text-align: right;
    }
  }
  th {
    font-size: 0.825rem;
    @media only screen and (min-width: $tablet-width) {
      font-size: 1rem;
    }
  }
  .table-main-heading {
    font-weight: 400;
  }
}
</style>
