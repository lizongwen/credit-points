<template>
	<div class="index">
		<!--header-->
		<div class="banner">安全·便捷</div>
		<div class="index-box">
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
				<img src="../../img/travel/icon_fenshizulin@3x.png">
				</div>
				<p>分时租赁</p>
			</div>
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
				<img src="../../img/travel/icon_wangyueche@3x.png">
				</div>
				<p>网约车</p>
			</div>
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
				<img src="../../img/travel/icon_danche@3x.png">
				</div>
				<p>共享单车</p>
			</div>
		</div>
		<div class="content-padded travel-list">
			<div class="card" v-for="(car,index) in cars" :key="index">
				<div class="card-head">
					<div class="card-head-title card-head-title-bd-green">{{car.travelname}}</div>
					<div class="card-head-small-title">{{car.description}}</div>
				</div>
				<div class="card-body">
					<img :src="car.imagelink">
				</div>
				<div class="card-foot">
					<div class="travel-wrap">
						<div class="item" v-for="(incentive,index) in car.incentives" :key="index">
							<img v-if="$store.state.travel.score>=incentive.incentivescore" :src="incentive.thumbnailsmailimg" @click="go(incentive,car.id)">
							<img v-else :src="incentive.thumbnailsmailimg" :style="{'-webkit-filter':'saturate(0%) brightness(100%)'}">
							<p class="name">{{incentive.incentivename}}</p>
							<p class="score">乐惠分{{incentive.incentivescore}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tips" id="running" @click="toApplicationList">
			<div class="tips-number">+{{total}}</div>
			<div class="tips-desc">进行中</div>
		</div>
		<div class="score-tip" v-if="adminFlag" @click="goAdminPage">
			<img src="../../img/travel/icon_guanliyuan.png">
			<span class="score">管理员</span>
		</div>
	</div>
</template>

<script>
import utils from "@/js/utils";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      total: 0,
      adminFlag: false,
      score: 0,
      cars: []
    };
  },
  mounted() {
    if (window.getShareData) {
      window.getShareData.ClearHistory("true");
      window.getShareData.showTitleBar("true");
    }
    utils.dragBall("running");
    this.$store.commit("travel/setUserId", this.$route.query.userId);
    this.$store.commit("travel/setScore", this.$route.query.score);
    this.$store.commit("travel/setUseridcard", this.$route.query.idcard);
    this.checkIsAdmin();
    this.getOrderTotal();
    this.getUserInfo();
    this.getIndexInfo();
  },
  methods: {
    // 检查是否是管理员
    checkIsAdmin: async function() {
      let params = {
        idcard: this.$store.state.travel.useridcard
      };
      const res = await this.$http.getUser(
        this.$ctx+"/common/admin/checkIsAdmin",
        params
      );
      if (res.resultCode == "0000") {
        this.adminFlag = true;
      }
    },
    //获取用户信息
    getUserInfo: async function() {
      let params = {
        idcard: this.$store.state.travel.useridcard
      };
      const res = await this.$http.getUser(
        this.$ctx+"/common/user/getUserInfoByIdcard",
        params
      );
      if (res) {
        this.$store.commit("travel/setUserName", res.username);
        this.$store.commit("travel/setUserPhone", res.userphone);
      }
    },
    toApplicationList() {
      this.$router.push({
        name: "application_list"
      });
    },
    go(data,id) {
      this.$store.commit("travel/setIncentiveId", data.id);
      this.$store.commit("travel/setIncentiveName", data.incentivename);
      this.$store.commit("travel/setUsercreditscore", data.incentivescore);
      this.$store.commit("travel/setVenueId", id);
      this.$router.push({
        name: "deposit_halved"
      });
    },
    goAdminPage() {
      this.$router.push({
        name: "approval"
      });
    },
    //获取进行中的申请
    getOrderTotal: async function() {
      let params = {
        method: "XYX00001",
        params: {
          userId: this.$store.state.travel.userId
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.total = res.result;
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //獲取首頁
    getIndexInfo: async function() {
      let params = {
        method: "XYX00008",
        params: {}
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.cars = res.result;
      }
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
    display: flex;
    height: px(160);
    font-size: px(24);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.6);
    padding-top: px(42);
    justify-content: center;
    background: url("../../img/travel/banner1@2x.jpg") no-repeat center;
    background-size: cover;
    color: $text-white;
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
  .travel-list {
    height: px(233);
    .travel-wrap {
      margin-top: px(15);
      margin-bottom: px(3);
      display: flex;
      .item {
        padding: 0 px(20);
        text-align: center;
        > img {
          width: px(31);
          height: px(35);
        }
        .name {
          margin-top: px(6);
          font-size: px(14);
          line-height: px(14);
          color: #4a4a4a;
        }
        .score {
          display: inline-block;
          margin-top: px(6);
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
  .score-tip {
    position: absolute;
    width: px(82);
    height: px(26);
    right: 0;
    top: px(15);
    padding: px(4) px(0) px(4) px(10);
    border-radius: px(13) 0 0 px(13);
    font-size: px(12);
    > img {
      width: px(20);
      margin: 0 auto;
    }
    background-image: linear-gradient(-121deg, #fff551 3%, #fde728 100%);
    .score {
      font-size: px(12);
      vertical-align: px(-1);
    }
  }
}
</style>

