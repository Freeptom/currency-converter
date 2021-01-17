<template>
  <div class="history">
    <h1>Conversion History</h1>
    <table>
      <thead>
        <tr>
          <th colspan="4">Conversions</th>
        </tr>
        <tr>
          <th>Base Currency</th>
          <th>Target Currency</th>
          <th>Amount to Convert</th>
          <th>Converted Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in history" :key="index">
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
  name: "Home",
  components: {},
  data() {
    return {};
  },

  methods: {
    ...mapActions(["captureHistory"])
  },
  computed: {
    ...mapState(["history"])
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
  border: solid 1px red;
}
</style>
