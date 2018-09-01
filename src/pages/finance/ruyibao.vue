<template>
	<div class="ruyibao">
		<div class="diamond">
			<img src="../../img/finance/diamond.png">
		</div>
		<div class="title">
			<img src="../../img/finance/ruyibao_text.png">
		</div>
		<div class="desc-box">
			<div class="desc-box-li">
				<img class="zan" src="../../img/finance/dianzan.png">
				<img class="text" src="../../img/finance/ttsy.png">
			</div>
			<div class="desc-box-li">
				<img class="zan" src="../../img/finance/dianzan.png">
				<img class="text" src="../../img/finance/rrfl.png">
			</div>
			<div class="desc-box-li">
				<img class="zan" src="../../img/finance/dianzan.png">
				<img class="text" src="../../img/finance/sysq.png">
			</div>
		</div>
		<div class="tip"><img src="../../img/finance/touzi_tip.png"></div>
		<div class="remark"><img src="../../img/finance/remark@3x.png"></div>
		<div class="content-padded">
			<button class="btn btn-block btn-large btn-golden" @click="submit">确认申请</button>
		</div>
		<div class="score-tip">乐惠分
			<span class="score">{{$store.state.finance.score}}</span>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    submit: async function() {
      let params = {
        method: "XYJR00009",
        params: {
          userid: this.$store.state.finance.userId,
          username: this.$store.state.finance.userName,
          userphone: this.$store.state.finance.userPhone,
          useridcard: this.$store.state.finance.useridcard,
          usercreditscore: this.$store.state.finance.score,
          incentivename: this.$route.query.incentivename,
          incentiveid: this.$route.query.incentiveid,
          venueid: this.$route.query.venueid
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      let url =
        "https://www.mszxyh.com/wapserver/outer/index.html?ChannelId=mszx02489&amp;seq=DZZH_20180807136949&Page=ryb";
      location.href = url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.ruyibao {
  height: 100%;
  background: url("../../img/finance/ruyibao_bg.png") no-repeat bottom;
  background-size: cover;
  overflow: hidden;
  .diamond {
    width: px(100);
    margin: px(86) auto px(15);
  }
  .title {
    width: px(172);
    margin: 0 auto px(35);
  }
  .desc-box {
    margin: 0 auto;
    text-align: center;
    .desc-box-li {
      &:not(:last-child) {
        margin-bottom: px(15);
      }
      .zan {
        width: px(20);
      }
      .text {
        width: px(96);
        margin-left: px(13);
      }
    }
  }
  .tip {
    margin-top: px(25);
    text-align: center;
    img {
      width: px(72);
    }
  }
  .remark {
    margin-top: px(25);
    margin-bottom: px(44);
    text-align: center;
    img {
      width: px(180);
    }
  }
  .score-tip {
    position: absolute;
    width: px(82);
    height: px(26);
    right: 0;
    top: px(15);
    padding: px(4) px(0) px(4) px(10);
    border-radius: px(13) 0 0 px(13);
    font-size: px(12);
    background-image: linear-gradient(-121deg, #fff551 3%, #d7c30e 100%);
    .score {
      font-size: px(14);
      vertical-align: px(-1);
    }
  }
}
</style>
