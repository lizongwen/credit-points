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
    <div class="content-padded button-bottom" v-if="score >= 800">
      <button class="btn btn-block btn-deposit-halved btn-golden text-size">确认申请</button>
    </div>
    <div class="content-padded button-bottom" v-else>
      <button disabled class="btn btn-block btn-deposit-halved disabled-btn disabled-text">确认申请</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "deposit_halved",
  data() {
    return {
      score: 900
      // TODO
      // 模态框未做
    };
  },
  methods: {},
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
