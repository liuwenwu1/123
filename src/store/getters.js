export default {
	getResturantName: (state) => {
		return state.resturantName;
	},
	getShowName:(state) => {
		return state.showName;
	},
	getOptions:(state) => {
		return state.options;
	},
	getRole:(state) =>{
		return state.role;
	},
  getJwt:(state) =>{
    return state.Jwt;
  },
  getVerificationJwt:(state) =>{
    return state.verificationJwt;
  }
}
