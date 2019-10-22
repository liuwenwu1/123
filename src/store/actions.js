export default{
	setResturantNameAsync: (context , payload) => {
		console.log('xxxx')
		setTimeout(()=>{
			console.log('yyyy')
			context.commit('setResturantName', payload); //Action提交的是mutation
		},3000);

		console.log('zzzz')
	},
	// vuex是不能使用vue示例：this
	doAjax:(context,payload)=>{
		let _this=payload._this;
		let url = _this.axios.urls.SYSTEM_USER_DOLOGIN;
		// let url = "http://localhost:8080/Pro_ssh/user/user_login.action";
		console.log(url);

		_this.axios.post(url, {}).then((response) => {
		}).catch((response) => {
			console.log(response)
		});
	}
}
