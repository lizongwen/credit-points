let travelRouter = [
	{
		path: '/travel',
		name: 'travel',
		meta: {
			title: '信易行'
		},
		component: () => import('@/pages/travel/index.vue')
	},
	{
		path: '/travel/index',
		name: 'travel_index',
		meta: {
			title: '信易行'
		},
		component: () => import('@/pages/travel/index.vue')
	},
	{
		path: '/travel/application/list',
		name: 'application_list',
		meta: {
			title: '信易行'
		},
		component: () => import('@/pages/travel/application_list.vue')
	},
	{
		path: '/travel/application',
		name: 'application',
		meta: {
			title: '信易行'
		},
		component: () => import('@/pages/travel/application.vue')
	},
	{
		path: '/travel/approval',
		name: 'approval',
		meta: {
			title: '信易行'
		},
		component: () => import('@/pages/travel/approval.vue')
	},
	{
		path: '/travel/deposit_halved',
		name: 'deposit_halved',
		meta: {
			title: '信易行'
		},
		component: () => import('@/pages/travel/deposit_halved.vue')
	},
]

export default travelRouter;
