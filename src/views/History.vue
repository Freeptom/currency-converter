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
        <tr v-for="record in history" :key="record">
          <td v-for="item in record" :key="item">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },

  computed: {
    ...mapState(["history"])
  }
};
</script>

<style scoped lang="scss">
table {
  border: solid 1px red;
}
</style>
