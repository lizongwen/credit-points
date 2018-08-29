import Vue from 'vue'
import Router from 'vue-router'
import umbrella from './umbrella'
import finance from './finance'
import travel from './travel'

Vue.use(Router)
const baseRouter=[
	{
		path: '/',
		name: '',
		// redirect: '/um'
	},
]
const RouterConfig = {
	routes: [...baseRouter,...umbrella,...finance, ...travel]
};
const router = new Router(RouterConfig);
export default router;
