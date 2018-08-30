<template>
	<div class="admin-list">
		<mt-navbar v-model="selected" class="border-b-1px">
			<mt-tab-item id="1">待确认</mt-tab-item>
			<mt-tab-item id="2">已受理</mt-tab-item>
			<mt-tab-item id="3">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1" class="unsure-wrap">
				<mt-search class="search-wrap" v-model="searchValue1" cancel-text="取消" placeholder="输入姓名或服务编号" :show="true" :result="unsureRes" @keyup.enter.native="testsearch">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder1" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore1">
							<div class="order-list">
								<div class="order-item border-b-1px" v-for="(order,index) in unsureRes" :key="index">
									<div class="order-detail">
										<div class="order-detail-item">
											<div class="key">申请人：</div>
											<div class="value">{{order.username}}</div>
										</div>
										<div class="order-detail-item">
											<div class="key">联系电话：</div>
											<div class="value">{{order.userphone}}</div>
										</div>
										<div class="order-detail-item">
											<div class="key">身份证号：</div>
											<div class="value">{{order.useridcard}}</div>
										</div>
										<div class="order-detail-item">
											<div class="key">申请产品：</div>
											<div class="value">{{order.incentivenames}}</div>
										</div>
									</div>
									<div class="order-btn-wrap">
										<button class="btn btn-golden">受理</button>
									</div>
								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="2" class="accept-wrap">
				<mt-search class="search-wrap" v-model="searchValue2" cancel-text="取消" placeholder="输入姓名或服务编号" :show="false" :result="acceptRes">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder2" :bottom-method="loadBottom2" :bottom-all-loaded="allLoaded2" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore2">
							<div class="order-list">
								<div class="order-item border-b-1px" v-for="(order,index) in acceptRes" :key="index">
									<div class="order-detail">
										<div class="order-detail-item">
											<div class="key">申请人：</div>
											<div class="value">{{order.name}}</div>
										</div>
										<div class="order-detail-item">
											<div class="key">联系电话：</div>
											<div class="value">{{order.phone}}</div>
										</div>
										<div class="order-detail-item">
											<div class="key">身份证号：</div>
											<div class="value">{{order.card}}</div>
										</div>
										<div class="order-detail-item">
											<div class="key">申请产品：</div>
											<div class="value">{{order.type}}</div>
										</div>
									</div>
									<div class="order-btn-wrap">
										<button class="btn btn-golden">受理</button>
									</div>
								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
				<!-- <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
				</mt-search> -->
			</mt-tab-container-item>
			<mt-tab-container-item id="3" class="finish-wrap">
				<!-- <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
				</mt-search> -->
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
export default {
  data() {
    return {
      unsureResPageNo: 1,
      acceptResPageNo: 1,
      finishPageNo: 1,
      searchValue1: "",
      searchValue2: "",
      searchValue3: "",
      selected: "1",
      unsureRes: [],
      acceptRes: [],
      finishRes: [],
      //   ordersHeight: "",
      allLoaded1: false,
      allLoaded2: false,
      allLoaded3: false,
      searchValue1: "",
      searchValue2: "",
      searchValue3: ""
    };
  },
  mounted() {
    // this.ordersHeight = (window.innerHeight - 52) / 20 + "rem";
    this.acceptRes = [
      {
        name: "马冬梅",
        phone: "13989898989",
        card: "34022199605050000",
        type: "申请100万贷款"
      },
      {
        name: "张三",
        phone: "13989898989",
        card: "34022199605050000",
        type: "申请100万贷款"
      }
    ];
    this.getOrder(1, this.unsureResPageNo, this.searchValue1);
    // this.getOrder(2, this.acceptResPageNo, this.searchValue);
    // this.getOrder(3, this.finishPageNo, this.searchValue);
  },
  methods: {
    //获取订单列表
    getOrder: async function(type, pageNo, searchValue) {
      let params = {
        method: "XYJR00003",
        params: {
          type: type,
          searchText: searchValue || "",
          pageNo: pageNo,
          pageSize: 10
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (type == 1) {
        if (res.resultCode == "0000" && res.result.list.length) {
          this.unsureRes = res.result.list;
          if (res.result.list.length < 10) {
            this.allLoaded1 = true;
          }
          this.unsureResPageNo++;
        }
      }
      if (type == 2) {
      }
      if (type == 3) {
      }
      //   if (res.resultCode == "0000") {
      //     if (res.result.length) {
      //       this.banks = res.result;
      //     }
      //   } else {
      //     Toast({
      //       message: res.resultMsg,
      //       duration: 2000,
      //       position: "bottom"
      //     });
      //   }
    },

    //下拉更新
    updateOrder1() {
      this.unsureRes = [];
      this.searchValue1 = "";
      this.getOrder(1, 1, this.searchValue1);
      this.$refs.loadmore1.onTopLoaded();
    },
    //上拉加载
    loadBottom1() {
      //this.getOrderList(this.pageNo, 3);
      this.$refs.loadmore1.onBottomLoaded();
    },
    //下拉更新
    updateOrder2() {
      this.acceptRes = [];
      //  this.getOrderList(1, 3);
      this.$refs.loadmore2.onTopLoaded();
    },
    //上拉加载
    loadBottom2() {
      //this.getOrderList(this.pageNo, 3);
      this.$refs.loadmore2.onBottomLoaded();
    },
    //下拉更新
    updateOrder3() {
      this.finishRes = [];
      //  this.getOrderList(1, 3);
      this.$refs.loadmore3.onTopLoaded();
    },
    //上拉加载
    loadBottom3() {
      //this.getOrderList(this.pageNo, 3);
      this.$refs.loadmore3.onBottomLoaded();
    },
    testsearch() {
      this.unsureResPageNo = 1;
      this.getOrder(1, this.unsureResPageNo, this.searchValue1);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.admin-list {
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
      .order-btn-wrap {
        position: absolute;
        top: px(27);
        right: px(15);
      }
    }
  }
  .search-wrap {
    height: calc(100vh - #{px(52)});
    .mint-searchbar {
      background: #fff;
      margin: px(5) px(10);
      padding: px(3) 0;
      border: 1px solid $bd-grey;
      border-radius: px(4);
      .mint-searchbar-inner {
        .mintui-search {
          display: none;
        }
      }
      .mint-searchbar-cancel {
        margin-right: px(5);
      }
    }
    .mint-search-list {
      .mint-search-list-warp {
        height: 100%;
      }
    }
  }
  .content-padded {
    overflow: auto;
  }
}
</style>
