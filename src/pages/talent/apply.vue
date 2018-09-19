<template>
	<div class="apply">
		<div class="apply-main" v-if="ok">
			<div class="title">是否确认申请</div>
			<div class="apply-icon">
				<img src="../../img/talent/ydy@2x.png" alt="" srcset="">
			</div>
			<div class="desc">
				乐惠分950分以上，享受一对一咨询服务<br/> 由大厅引导员一对一进行专门办事流程指引
				<br/> 和具体指导，每个账号一天最多申请2次
			</div>
			<div class="btn-wrap">
				<button class="btn btn-primary btn-block" @click="submit">确认</button>
				<button class="btn btn-default btn-block" @click="cancel">取消</button>
			</div>
		</div>
		<div class="result" v-if="!ok">
			<img class="result-img" src="../../img/talent/icon_success@2x.png" alt="" srcset="">
			<div class="result-msg">恭喜您申请成功！</div>
			<div class="result-data border-b-1px">
				<div class="item">
					<div class="title">姓名：</div>
					<div class="value">{{$store.state.talent.userName}}</div>
				</div>
				<div class="item">
					<div class="title">身份证号：</div>
					<div class="value">{{$store.state.talent.idcard}}</div>
				</div>
			</div>
			<div class="result-desc">请凭此页面联系大厅引导员为您提供服务<br/> 并在接受完服务后，及时进行评价。
			</div>
			<button class="btn btn-default btn-large" @click="fallback">确认</button>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      ok: true
    };
  },
  mounted() {},
  methods: {
    submit: async function() {
      let params = {
        method: "XYRC00002",
        params: {
          userId: this.$store.state.talent.userId,
          userCreditScore: this.$store.state.talent.score,
          userPhone: this.$store.state.talent.userPhone,
          userName: this.$store.state.talent.userName,
          userIdCard: this.$store.state.talent.idcard,
          venueId: this.$route.query.venueid,
          incentiveId: this.$route.query.incentiveid,
          incentiveName: this.$route.query.incentivename
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.ok = false;
      } else {
        let instance = Toast({
          message: res.resultMsg,
          duration: -1,
          position: "bottom"
        });
        setTimeout(() => {
          instance.close();
          this.$router.back();
        }, 3000);
      }
    },
    //取消
    cancel() {
      this.$router.back();
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
.apply {
  height: 100%;
  overflow: hidden;
  .apply-main {
    margin-top: px(50);
    height: inherit;
    text-align: center;
    .title {
      margin-bottom: px(15);
      font-size: px(18);
    }
    .apply-icon {
      margin-bottom: px(20);
    }
    .desc {
      margin-bottom: px(40);
    }
    .btn-wrap {
      width: px(240);
      margin: 0 auto;
      .btn-block {
        + .btn-block {
          margin-top: px(20);
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
    .result-msg {
      margin: px(12) 0 px(20);
      font-size: px(18);
    }
    .result-data {
      width: px(245);
      margin: 0 auto;
      padding-bottom: px(15);
      position: relative;
      &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        content: " ";
        border-bottom: 3px dashed #d8d8d8;
      }
      .item {
        display: flex;
        .title {
          width: px(80);
          text-align: left;
        }
      }
    }
    .result-desc {
      margin: px(12) 0 px(37);
      font-size: px(14);
    }
    .btn {
      width: px(240);
      height: px(38);
      letter-spacing: px(10);
    }
  }
}
</style>
