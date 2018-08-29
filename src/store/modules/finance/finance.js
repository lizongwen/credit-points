const finance = {
	namespaced: true,
	state: {
		userId: '',
		score:'',
		userName: '',
		userPhone: '',
		useridcard: '',
		venueId: ''
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
		}
	},
	actions: {

	}

};


export default finance;