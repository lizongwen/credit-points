const umbrella = {
	namespaced: true,
	state: {
		userId:'',
		userName:'',
		userPhone:'',
		useridcard:'',
		creditScore:'',
		code:'',
		wdbm:'',
		isBorrow: true,
		venueId:''
	},
	getters: {},
	mutations: {
		//改变借伞状态
		changeBorrow(state,isBorrow){
			state.isBorrow=isBorrow;
		},
		setCode(state,code){
			state.code=code;
		},
		setWdbm(state,wdbm){
			state.wdbm=wdbm;
		},
		setUserId(state,id){
			state.userId=id;
		},
		setUserName(state,name){
			state.userName=name;
		},
		setUserPhone(state,phone){
			state.userPhone=phone;
		},
		setUseridcard(state,idcard){
			state.useridcard=idcard;
		},
		setCreditScore(state,score){
			state.creditScore=score;
		},
		setVenueId(state,wdbm){
			state.venueId=wdbm;
		}
	},
	actions: {

	}

};


export default umbrella;