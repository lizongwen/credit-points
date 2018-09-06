<template>
	<div class="micreloan">
		<div class="micreloan-slogan">
			<img src="../../img/finance/micreloan_slogan.png">
		</div>
		<ul class="micreloan-list">
			<li class="micreloan-item" v-for="(incentive,index) in incentives" :key="index">
				<div class="l-box">
					<img :src="require(`../../img/finance/micreloan-${index+1}.png`)">
					<div class="content">
						<p class="title">最高额度
							<span>{{incentive.incentivename.slice(4,-2)}}</span>万元</p>
						<p class="desc">乐惠分{{incentive.incentivescore}}以上</p>
					</div>
				</div>
				<div class="r-box">
					<button class="btn btn-golden" :class="{'btn-disabled':$store.state.finance.score<incentive.incentivescore||total>0}" :disabled="$store.state.finance.score<incentive.incentivescore||total>0" @click="apply(incentive.incentivename,incentive.id)">申请</button>
				</div>
			</li>
		</ul>
		<div class="score-tip">乐惠分
			<span class="score">{{$store.state.finance.score}}</span>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      total: "",
      incentives: []
    };
  },
  mounted() {
    this.getIncentive();
    this.getIsApply();
  },
  methods: {
    //获取子级激励措施
    getIncentive: async function() {
      let params = {
        method: "LHF5002",
        params: {
          incentiveId: this.$route.query.incentiveid
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result.length) {
          this.incentives = res.result;
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },

    //是否已申请
    getIsApply: async function() {
      let params = {
        method: "XYJR00008",
        params: {
          userid: this.$store.state.finance.userId,
          incentiveid: this.$route.query.incentiveid
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.total = res.result.total;
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    apply(val, id) {
      this.$router.push({
        path: "/finance/applyloan",
        query: {
          incentivename: val,
          venueid: this.$route.query.venueid,
          incentiveid: id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.micreloan {
  height: 100%;
  background: url("../../img/finance/micre_loan.jpg") no-repeat bottom;
  background-size: cover;
  overflow: hidden;
  .micreloan-slogan {
    width: px(205);
    margin: px(58) auto px(28);
  }
  .micreloan-list {
    .micreloan-item {
      display: flex;
      width: px(295);
      height: px(100);
      margin: 0 auto;
      &:not(:last-child) {
        margin-bottom: px(20);
      }
      .l-box {
        display: flex;
        position: relative;
        width: px(200);
        padding-left: px(10);
        border-top-left-radius: px(4);
        border-bottom-left-radius: px(4);
        background: #fff;
        background: radial-gradient(
              circle at top right,
              transparent px(10),
              #fff 0
            )
            top right,
          radial-gradient(circle at bottom right, transparent px(10), #fff 0)
            bottom right;
        background-size: 100% 50%;
        background-repeat: no-repeat;
        align-items: center;
        &::after {
          position: absolute;
          top: px(10);
          right: -1px;
          content: "";
          height: px(78);
          border: 1px dashed $bd-grey;
        }
        img {
          width: px(40);
          height: px(44);
        }
        .content {
          padding-left: px(10);
          font-size: px(12);
          line-height: px(22);
          .title {
            > span {
              font-size: px(24);
            }
          }
          .desc {
            color: $text-grey;
          }
        }
      }
      .r-box {
        display: flex;
        flex: 1;
        border-top-right-radius: px(4);
        border-bottom-right-radius: px(4);
        background: #fff;
        background: radial-gradient(
              circle at top left,
              transparent px(10),
              #fff 0
            )
            top right,
          radial-gradient(circle at bottom left, transparent px(10), #fff 0)
            bottom right;
        background-size: 100% 50%;
        background-repeat: no-repeat;
        justify-content: center;
        align-items: center;
        .btn {
          box-shadow: 0 2px 6px 0 #e4b641;
          &.btn-disabled {
            box-shadow: none;
          }
        }
      }
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

