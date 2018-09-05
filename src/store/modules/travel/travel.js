const travel = {
	namespaced: true,
	state: {
		userId: '',
		score:'',
		userName: '',
		userPhone: '',
		useridcard: '',
		venueId: '',
		incentiveId:'',
		incentiveName: '',
		usercreditscore: '',
		status: ''
	},
	getters: {},
	mutations: {
		setUserId(state, id) {
			state.userId = id;
		},
		setScore(state, score) {
			state.score = score;
		},
		setUserName(state, name) {
			state.userName = name;
		},
		setUserPhone(state, phone) {
			state.userPhone = phone;
		},
		setUseridcard(state, idcard) {
			state.useridcard = idcard;
		},
		setVenueId(state, wdbm) {
			state.venueId = wdbm;
		},
		setIncentiveId(state,incentiveId) {
			state.incentiveId = incentiveId;
		},
		setIncentiveName(state,incentiveName) {
			state.incentiveName = incentiveName;
		},
		setUsercreditscore(state,usercreditscore) {
			state.usercreditscore = usercreditscore;
		},
		setStatus(state,status) {
			state.status = status;
		}
	},
	actions: {

	}

};


export default travel;