/**
* author: 王蒙Sanm
* createTime: 2018/8/30
* description: 押金减半
**/
<template>
  <div class="deposit-halved">
    <div class="tooltip-text">
      <p>仅针对非易开出行会员</p>
    </div>
    <div class="content-padded button-bottom">
      <button class="btn btn-block btn-deposit-halved btn-golden text-size" @click="getIndexInfo">确认申请</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "deposit_halved",
  data() {
    return {
      // TODO
      // 模态框未做
    };
  },
  methods: {
    getIndexInfo: async function() {
      let params = {
        method: "XYX00002",
        params: {
          venueId: this.$store.state.travel.venueId,
          userId: this.$store.state.travel.userId,
          userName: this.$store.state.travel.userName,
          userIdCard: this.$store.state.travel.useridcard,
          userPhone: this.$store.state.travel.userPhone,
          userCreditScore: this.$store.state.travel.usercreditscore,
          incentiveId: this.$store.state.travel.incentiveId,
          incentiveName: this.$store.state.travel.incentiveName,
        }
      };

      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.$store.commit("travel/setStatus", 1);
        this.$router.push({
          name: 'application'
        });
      } else {
        Toast({
          message: res.resultMsg
        });
      }
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.deposit-halved {
  height: 100%;
  background: url("../../img/travel/banner3@3x.png") no-repeat bottom;
  background-size: cover;
  overflow: hidden;
  .tooltip-text {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: px(75);
    p {
      font-size: px(12);
      color: #ffffff;
    }
  }
  .button-bottom {
    width: 100%;
    position: fixed;
    bottom: px(20);
    .disable-btn {
      background-color: #D4D4D4;
    }
    .disabled-text {
      color: #9B9B9B;
      font-weight: bold;
    }
    .btn-deposit-halved {
      height: px(40);
      font-size: px(16);
    }
    .text-size {
      font-weight: bold;
    }
  }
}
</style>
