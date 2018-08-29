<template>
	<div class="loan-list">
		<mt-navbar v-model="selected" class="border-b-1px">
			<mt-tab-item id="1">进行中</mt-tab-item>
			<mt-tab-item id="2">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="order-list">
					<div class="order-item border-b-1px">
						<div class="order-avatar">
							<img src="../../img/finance/xwd@3x.png" />
						</div>
						<div class="order-detail">
							<div class="order-detail-item">
								<div class="key">申请人：</div>
								<div class="value">马冬梅</div>
							</div>
							<div class="order-detail-item">
								<div class="key">申请时间：</div>
								<div class="value">2018-12-05</div>
							</div>
							<div class="order-detail-item">
								<div class="key">申请产品：</div>
								<div class="value">申请100万贷款</div>
							</div>
							<div class="order-detail-item">
								<div class="key">申请状态：</div>
								<div class="value">未受理</div>
							</div>
						</div>
					</div>
					<div class="order-item border-b-1px">
						<div class="order-avatar">
							<img src="../../img/finance/xwd@3x.png" />
						</div>
						<div class="order-detail">
							<div class="order-detail-item">
								<div class="key">申请人：</div>
								<div class="value">马冬梅</div>
							</div>
							<div class="order-detail-item">
								<div class="key">申请时间：</div>
								<div class="value">2018-12-05</div>
							</div>
							<div class="order-detail-item">
								<div class="key">申请产品：</div>
								<div class="value">申请100万贷款</div>
							</div>
							<div class="order-detail-item">
								<div class="key">申请状态：</div>
								<div class="value">未受理</div>
							</div>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2" class="finish-wrap" :style="{height:ordersHeight}">
				<mt-loadmore :top-method="updateOrder" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore">
					<div class="order-list">
						<div class="order-item border-b-1px">
							<div class="order-avatar">
								<img src="../../img/finance/micreloan-1.png" />
							</div>
							<div class="order-detail">
								<div class="order-detail-item">
									<div class="key">申请人：</div>
									<div class="value">马冬梅</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请时间：</div>
									<div class="value">2018-12-05</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请产品：</div>
									<div class="value">申请100万贷款</div>
								</div>
							</div>
						</div>
						<div class="order-item border-b-1px">
							<div class="order-avatar">
								<img src="../../img/finance/micreloan-1.png" />
							</div>
							<div class="order-detail">
								<div class="order-detail-item">
									<div class="key">申请人：</div>
									<div class="value">马冬梅</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请时间：</div>
									<div class="value">2018-12-05</div>
								</div>
								<div class="order-detail-item">
									<div class="key">申请产品：</div>
									<div class="value">申请100万贷款</div>
								</div>
							</div>
						</div>
					</div>
				</mt-loadmore>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
export default {
  data() {
    return {
      selected: "1",
      pageNo: 1,
      unfinish: [],
      finish: [],
      ordersHeight: "",
      allLoaded: false
    };
  },
  mounted() {
    this.ordersHeight = (window.innerHeight - 52) / 20 + "rem";
    //获取未完成订单
    this.getOrderList(1, 1);
    // //获取已完成订单
    // this.getOrderList(this.pageNo, 2);
  },
  methods: {
    //获取订单数据
    getOrderList: async function(pageNo, status) {
      let params = {
        method: "XYQ00008",
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
    //下拉更新
    updateOrder() {
      this.unfinish = [];
    //  this.getOrderList(1, 3);
      this.$refs.loadmore.onTopLoaded();
    },
    //上拉加载
    loadBottom() {
      //this.getOrderList(this.pageNo, 3);
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
      height: px(123);
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
  .finish-wrap{
	   overflow: auto;
  }
}
</style>

