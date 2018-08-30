let travelRouter = [
	{
		path: '/travel',
		name: 'travel',
		component: () => import('@/pages/travel/index.vue')
    },
    {
    path: '/travel/index',
		name: 'travel',
		component: () => import('@/pages/travel/index.vue')
    },
    {
		path: '/travel/application/list',
		name: 'application_list',
		component: () => import('@/pages/travel/application_list.vue')
    },
    {
		path: '/travel/application',
		name: 'application',
		component: () => import('@/pages/travel/application.vue')
    },
    {
		path: '/travel/approval',
		name: 'approval',
		component: () => import('@/pages/travel/approval.vue')
    },
    {
		path: '/travel/deposit_halved',
		name: 'deposit_halved',
		component: () => import('@/pages/travel/deposit_halved.vue')
    },

    
]

export default travelRouter;