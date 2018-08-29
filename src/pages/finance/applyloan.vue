<template>
	<div class="loan">
		<div v-show="ok" class="loan-field">
			<form class="form">
				<div class="form-item border-b-1px">
					<div class="title">
						<span class="text">姓名</span>
					</div>
					<div class="value">
						{{form.user}}
					</div>
				</div>
				<div class="form-item border-b-1px">
					<div class="title">
						<span class="text">联系电话</span>
					</div>
					<div class="value">
						{{form.phone}}
					</div>
				</div>
				<div class="form-item border-b-1px">
					<div class="title">
						<span class="text">身份证号</span>
					</div>
					<div class="value">
						{{formatCard}}
					</div>
				</div>
				<div class="form-item border-b-1px">
					<div class="title">
						<span class="text">申请产品</span>
					</div>
					<div class="value">
						{{form.produce}}
					</div>
				</div>
			</form>
			<div class="checkbox-wrap">
				<input class="checkbox" type="checkbox" v-model="checked">
				<span class="chenckbox-text" @click="goProtocol">我已阅读并同意
					<span class="protocol-name">《信用金融使用条款》</span>
				</span>
			</div>
			<div class="content-padded">
				<button class="btn btn-golden btn-block btn-large" :class="{'btn-disabled':!checked}" @click="submit" :disabled="!checked">确认申请</button>
			</div>
		</div>
		<div v-show="!ok" class="result">
			<img class="result-img" src="../../img/finance/wait.png" alt="" srcset="">
			<div class="result-desc">
				提交成功
				<P class="result-desc-li">请等待银行人员审批处理</P>
			</div>
			<button class="btn btn-default btn-large" @click="fallback">返回</button>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      ok: true,
      checked: false,
      form: {
        user: this.$store.state.finance.userName,
        phone: this.$store.state.finance.userPhone,
		card: this.$store.state.finance.useridcard,
		produce:`申请${this.$route.query.produce}万元贷款额度`
      }
    };
  },
  computed: {
    formatCard() {
      return this.form.card.replace(/(\w)/g, function(a, b, c, d) {
        return c > 5 && c < 14 ? "*" : a;
      });
    }
  },
  methods: {
    submit: async function() {
		console.log(this.checked)
      if (!this.checked) {
        return;
      }
      let params = {
        method: "XYJR00001",
        params: {
          userid: this.$store.state.finance.userId,
          username: this.form.user,
          useridcard: this.form.card,
          userphone: this.form.phone,
          usercreditscore: this.$store.state.finance.score,
        }
	  };
	  console.log(params)
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.ok = false;
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //协议
    goProtocol() {
      this.$router.push("./protocol");
    },
    //返回
    fallback() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.loan {
  height: 100%;
  .loan-field {
    height: 100%;
    overflow: hidden;
    background-color: $bg-grey;
    .form {
      margin-top: px(10);
      .value {
        color: $text-grey;
      }
    }
    .checkbox-wrap {
      margin-top: px(20);
      margin-bottom: px(40);
	  text-align: center;
	  .checkbox:checked{
		  background: #FDE728;
	  }
      .chenckbox-text {
        margin-left: px(6);
        font-size: px(12);
        color: $text-grey;
        .protocol-name {
          color: $text-primary;
        }
      }
    }
  }
  .result {
    margin-top: px(50);
    text-align: center;
    .result-img {
      width: px(85);
      height: px(85);
    }
    .result-desc {
      margin: px(12) 0 px(37);
	  font-size: px(18);
	  .result-desc-li{
		  margin-top: px(20);
		  font-size: px(16);
	  }
    }
    .btn {
      width: px(240);
      height: px(38);
      border: 1px solid #d8d8d8;
      letter-spacing: px(10);
      background: #fff;
    }
  }
}
</style>
