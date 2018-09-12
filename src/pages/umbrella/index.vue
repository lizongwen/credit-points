<template>
	<div class="index">
		<div class="banner">用信用撑起一米晴天</div>
		<div class="content-padded">
			<button class="btn btn-primary btn-block btn-large" @click="scan">开始扫码</button>
			<div class="h10"></div>
			<button class="btn btn-default-primary btn-block btn-large" @click="showDot">查看网点</button>
			<div class="scaner-desc">乐惠分已经开通市民免费借用信用伞功能，您可以通过扫描伞架上的二维码进入，享受本项守信激励措施！</div>
		</div>
		<div class="tab-wrap">
			<mt-navbar v-model="selected" class="border-b-1px">
				<mt-tab-item id="1">进行中</mt-tab-item>
				<mt-tab-item id="2">已完成</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<order-list :hasbtn="false" :orders="finish"></order-list>
				</mt-tab-container-item>
				<mt-tab-container-item id="2" class="unfinish-wrap" :style="{height:ordersHeight}">
					<mt-loadmore :top-method="updateOrder" :bottom-method="loadBottom" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore" :bottom-all-loaded="allLoaded">
						<order-list :hasbtn="false" :orders="unfinish"></order-list>
					</mt-loadmore>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
import orderList from "@/components/umbrella/orderList.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      selected: "1",
      finish: [],
      unfinish: [],
      pageNo: 1,
      ordersHeight: "",
      allLoaded: false
    };
  },
  mounted() {
    if (window.getShareData) {
      window.getShareData.ClearHistory("true");
      window.getShareData.showTitleBar("true");
    }
    sessionStorage.removeItem("umbrellaCode");
    this.ordersHeight = (window.innerHeight - 53) / 20 + "rem";
    //获取未完成订单
    this.getOrderList(1, 1);
    //获取已完成订单
    this.getOrderList(this.pageNo, 3);
  },
  methods: {
    getOrderList: async function(pageNo, status) {
      let params = {
        method: "XYQ00008",
        params: {
          userId: this.$route.query.userId,
          status: status,
          pageNo: pageNo,
          pageSize: 10
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (status == 1) {
          this.finish = res.result;
        } else if (status == 3) {
          if (res.result.length < 10) {
            this.allLoaded = true;
          }
          this.unfinish = this.unfinish.concat(res.result);
          ++this.pageNo;
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //扫码
    scan() {
      location.href = "citytoken://openvc?vcname=capture";
      //this.$router.push("./umbrella/home");
    },
    //显示网点
    showDot() {
      this.$router.push("./umbrella/netdot");
    },
    //下拉更新
    updateOrder() {
      this.unfinish = [];
      this.getOrderList(1, 3);
      this.$refs.loadmore.onTopLoaded();
    },
    //上拉加载
    loadBottom() {
      this.getOrderList(this.pageNo, 3);
      this.$refs.loadmore.onBottomLoaded();
    }
  },
  components: {
    "order-list": orderList
  }
};
</script>

<style lang="scss">
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.index {
  height: 100%;
  .banner {
    display: flex;
    height: px(160);
    font-size: px(24);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
    background: url("../../img/umbrella/banner@3x.jpg") no-repeat center;
    background-size: cover;
    color: $text-white;
  }
  .content-padded {
    height: px(193);
    padding-top: px(15);
    padding-bottom: px(15);
    background-color: $bg-grey;
    .h10 {
      height: 10px;
    }
    .scaner-desc {
      margin-top: px(10);
      font-size: px(12);
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .tab-wrap {
    .unfinish-wrap {
      overflow: auto;
    }
  }
}
</style>


