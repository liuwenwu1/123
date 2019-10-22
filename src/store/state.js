export default {
  resturantName: '飞歌餐馆',
  jwt: '',
  options: [], //存放tab页的容器
  activeIndex: '', //激活的tab页路由路径
  showName: 'show', //tab页的标题
  role: "", //用来区分是否是因为左侧菜单被点击造成的路由路径发生改变，是：pass；不是：nopass
  verificationJwt: null //这是用来保存用户等登录验证码jwt身份识别的
}
