import Vue from "vue";
import Vuex from "vuex";

const axios = require("axios").create({
  baseURL: "http://www.floatrates.com/daily/"
});
const suffix = ".json";

// default currency for initial request
const defaultCurrency = "usd";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    defaultCurrency: defaultCurrency,
    currencies: {},
    rates: {},
    history: []
  },

  getters: {
    codes: state => {
      return Object.keys(state.currencies);
    }
  },

  mutations: {
    set_currencies: (state, currencies) => (state.currencies = currencies),
    set_rates: (state, rates) => (state.rates = rates),
    update_history: (state, history) => {
      state.history.push(history);
    }
  },

  actions: {
    async getDefaultRates({ commit }) {
      try {
        // defaulting to usd
        const response = await axios.get(`${defaultCurrency}${suffix}`);
        await commit("set_currencies", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    // request rates for selected base currency
    async getNewCurrencyRates({ commit }, base) {
      try {
        const response = await axios.get(`${base}${suffix}`);
        await commit("set_rates", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async captureHistory({ commit }, historyItems) {
      try {
        commit("update_history", historyItems);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
