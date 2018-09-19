/** 
* 易出行首页  
*/
<template>
	<div class="index">
		<div class="banner">
			<div class="admin-flag" v-if="adminFlag" @click="goAdminPage">管理员</div>
		</div>
		<div class="index-box">
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
					<img src="../../img/finance/pig@3x.png">
				</div>
				<p>信理财</p>
			</div>
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
					<img src="../../img/finance/card@3x.png">
				</div>
				<p>信易申</p>
			</div>
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
					<img src="../../img/finance/money@3x.png">
				</div>
				<p>信易贷</p>
			</div>
		</div>
		<div class="content-padded finance-list">
			<div class="card" v-for="(bank,index) in banks" :key="index">
				<div class="card-head">
					<div class="card-head-title card-head-title-bd-blue">{{bank.travelname}}</div>
					<div class="card-head-small-title">{{bank.description}}</div>
				</div>
				<div class="card-body">
					<img src="../../img/finance/ms_bank@2x.jpg">
				</div>
				<div class="card-foot">
					<div class="finance-wrap">
						<div class="item" v-for="(incentive,index) in bank.incentives" :key="index">
							<img v-if="$store.state.finance.score>=incentive.incentivescore" :src="require(`../../img/finance/${bank.sitecode}-${index}.png`)" @click="go(incentive,bank.id)">
							<img v-else :src="require(`../../img/finance/${bank.sitecode}-${index}_grey.png`)">
							<p class="name">{{incentive.incentivename}}</p>
							<p class="score">乐惠分{{incentive.incentivescore}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tips" id="running" @click="goApplyList">
			<div class="tips-number">+{{total}}</div>
			<div class="tips-desc">进行中</div>
		</div>
	</div>
</template>

<script>
import utils from "@/js/utils";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      adminFlag: false,
      total: 0,
      banks: [],
    };
  },
  mounted() {
    if (sessionStorage.getItem("financeState") != null) {
      sessionStorage.removeItem("financeState");
    }
    this.$store.commit("finance/setUserId", this.$route.query.userId);
    this.$store.commit("finance/setScore", this.$route.query.score);
    this.$store.commit("finance/setUseridcard", this.$route.query.idcard);
    utils.dragBall("running");
    this.checkIsAdmin();
    this.getUserInfo();
    this.getOrderTotal();
    this.getNetDot();
  },
  methods: {
    // 检查是否是管理员
    checkIsAdmin: async function() {
      let params = {
        idcard: this.$route.query.idcard
      };
      const res = await this.$http.getUser(
        "/credit/common/admin/checkIsAdmin",
        params
      );
      if (res.resultCode == "0000") {
        this.adminFlag = true;
      }
    },
    //获取用户信息
    getUserInfo: async function() {
      let params = {
        idcard: this.$route.query.idcard
      };
      const res = await this.$http.getUser(
        "/credit/common/user/getUserInfoByIdcard",
        params
      );
      if (res) {
        this.$store.commit("finance/setUserName", res.username);
        this.$store.commit("finance/setUserPhone", res.userphone);
      }
    },
    //获取进行中的申请
    getOrderTotal: async function() {
      let params = {
        method: "XYJR00006",
        params: {
          userId: this.$store.state.finance.userId
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
    //获取网点
    getNetDot: async function() {
      let params = {
        method: "XYJR00007",
        params: {}
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result.length) {
          this.banks = res.result;
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },

    go(obj, id) {
      let url = obj.incentiveurl;
      this.$router.push({
        path: url,
        query: {
          incentiveid: obj.id,
          incentivename: obj.incentivename,
          venueid: id
        }
      });
    },
    goApplyList() {
      this.$router.push({
        path: "/finance/loanlist"
      });
    },
    goAdminPage() {
      this.$router.push({
        path: "/finance/admin/list"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.index {
  height: 100%;
  background: $bg-grey;
  .banner {
    position: relative;
    display: flex;
    height: px(160);
    background: url("../../img/finance/banner@2x.jpg") no-repeat center;
    background-size: cover;
    .admin-flag {
      font-size: px(14);
      position: absolute;
      right: 0;
      top: px(16);
      background: #fde728;
      padding: px(3) px(5) px(3) px(10);
      border-radius: 0.65rem 0 0 0.65rem;
    }
  }
  .index-box {
    position: relative;
    display: flex;
    width: px(275);
    height: px(75);
    margin: px(-38) auto px(30) auto;
    padding: px(5);
    border-radius: px(4);
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .index-box-item {
      flex: 1;
      text-align: center;
      &:not(:last-child) {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          top: px(6);
          right: 0;
          width: px(2);
          height: px(54);
          background: $bd-grey;
        }
      }
      .index-box_item_imgwrap {
        display: flex;
        height: px(27);
        margin-top: px(8);
        margin-bottom: px(5);
        align-items: center;
        justify-content: center;
        > img {
          height: 100%;
        }
      }
    }
  }
  .finance-list {
    .finance-wrap {
      margin-top: px(15);
      margin-bottom: px(3);
      display: flex;
      .item {
        flex: 1;
        text-align: center;
        > img {
          width: px(33);
        }
        .name {
          margin-top: px(2);
        }
        .score {
          display: inline-block;
          padding: 0 px(3);
          font-size: px(9);
          transform: scale(0.75);
          background: #ffe4e4;
          color: #ff7070;
        }
      }
    }
  }
  .tips {
    width: px(80);
    height: px(80);
    background: url("../../img/finance/icon_yellow.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    right: 4px;
    bottom: 10px;
    color: #ffffff;
    text-align: center;
    padding-top: 18px;
    .tips-number {
      font-size: px(22);
      line-height: px(24);
    }
    .tips-desc {
      font-size: px(14);
    }
  }
}
</style>

