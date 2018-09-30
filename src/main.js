// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';
import App from './App'
import store from './store'
import router from './router'
import 'url-search-params-polyfill';
import http from './js/http';
import config from './js/config';
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from "vue-amap";
// import './style/common.scss';

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$ctx = config.ctx;
Vue.use(MintUI);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
	key: '19cac51dc3cb9c0e0aa4947b2dd339ae',
	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
	uiVersion: '1.0.11',
	// 默认高德 sdk 版本为 1.4.4
	v: '1.4.4'
});
lazyAMapApiLoaderInstance.load().then(() => {
	this.map = new AMap.Map("amapContainer", {
		// center: new AMap.LngLat(121.59996, 31.197646)
	});
});
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
