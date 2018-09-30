import Vue from 'vue'
import Router from 'vue-router'
import umbrella from './umbrella'
import finance from './finance'
import travel from './travel'
import talent from './talent'

Vue.use(Router)
const baseRouter = [
	{
		path: '/',
		name: '',
		// redirect: '/um'
	},
	{
		path: '/download',
		name: 'download',
		meta: {
			title: '城市令下载'
		},
		component: () => import('@/components/download.vue')
	},
]
const RouterConfig = {
	routes: [...baseRouter, ...umbrella, ...finance, ...travel, ...talent]
};
const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title || '信用服务'
	}
	if (to.path == '/umbrella/home') {
		if (!to.query.code) {
			next('/download')
		}else{
			next()
		}
	}else{
		next()
	}
	
})
export default router;
