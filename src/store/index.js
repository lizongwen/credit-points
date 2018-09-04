import Vue from 'vue';
import Vuex from 'vuex';
import umbrella from './modules/umbrella/umbrella';
import finance from './modules/finance/finance';
import travel from './modules/travel/travel';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
	umbrella,
  finance,
  travel
  }
});

export default store;
