let financeRouter = [
	{
		path: '/finance',
		name: 'finance',
		component: () => import('@/pages/finance/index.vue')
	},
	{
		path: '/finance/ruyibao',
		name: 'finance_ruyibao',
		component: () => import('@/pages/finance/ruyibao.vue')
	},
	{
		path: '/finance/creditcard',
		name: 'finance_creditcard',
		component: () => import('@/pages/finance/creditcard.vue')
	},{
		path: '/finance/micreloan',
		name: 'finance_micreloan',
		component: () => import('@/pages/finance/micreloan.vue')
	},{
		path: '/finance/applyloan',
		name: 'finance_applyloan',
		component: () => import('@/pages/finance/applyloan.vue')
	},{
		path: '/finance/protocol',
		name: 'finance_protocol',
		component: () => import('@/pages/finance/protocol.vue')
	},{
		path: '/finance/loanlist',
		name: 'finance_loanlist',
		component: () => import('@/pages/finance/loanlist.vue')
	},{
		path: '/finance/admin',
		name: 'finance_admin',
		component: () => import('@/pages/finance/adminlogin.vue')
	},{
		path: '/finance/admin/list',
		name: 'finance_adminlist',
		component: () => import('@/pages/finance/adminlist.vue')
	},
	
]

export default financeRouter;