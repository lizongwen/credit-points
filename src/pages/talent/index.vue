<template>
	<div class="index">
		<div class="banner">高效·便捷</div>
		<div class="index-box">
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
					<img src="../../img/talent/ll@2x.png">
				</div>
				<p>信用履历</p>
			</div>
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
					<img src="../../img/talent/ydy@2x.png">
				</div>
				<p>一对一服务</p>
			</div>
			<div class="index-box-item">
				<div class="index-box_item_imgwrap">
					<img src="../../img/talent/mfzt@2x.png">
				</div>
				<p>免费展台</p>
			</div>
		</div>
		<div class="content-padded talent-list">
			<div class="card" v-for="(netDot,index) in netDots" :key="index">
				<div class="card-head">
					<div class="card-head-title card-head-title-bd-blue">{{netDot.travelname}}</div>
				</div>
				<div class="card-body">
					<img :src="netDot.imagelink">
				</div>
				<div class="card-foot">
					<div class="talent-wrap">
						<div class="item" v-for="(incentive,index) in netDot.incentives" :key="index">
							<img v-if="$store.state.talent.score>=incentive.incentivescore" :src="incentive.thumbnailsmailimg" @click="isComment(incentive,netDot.id)">
							<img v-else :src="incentive.thumbnailsmailimg" :style="{'-webkit-filter':'saturate(0%) brightness(125%)'}">
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
		<mt-popup class="popup" v-model="popupVisible">
			<div class="top-popup border-b-1px">
				<div class="desc text-center">请完成您上次申请服务<br/>的评价操作</div>
				<div class="model">
					<img src="../../img/talent/ydy@2x.png" />
					<p>一对一服务</p>
				</div>
			</div>
			<div class="bottom-popup">
				<div class="item" @click="cancel">取消</div>
				<div class="split"></div>
				<div class="item" @click="esure">确认</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import utils from "@/js/utils";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      total: 0,
      popupVisible: false,
      netDots: [],
      applyid: "",
      recordCode: "",
      applytime: "",
      incentivename: ""
    };
  },
  mounted() {
    if (window.getShareData) {
      window.getShareData.ClearHistory("true");
      window.getShareData.showTitleBar("true");
    }
    utils.dragBall("running");
    this.$store.commit("talent/setUserId", this.$route.query.userId);
    this.$store.commit("talent/setScore", this.$route.query.score);
    this.$store.commit("talent/setIdcard", this.$route.query.idcard);
    this.getUserInfo();
    this.getOrderTotal();
    this.getNetDot();
  },
  methods: {
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
        this.$store.commit("talent/setUserName", res.username);
        this.$store.commit("talent/setUserPhone", res.userphone);
      }
    },
    //获取进行中的申请
    getOrderTotal: async function() {
      let params = {
        method: "XYRC00001",
        params: {
          userId: this.$store.state.talent.userId
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
    //判断用户是否评价
    isComment: async function(obj, id) {
      let params = {
        method: "XYRC00006",
        params: {
          userId: this.$store.state.talent.userId,
          incentiveId: obj.id
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result) {
          this.popupVisible = true;
          this.applyid = res.result.id;
          this.recordCode = res.result.recordcode;
          this.applytime = res.result.applytime;
          this.incentivename = res.result.incentivename;
        } else {
          this.go(obj, id);
        }
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
        method: "XYRC00003",
        params: {}
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result.length) {
          this.netDots = res.result;
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //跳转一对一申请页
    go(obj, id) {
      this.$router.push({
        path: "/talent/apply",
        query: {
          incentiveid: obj.id,
          incentivename: obj.incentivename,
          venueid: id
        }
      });
    },
    //跳转进行中列表
    goApplyList() {
      this.$router.push({
        path: "/talent/list"
      });
    },
    //取消弹出层
    cancel() {
      this.popupVisible = false;
    },
    //确认跳转评价页
    esure() {
      this.popupVisible = false;
      this.$router.push({
        path: "/talent/comment",
        query: {
          applyId: this.applyid,
          recordCode: this.recordCode,
          applytime: this.applytime,
          incentivename: this.incentivename
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
.index {
  height: 100%;
  background: $bg-grey;
  .banner {
    display: flex;
    font-size: px(24);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.6);
    position: relative;
    height: px(160);
    align-items: center;
    justify-content: center;
    background: url("../../img/talent/banner@2x.jpg") no-repeat center;
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
  .talent-list {
    .talent-wrap {
      margin-top: px(15);
      margin-bottom: px(3);
      display: flex;
      .item {
        padding: 0 px(20);
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
    background: url("../../img/talent/icon_yellow.png") no-repeat;
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
  .popup {
    width: px(245);
    .top-popup {
      height: px(186);
      @include border-b-1px(#ebebeb);
      .desc {
        margin-top: px(20);
        margin-bottom: px(28);
        font-size: px(16);
      }
      .model {
        text-align: center;
        > img {
          height: px(38);
        }
        > p {
          margin-top: px(12);
        }
      }
    }
    .bottom-popup {
      height: px(45);
      display: flex;
      align-items: center;
      .item {
        flex: 1;
        font-size: px(16);
        text-align: center;
        color: #1790ff;
      }
      .split {
        width: 1px;
        height: 100%;
        background: #ebebeb;
        @media (-webkit-min-device-pixel-ratio: 2),
          (min-device-pixel-ratio: 2) {
          transform: scaleX(0.5);
        }
        @media (-webkit-min-device-pixel-ratio: 1.5),
          (min-device-pixel-ratio: 1.5) {
          transform: scaleX(0.7);
        }
      }
    }
  }
}
</style>
