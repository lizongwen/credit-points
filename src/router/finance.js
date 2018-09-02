let financeRouter = [
	{
		path: '/finance',
		name: 'finance',
		meta:{
			title:'信用金融'
		},
		component: () => import('@/pages/finance/index.vue')
	},
	{
		path: '/finance/ruyibao',
		name: 'finance_ruyibao',
		meta:{
			title:'信理财'
		},
		component: () => import('@/pages/finance/ruyibao.vue')
	},
	{
		path: '/finance/creditcard',
		name: 'finance_creditcard',
		meta:{
			title:'信易申'
		},
		component: () => import('@/pages/finance/creditcard.vue')
	},{
		path: '/finance/micreloan',
		name: 'finance_micreloan',
		meta:{
			title:'信易贷'
		},
		component: () => import('@/pages/finance/micreloan.vue')
	},{
		path: '/finance/applyloan',
		name: 'finance_applyloan',
		meta:{
			title:'贷款申请'
		},
		component: () => import('@/pages/finance/applyloan.vue')
	},{
		path: '/finance/protocol',
		name: 'finance_protocol',
		meta:{
			title:'贷款协议'
		},
		component: () => import('@/pages/finance/protocol.vue')
	},{
		path: '/finance/loanlist',
		name: 'finance_loanlist',
		meta:{
			title:'申请列表'
		},
		component: () => import('@/pages/finance/loanlist.vue')
	},{
		path: '/finance/admin/list',
		name: 'finance_adminlist',
		meta:{
			title:'申请列表'
		},
		component: () => import('@/pages/finance/adminlist.vue')
	}
]

export default financeRouter;