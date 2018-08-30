<template>
	<div class="borrow">
		<div v-show="ok" class="borrow-field">
			<form class="form">
				<div class="form-item border-b-1px">
					<div class="title">
						<span class="text">借用人(单位)</span>
					</div>
					<div class="value">
						{{form.user}}
					</div>
				</div>
				<div class="form-item border-b-1px">
					<div class="title">
						<span class="text">证件号码</span>
					</div>
					<div class="value">
						{{formatCard}}
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
			</form>
			<div class="checkbox-wrap">
				<input class="checkbox" type="checkbox" v-model="checked">
				<span class="chenckbox-text" @click="goProtocol">我已阅读并同意
					<span class="protocol-name">《信用晴雨伞用户服务协议》</span>
				</span>
			</div>
			<div class="content-padded">
				<button class="btn btn-primary btn-block  btn-large" :class="{'btn-disabled':!checked}" @click="submit" :disabled="!checked">确认借伞</button>
			</div>
		</div>
		<div v-show="!ok" class="result">
			<img class="result-img" src="../../img/umbrella/result_success@3x.png" alt="" srcset="">
			<div class="result-desc">
				成功借伞
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
        user: this.$store.state.umbrella.userName,
        card: this.$store.state.umbrella.useridcard,
        phone: this.$store.state.umbrella.userPhone
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
      if (!this.checked) {
        return;
      }
      let params = {
        method: "XYQ00007",
        params: {
            // venueId: "75181d4836e844249d3a41abc643ab5d",
          sitecode: this.$store.state.umbrella.venueId,
          userId: this.$store.state.umbrella.userId,
          userName: this.form.user,
          userIdCard: this.form.card,
          userPhone: this.form.phone,
          userCreditScore: this.$store.state.umbrella.creditScore,
          dayStr: "7"
        }
      };
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
.borrow {
  height: 100%;
  .borrow-field {
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
