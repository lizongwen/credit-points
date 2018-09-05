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
    <!--分享弹出窗 begin-->
    <mt-popup class="sharePopup" v-model="popupVisible">
      <div class="top-popup">
        <div class="model">
          <img src="../../img/travel/Bitmap.png" />
        </div>
        <div class="title-tip">
          <p>小主</p>
          <p>请勿重复提交</p>
        </div>
      </div>
      <div class="bottom-popup">
        <img src="../../img/travel/Slice@2x.png" @click="hiddenShare"/>
      </div>
    </mt-popup>
    <!--分享弹出窗 end-->
  </div>
</template>
<script>
export default {
  name: "deposit_halved",
  data() {
    return {
      popupVisible: false
    };
  },
  methods: {
    hiddenShare(){
      this.popupVisible = false;
    },
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
      if (res.resultCode === "0000") {
        this.$store.commit("travel/setStatus", 1);
        this.$router.push({
          name: 'application'
        });
      } else {
        this.popupVisible = true;
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
  .mint-popup{
    border-radius: px(4);
  }
  .sharePopup{
    width: px(210);
    height: px(234);
    .top-popup{
      .model{
        img{
          display: block;
          margin-top: px(20);
          width: px(210);
          height: px(120.5);
        }
      }
      .title-tip{
        margin: 0 auto;
        margin-top: px(29.4);
        p{
          text-align: center;
          font-size: px(16);
        }
      }
    }
    .bottom-popup{
      background-color: rgba(0,0,0,0);
      img{
        margin-top: px(40);
        display: block;
        margin-left: px(91);
        width: px(28);
        height: px(28);
      }
    }
  }
}
</style>
