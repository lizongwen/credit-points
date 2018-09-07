<template>
	<div class="admin-info">
		<mt-navbar v-model="selected" class="border-b-1px">
			<mt-tab-item id="1">待审批</mt-tab-item>
			<mt-tab-item id="2">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1" class="unfinish-wrap">
				<mt-search class="search-wrap" v-model="searchValue1" cancel-text="取消" placeholder="输入姓名、身份证号" :show="true" :result="unfinishs" @keyup.enter.native="unfinishSearch">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder1" :auto-fill="false" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore1">
							<div class="order-list" :style="{'min-height':ordersHeight}">
								<div class="order-item border-b-1px" v-for="(order,index) in unfinishs" :key="index">
									<div class="order-item-content">
										<div class="order-avatar">
											<img src="../../img/travel/icon_yajinjianban@2x.png">
											<div class="text">押金减半</div>
										</div>
										<div class="order-detail">
											<div class="order-detail-item">
												<div class="key">申请人：</div>
												<div class="value">{{order.username}}</div>
											</div>
											<div class="order-detail-item">
												<div class="key">身份证号：</div>
												<div class="value">{{order.useridcard}}</div>
											</div>
											<div class="order-detail-item">
												<div class="key">申请时间：</div>
												<div class="value">{{order.applytime}}</div>
											</div>
										</div>
									</div>

									<div class="order-btn-box">
										<button class="btn btn-default btn-block" @click="showPop(order.id)">拒绝</button>
										<div class="gutter"></div>
										<button class="btn btn-green btn-block" @click="pass(order.id)">初次通过</button>
									</div>
								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="2" class="finish-wrap">
				<mt-search class="search-wrap" v-model="searchValue2" cancel-text="取消" placeholder="输入姓名、身份证号" :show="true" :result="finishs" @keyup.enter.native="finishSearch">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder2" :auto-fill="false" :bottom-method="loadBottom2" :bottom-all-loaded="allLoaded2" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore2">
							<div class="order-list" :style="{'min-height':ordersHeight}">
								<div class="order-item border-b-1px" v-for="(order,index) in finishs" :key="index">
									<div class="order-item-content">
										<div class="order-avatar">
											<img src="../../img/travel/icon_yajinjianban@2x.png">
											<div class="text">押金减半</div>
											<div :class="{'tip pass':order.operatestatus==1,'tip fail':order.operatestatus==2}">{{order.operatestatus==1?'通过':'拒绝'}}</div>
										</div>
										<div class="order-detail">
											<div class="order-detail-item">
												<div class="key">申请人：</div>
												<div class="value">{{order.username}}</div>
											</div>
											<div class="order-detail-item">
												<div class="key">身份证号：</div>
												<div class="value">{{order.useridcard}}</div>
											</div>
											<div class="order-detail-item">
												<div class="key">申请时间：</div>
												<div class="value">{{order.applytime}}</div>
											</div>
											<div class="order-detail-item" v-if="order.operatestatus==2">
												<div class="key">拒绝原因：</div>
												<div class="value">{{order.operatereason}}</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-popup v-model="isPopup" position="bottom" class="popup" :closeOnClickModal="false">
			<div class="popup-content">
				<div class="main">
					<div class="title border-b-1px">请选择拒绝审批的理由</div>
					<div class="reason border-b-1px" @click="refuse('非新用户')">非新用户</div>
				</div>
				<div class="bottom" @click="cancel">取消</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      ordersHeight: "",
      unfinishsPageNo: 1,
      finishsPageNo: 1,
      searchValue1: "",
      searchValue2: "",
      selected: "1",
      unfinishs: [],
      finishs: [],
      allLoaded1: false,
      allLoaded2: false,
      searchValue1: "",
      searchValue2: "",
      isPopup: false,
      handleId: "",
      slots: [
        {
          flex: 1,
          values: [
            {
              id: 4,
              label: "通过"
            },
            {
              id: 5,
              label: "未通过"
            }
          ],
          defaultIndex: 0,
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  mounted() {
    this.ordersHeight = (window.innerHeight - 96) / 20 + "rem";
    this.getOrder(1, this.unfinishsPageNo, this.searchValue1);
    this.getOrder(2, this.finishsPageNo, this.searchValue2);
  },
  methods: {
    //获取订单列表
    getOrder: async function(type, pageNo, searchValue) {
      let params = {
        method: "XYX00004",
        params: {
          type: type,
          searchText: searchValue || "",
          pageNo: pageNo,
          pageSize: 5
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (type == 1) {
        if (res.resultCode == "0000") {
          this.unfinishs = this.unfinishs.concat(res.result);
          if (res.result.length < 5) {
            this.allLoaded1 = true;
            return;
          }
          this.unfinishsPageNo++;
        } else {
          Toast({
            message: res.resultMsg,
            duration: 2000,
            position: "bottom"
          });
        }
      }
      if (type == 2) {
        if (res.resultCode == "0000") {
          this.finishs = this.finishs.concat(res.result);
          console.log(this.finishs);
          if (res.result.length < 5) {
            this.allLoaded2 = true;
            return;
          }

          this.finishsPageNo++;
        } else {
          Toast({
            message: res.resultMsg,
            duration: 2000,
            position: "bottom"
          });
        }
      }
    },
    //下拉更新
    updateOrder1() {
      this.unfinishs = [];
      this.searchValue1 = "";
      this.getOrder(1, 1, this.searchValue1);
      this.$refs.loadmore1.onTopLoaded();
    },
    //上拉加载
    loadBottom1() {
      this.getOrder(1, this.unfinishsPageNo, this.searchValue1);
      this.$refs.loadmore1.onBottomLoaded();
    },
    //下拉更新
    updateOrder2() {
      this.finishs = [];
      this.searchValue2 = "";
      this.getOrder(2, 1, this.searchValue2);
      this.$refs.loadmore2.onTopLoaded();
    },
    //上拉加载
    loadBottom2() {
      this.getOrder(2, this.finishsPageNo, this.searchValue2);
      this.$refs.loadmore2.onBottomLoaded();
    },

    //待审批搜索
    unfinishSearch() {
      this.unfinishsPageNo = 1;
      this.unfinishs = [];
      this.getOrder(1, this.unfinishsPageNo, this.searchValue1);
    },
    //已完成搜索
    finishSearch() {
      this.finishsPageNo = 1;
      this.finishs = [];
      this.getOrder(2, this.finishsPageNo, this.searchValue2);
    },
    //显示拒绝
    showPop(id) {
      this.isPopup = true;
      this.handleId = id;
    },
    //取消拒绝
    cancel() {
      this.isPopup = false;
    },
    //审批拒绝
    refuse: async function(text) {
      let params = {
        method: "XYX00005",
        params: {
          applyId: this.handleId,
          operateStatus: 2,
          operateReason: text
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.isPopup = false;
        this.unfinishsPageNo = 1;
        this.finishsPageNo = 1;
        this.unfinishs = [];
        this.finishs = [];
        this.getOrder(1, this.unfinishsPageNo, this.searchValue1);
        this.getOrder(2, this.finishsPageNo, this.searchValue2);
      }
    },
    //审批通过
    pass: async function(id) {
      let params = {
        method: "XYX00005",
        params: {
          applyId: id,
          operateStatus: 1,
          operateReason: ""
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.unfinishsPageNo = 1;
        this.finishsPageNo = 1;
        this.unfinishs = [];
        this.finishs = [];
        this.getOrder(1, this.unfinishsPageNo, this.searchValue1);
        this.getOrder(2, this.finishsPageNo, this.searchValue2);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.admin-info {
  height: 100%;
  .mint-navbar {
    .mint-tab-item {
      &.is-selected {
        border-bottom-color: #5da904;
        .mint-tab-item-label {
          color: #000;
        }
      }
    }
  }
  .order-list {
    overflow: auto;
    .order-item {
      position: relative;
      padding: px(10) 0;
      &:not(:last-child) {
        @include border-b-1px(#ebebeb);
      }
      .order-item-content {
        display: flex;
        .order-avatar {
          width: px(70);
          text-align: center;
          img {
            margin-top: px(10);
            margin-bottom: px(5);
            width: px(32);
		  }
		  .tip{
			  margin-top: px(5);
			  display: inline-block;
			  padding:px(1) px(9);
			  font-size: px(12);
			  border-radius: px(4);
		  }
		  .pass{
			  background: rgba(164,231,86,0.2)
		  }
		  .fail{
			   background: rgba(255,112,112,0.2)
		  }
        }
        .order-detail {
          flex: 1;
          line-height: px(24);
          padding-left: px(10);
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
            .value {
              flex: 1;
            }
          }
        }
      }

      .order-btn-box {
        margin-top: px(10);
        display: flex;
        justify-content: space-around;
        .gutter {
          width: px(15);
        }
        .btn-default {
          border-color: $bd-grey;
        }
      }
    }
  }
  .search-wrap {
    height: calc(100vh - #{px(52)});
    .mint-searchbar {
      background: #fff;
      margin: px(4) px(10);
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
    height: 100%;
    overflow: scroll;
  }
  .popup {
    width: 100%;
    background: transparent;
    .popup-content {
      text-align: center;
      .main {
        background: #fff;
        > div {
          padding: 15px 0;
          &:not(:last-child) {
            @include border-b-1px(#ebebeb);
          }
        }
        .title {
          color: $text-grey;
        }
        .reason {
          font-size: px(16);
        }
      }
      .bottom {
        padding: 15px 0;
        margin-top: px(10);
        font-size: px(16);
        background: #fff;
      }
    }
  }
}
</style>
