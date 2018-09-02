let umbrellaRouter = [
	{
		path: '/umbrella',
		name: 'umbrella',
		meta:{
			title:'信用伞'
		},
		component: () => import('@/pages/umbrella/index.vue')
	},
	{
		path: '/umbrella/index',
		name: 'umbrella_index',
		component: () => import('@/pages/umbrella/index.vue')
	},
	{
		path: '/umbrella/home',
		name: 'umbrella_home',
		component: () => import('@/pages/umbrella/home.vue')
	},
	{
		path: '/umbrella/record',
		name: 'umbrella_record',
		component: () => import('@/pages/umbrella/record.vue')
	},
	{
		path: '/umbrella/borrow',
		name: 'umbrella_borrow',
		component: () => import('@/pages/umbrella/borrow.vue')
	},
	{
		path: '/umbrella/protocol',
		name: 'umbrella_protocol',
		component: () => import('@/pages/umbrella/protocol.vue')
	},
	{
		path: '/umbrella/remand',
		name: 'umbrella_remand',
		component: () => import('@/pages/umbrella/remand.vue')
	},
	{
		path: '/umbrella/remandform',
		name: 'umbrella_remandform',
		component: () => import('@/pages/umbrella/remand_form.vue')
	},
	{
		path: '/umbrella/comment',
		name: 'umbrella_comment',
		component: () => import('@/pages/umbrella/comment.vue')
	},
	{
		path: '/umbrella/netdot',
		name: 'umbrella_netdot',
		component: () => import('@/pages/umbrella/netdot.vue')
	},
	{
		path: '/umbrella/test',
		name: 'umbrella_test',
		component: () => import('@/pages/umbrella/test.vue')
	}
]

export default umbrellaRouter;