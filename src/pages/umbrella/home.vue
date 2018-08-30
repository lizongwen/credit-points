<template>
	<div class="home">
		<div class="wrap">
			<img :src="borrowImg" @click="borrow">
			<span class="label">借 伞</span>
			<img src="../../img/umbrella/remand.png" style="margin-top:40px;" @click="remand">
			<span class="label">还 伞</span>
		</div>
		<div class="order-tip" @click="goRecord">记录</div>
	</div>
</template>

<script>
import borrowImg from "../../img/umbrella/borrow.png";
import unborrowImg from "../../img/umbrella/unborrow.png";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      borrowImg: borrowImg,
      isBorrow: true
    };
  },
  mounted() {
    if (window.getShareData) {
      window.getShareData.ClearHistory("true");
      window.getShareData.showTitleBar("true");
    }
    this.$store.commit("umbrella/setCode", this.$route.query.code);
    this.getWdbm();
    this.getUserInfo();
  },
  methods: {
    //获取网点编码
    getWdbm: async function() {
      let params = {
        code: this.$route.query.wdbm,
        type: "xyqUser"
      };
      const res = await this.$http.getUser(
        "/h5web/credit/common/venue/getWdbmByCode",
        params
      );
      if (res) {
        this.$store.commit("umbrella/setVenueId", res);
      }
    },
    //获取用户信息
    getUserInfo: async function() {
      let params = {
        code: this.$store.state.umbrella.code,
        type: "xyqUser"
      };
      const res = await this.$http.getUser(
        "/h5web/credit/common/user/getUserInfoByCode",
        // "/qtweb/credit/common/user/getUserInfoByCode",
        params
      );
      this.$store.commit("umbrella/setUserId", res.userid);
      this.$store.commit("umbrella/setUserName", res.username);
      this.$store.commit("umbrella/setUserPhone", res.userphone);
      this.$store.commit("umbrella/setUseridcard", res.useridcard);
      this.$store.commit("umbrella/setCreditScore", res.creditScore);
      //请求借伞状态
      this.checkBorrow();
    },
    checkBorrow: async function() {
      let params = {
        method: "XYQ00006",
        params: {
          userId: this.$store.state.umbrella.userId
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result > 0) {
          this.$store.state.umbrella.isBorrow = true;
          this.borrowImg = unborrowImg;
        } else {
          this.$store.state.umbrella.isBorrow = false;
          this.borrowImg = borrowImg;
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //借伞
    borrow() {
      if (this.$store.state.umbrella.isBorrow) {
        return;
      }
      this.$router.push("./borrow");
    },
    //还伞
    remand() {
      this.$router.push("./remand");
    },
    //记录
    goRecord() {
      this.$router.push("./record");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/variable";
.home {
  position: relative;
  height: 100%;
  background: url("../../img/umbrella/home_bg@3x.png") no-repeat center;
  background-size: cover;
  text-align: center;
  .wrap {
    position: absolute;
    width: 100%;
    top: 40%;
    img {
      width: px(102);
      height: px(102);
      margin: 0 auto;
      display: block;
      margin-bottom: px(12);
    }
    .label {
      font-size: px(18);
      color: $text-white;
    }
  }
  .order-tip {
    position: absolute;
    width: px(67);
    height: px(26);
    right: 0;
    top: px(15);
    padding: px(3) px(10) px(3) px(0);
    border-radius: px(13) 0 0 px(13);
    font-size: px(14);
    color: $text-white;
    text-align: right;
    background: url("../../img/umbrella/record@3x.png") no-repeat px(10)
        center/px(11) px(9),
      linear-gradient(to right, #f7ca6b, #fba072);
  }
}
</style>
