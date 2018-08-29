<template>
	<div class="remand">
		<div v-show="ok" class="">
			<div class="banner">用信用撑起一米晴天</div>
			<div class="remand-box">
				<div @click="remand">
					<img :src="remandImg">
					<p>自己还伞</p>
				</div>
				<div @click="remandOther">
					<img src="../../img/umbrella/remand_2.png">
					<p>替人还伞</p>
				</div>
				<div class="split"></div>
			</div>
		</div>

		<div v-show="!ok" class="result">
			<img class="result-img" src="../../img/umbrella/result_success@3x.png" alt="" srcset="">
			<div class="result-desc">
				成功还伞
			</div>
			<button class="btn btn-default-primary btn-large" @click="comment">评价</button>
			<button class="btn btn-default btn-large" @click="fallback">返回</button>
		</div>
	</div>
</template>

<script>
import remandImg from "../../img/umbrella/remand.png";
import unremandImg from "../../img/umbrella/unremand.png";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      ok: true,
      remandImg: "",
      applyid: "",
      recordCode: ""
    };
  },
  mounted() {
    if (this.$store.state.umbrella.isBorrow) {
      this.remandImg = remandImg;
    } else {
      this.remandImg = unremandImg;
    }
  },
  methods: {
    remand: async function() {
      if (!this.$store.state.umbrella.isBorrow) {
        return;
      }
      let params = {
        method: "XYQ00003",
        params: {
          userid: this.$store.state.umbrella.userId
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.applyid = res.result.id;
        this.recordCode = res.result.recordCode;
        this.ok = false;
        this.$store.commit("umbrella/changeBorrow", false);
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //替人还伞
    remandOther() {
      this.$router.push("./remandform");
    },
    //评价
    comment() {
      this.$router.push({
        path: "./comment",
        query: {
          applyId: this.applyid,
          recordCode: this.recordCode
        }
      });
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
@import "../../style/variable";
.remand {
  height: 100%;
  .banner {
    display: flex;
    height: px(160);
    font-size: px(24);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
    background: url("../../img/umbrella/banner_record@3x.png") no-repeat center;
    background-size: cover;
    color: $text-white;
  }
  .remand-box {
    position: relative;
    width: px(300);
    height: px(90);
    margin: px(20) auto 0;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      img {
        width: px(34);
        height: px(34);
        margin: px(14) 0 px(4);
      }
    }
    .split {
      position: absolute;
      width: px(2);
      height: px(54);
      background: #ebebeb;
      top: px(14);
      left: px(150);
    }
  }
  .result {
    margin-top: px(50);
    text-align: center;
    .result-img {
      width: px(85);
      height: px(85);
    }
    .result-desc {
      margin: px(12) 0 px(37);
      font-size: px(18);
    }
    .btn {
      width: px(240);
      height: px(38);
      letter-spacing: px(10);
      + .btn {
        margin-top: px(15);
      }
    }
  }
}
</style>
