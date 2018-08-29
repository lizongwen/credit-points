import Vue from 'vue';
import Vuex from 'vuex';
import umbrella from './modules/umbrella/umbrella';
import finance from './modules/finance/finance';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
	umbrella,
	finance
  }
});

export default store;
