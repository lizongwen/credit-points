const talent = {
	namespaced: true,
	state: {
		userId: '',
		score:'',
		userName: '',
		userPhone: '',
		idcard: '',
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
		setIdcard(state, idcard) {
			state.idcard = idcard;
		},
		setVenueId(state, wdbm) {
			state.venueId = wdbm;
		}
	},
	actions: {

	}

};


export default talent;