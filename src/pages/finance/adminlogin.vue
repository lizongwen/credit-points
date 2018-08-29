<template>
	<div class="admin-login">
		<div class="banner-title-top">信用金融</div>
		<form class="admin-form">
			<div class="form-item">
				<span class="admin-login-user"></span>
				<input type="text" class="mui-input-clear" placeholder="账号">
			</div>
			<div class="form-item">
				<span class="admin-login-password"></span>
				<input type="text" class="mui-input-clear" placeholder="密码">
			</div>
		</form>
		<div class="login-btn-wrap">
			<button type="button" class="btn btn-block btn-golden btn-large" @click="login">登录</button>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{

		}
	},
	methods:{
		login(){
			this.$router.push({path:'/finance/admin/list'})
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.admin-login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../../img/finance/images_login2.png") no-repeat center;
  background-size: cover;
  padding-top: 34px;
  .banner-title-top {
    display: inline-block;
    width: 100%;
    margin-top: px(60);
    font-size: px(26);
    letter-spacing: px(10);
    text-align: center;
    text-shadow: 0 0 px(4) #000000;
    color: #ffffff;
  }
  .admin-form {
    background: transparent;
    width: px(275);
    margin: px(40) auto 0;
    .form-item {
      position: relative;
      display: flex;
      margin-bottom: px(20);
      padding: px(8);
      border: 1px solid $bd-grey;
      border-radius: px(4);
      input {
        padding-left: px(40);
        width: 100%;
        font-size: px(16);
        background-color: transparent;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #ffffff;
        }
      }
      .admin-login-user {
        position: absolute;
        top: px(10);
        left: px(15);
        width: px(18);
        height: px(18);
        background: no-repeat url("../../img/finance/icon_user.png");
      }
      .admin-login-password {
        position: absolute;
        top: px(10);
        left: px(15);
        width: px(18);
        height: px(18);
        background: no-repeat url("../../img/finance/icon_lock.png");
      }
    }
  }
  .login-btn-wrap {
    text-align: center;
    .btn {
      width: px(275);
    }
  }
}
</style>

