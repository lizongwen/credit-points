let talentRouter = [
	{
		path: '/talent',
		name: 'talent',
		meta: {
			title: '信易人才'
		},
		component: () => import('@/pages/talent/index.vue')
	},
	{
		path: '/talent/apply',
		name: 'talent_apply',
		meta: {
			title: '信易人才'
		},
		component: () => import('@/pages/talent/apply.vue')
	},
	{
		path: '/talent/list',
		name: 'talent_list',
		meta: {
			title: '信易人才'
		},
		component: () => import('@/pages/talent/list.vue')
	},
	{
		path: '/talent/comment',
		name: 'talent_comment',
		meta: {
			title: '信易人才'
		},
		component: () => import('@/pages/talent/comment.vue')
	}
]

export default talentRouter;