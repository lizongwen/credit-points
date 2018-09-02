import Vue from 'vue'
import Router from 'vue-router'
import umbrella from './umbrella'
import finance from './finance'
import travel from './travel'

Vue.use(Router)
const baseRouter = [
	{
		path: '/',
		name: '',
		// redirect: '/um'
	},
]
const RouterConfig = {
	routes: [...baseRouter, ...umbrella, ...finance, ...travel]
};
const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title||'信用服务'
	}
	next()
})
export default router;
