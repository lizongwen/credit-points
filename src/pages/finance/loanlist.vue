<template>
	<div class="loan-list">
		<mt-navbar v-model="selected" class="border-b-1px">
			<mt-tab-item id="1">进行中</mt-tab-item>
			<mt-tab-item id="2">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1" class="unfinish-wrap">
				<div class="content-padded">
					<div class="order-list" :style="{'min-height':ordersHeight}">
						<div class="order-item border-b-1px" v-for="(unfinish,index) in unfinishs" :key="index">
							<div class="order-avatar">
								<img src="../../img/finance/xwd@3x.png" />
							</div>
							<div class="order-detail">
								<div class="order-detail-item">
									<div class="key">申请人：</div>
									<div class="value">{{unfinish.username}}</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请时间：</div>
									<div class="value">{{unfinish.applystarttime}}</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请产品：</div>
									<div class="value">{{unfinish.incentivenames}}</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请状态：</div>
									<div class="value">{{unfinish.operatestatus | formatStatus}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2" class="finish-wrap">
				<div class="content-padded">
					<mt-loadmore :top-method="updateOrder" :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore">
						<div class="order-list" :style="{'min-height':ordersHeight}">
							<div class="order-item border-b-1px" v-for="(finish,index) in finishs" :key="index">
								<div class="order-avatar">
									<img src="../../img/finance/micreloan-1.png" />
								</div>
								<div class="order-detail">
									<div class="order-detail-item">
										<div class="key">申请人：</div>
										<div class="value">{{finish.username}}</div>
									</div>
									<div class="order-detail-item">
										<div class="key">申请时间：</div>
										<div class="value">{{finish.applystarttime}}</div>
									</div>
									<div class="order-detail-item">
										<div class="key">申请产品：</div>
										<div class="value">{{finish.incentivenames}}</div>
									</div>
									<div class="order-detail-item" v-if="finish.incentivenames!='信用卡申请'&&finish.incentivenames!='如意宝'">
										<div class="key">申请状态：</div>
										<div class="value">{{finish.operatestatus | formatStatus}}</div>
									</div>
								</div>
							</div>
						</div>
					</mt-loadmore>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      selected: "1",
      pageNo: 1,
      unfinishs: [],
      finishs: [],
      ordersHeight: "",
      allLoaded: false
    };
  },
  mounted() {
    this.ordersHeight = (window.innerHeight - 52) / 20 + "rem";

    //获取未完成订单
    this.getOrderList(1, 1);
    // //获取已完成订单
    this.getOrderList(this.pageNo, 2);
  },
  filters: {
    formatStatus(val) {
      switch (val) {
        case "0":
          val = "申请中";
          break;
        case "1":
          val = "已受理";
          break;
        case "2":
          val = "初审通过";
          break;
        case "3":
          val = "初审未通过";
          break;
        case "4":
          val = "放款通过";
          break;
        case "5":
          val = "复核未通过";
          break;
        default:
          val = "";
          break;
      }
      return val;
    }
  },
  methods: {
    //获取订单数据
    getOrderList: async function(pageNo, status) {
      let params = {
        method: "XYJR00002",
        params: {
          userId: this.$store.state.finance.userId,
          type: status,
          pageNo: pageNo,
          pageSize: 10
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (status == 1) {
          if (res.result.list.length) {
            this.unfinishs = res.result.list;
          }
        } else if (status == 2) {
          if (res.result.list.length < 10) {
            this.allLoaded = true;
          }
          if (res.result.list.length) {
            this.finishs = this.finishs.concat(res.result.list);
            ++this.pageNo;
          }
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //下拉更新
    updateOrder() {
      this.finishs = [];
      this.getOrderList(1, 2);
      this.$refs.loadmore.onTopLoaded();
    },
    //上拉加载
    loadBottom() {
      this.getOrderList(this.pageNo, 2);
      this.$refs.loadmore.onBottomLoaded();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.loan-list {
  height: 100%;
  .order-list {
    overflow: auto;
    .order-item {
      position: relative;
      display: flex;
      padding: 0.5rem 0;
      &:not(:last-child) {
        @include border-b-1px(#ebebeb);
      }
      .order-avatar {
        width: px(70);
        margin-top: px(18);
        text-align: center;
        img {
          width: px(40);
          height: px(44);
        }
      }
      .order-detail {
        flex: 1;
        margin-top: px(13);
        line-height: px(24);
        .order-detail-item {
          display: flex;
          height: px(24);
          .key {
            width: px(70);
            text-align: justify;
            overflow: hidden;
            &:after {
              display: inline-block;
              width: 100%;
              content: "";
            }
          }
        }
      }
    }
  }
  .unfinish-wrap,
  .finish-wrap {
    height: calc(100vh - #{px(52)});
    .content-padded {
      height: 100%;
      overflow: scroll;
    }
  }
}
</style>

