<template>
	<div class="admin-list">
		<mt-navbar v-model="selected" class="border-b-1px">
			<mt-tab-item id="1">待确认</mt-tab-item>
			<mt-tab-item id="2">已受理</mt-tab-item>
			<mt-tab-item id="3">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1" class="unsure-wrap">
				<mt-search class="search-wrap" v-model="searchValue1" cancel-text="取消" placeholder="输入姓名、电话号码或身份证号" :show="true" :result="unsureRes" @keyup.enter.native="unsureSearch">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder1" :auto-fill="false" :bottom-method="loadBottom1" :bottom-all-loaded="allLoaded1" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore1">
							<div class="order-list" :style="{'min-height':ordersHeight}">
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
										<button class="btn btn-golden btn-small" @click="accept(order.id)">受理</button>
									</div>
								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="2" class="accept-wrap">
				<mt-search class="search-wrap" v-model="searchValue2" cancel-text="取消" placeholder="输入姓名、电话号码或身份证号" :show="true" :result="acceptRes" @keyup.enter.native="acceptSearch">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder2" :auto-fill="false" :bottom-method="loadBottom2" :bottom-all-loaded="allLoaded2" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore2">
							<div class="order-list" :style="{'min-height':ordersHeight}">
								<div class="order-item border-b-1px" v-for="(order,index) in acceptRes" :key="index">
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
									<div class="order-btn-box">
										<button class="btn btn-default btn-block" @click="refuse(order.id)">拒绝</button>
										<div class="gutter"></div>
										<button class="btn btn-golden btn-block" @click="pass(order.id)">初次通过</button>
									</div>
								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="3" class="finish-wrap">
				<mt-search class="search-wrap" v-model="searchValue3" cancel-text="取消" placeholder="输入姓名、电话号码或身份证号" :show="true" :result="finishRes" @keyup.enter.native="finishSearch">
					<div class="content-padded">
						<mt-loadmore :top-method="updateOrder3" :auto-fill="false" :bottom-method="loadBottom3" :bottom-all-loaded="allLoaded3" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore3">
							<div class="order-list" :style="{'min-height':ordersHeight}">
								<div class="order-item border-b-1px" v-for="(order,index) in finishRes" :key="index">
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
										<template v-if="order.operatestatus==2">
											<div class="order-detail-item form-item">
												<div class="key">受理结果：</div>
												<div class="value" @click="changeType(index)">{{order.checkedValue?order.checkedValue:"请选择"}}
													<span class="picker-icon-up"></span>
													<span class="picker-icon-down"></span>
												</div>
											</div>
											<div class="order-detail-item form-item" v-show="order.checkedId!=5">
												<div class="key">放款额度：</div>
												<div class="value">
													<div class="input-group">
														<input type="text" class="mui-input-clear" placeholder="放款额度" v-model="order.loanamount">
														<div class="input-group-addon">万元</div>
													</div>
												</div>
											</div>
											<div class="order-btn-box">
												<button class="btn btn-block btn-golden" @click="submit(index)">确认提交</button>
											</div>
										</template>
										<template v-if="order.operatestatus==3||order.operatestatus==5">
											<div class="order-detail-item">
												<div class="key">受理结果：</div>
												<div class="value">未通过</div>
											</div>
										</template>
										<template v-if="order.operatestatus==4">
											<div class="order-detail-item">
												<div class="key">放款额度：</div>
												<div class="value">{{order.loanamount}}万元</div>
											</div>
										</template>
									</div>
								</div>
							</div>
						</mt-loadmore>
					</div>
				</mt-search>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-popup v-model="isPopup" position="bottom" class="popup">
			<mt-picker :slots="slots" @change="onValuesChange" value-key="label" :showToolbar="true">
				<div class="picker-tool-bar">
					<button class="btn btn-default btn-small fl" @click="cancel">取消</button>
					<button class="btn btn-primary btn-small fr" @click="esure">确定</button>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      ordersHeight: "",
      unsureResPageNo: 1,
      acceptResPageNo: 1,
      finishResPageNo: 1,
      searchValue1: "",
      searchValue2: "",
      searchValue3: "",
      selected: "1",
      unsureRes: [],
      acceptRes: [],
      finishRes: [],
      allLoaded1: false,
      allLoaded2: false,
      allLoaded3: false,
      searchValue1: "",
      searchValue2: "",
      searchValue3: "",
      pickerValue: "通过",
      pickerTemp: {
        value: "",
        id: ""
      },
      isPopup: false,
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
    this.getOrder(1, this.unsureResPageNo, this.searchValue1);
    this.getOrder(2, this.acceptResPageNo, this.searchValue2);
    this.getOrder(3, this.finishResPageNo, this.searchValue3);
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
          pageSize: 5
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (type == 1) {
        if (res.resultCode == "0000") {
          this.unsureRes = this.unsureRes.concat(res.result.list);
          if (res.result.list.length < 5) {
            this.allLoaded1 = true;
            return;
          }
          this.unsureResPageNo++;
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
          this.acceptRes = this.acceptRes.concat(res.result.list);
          if (res.result.list.length < 5) {
            this.allLoaded2 = true;
            return;
          }
          this.acceptResPageNo++;
        } else {
          Toast({
            message: res.resultMsg,
            duration: 2000,
            position: "bottom"
          });
        }
      }
      if (type == 3) {
        if (res.resultCode == "0000") {
          this.finishRes = this.finishRes.concat(res.result.list);
          if (res.result.list.length < 5) {
            this.allLoaded3 = true;
            return;
          }
          this.finishResPageNo++;
        } else {
          Toast({
            message: res.resultMsg,
            duration: 2000,
            position: "bottom"
          });
        }
      }
    },
    //显示受理结果
    changeType(value) {
      let self = this;
      self.indexTemp = value;
      this.isPopup = true;
    },
    //选择受理结果
    onValuesChange(picker, values) {
      this.pickerTemp.value = values[0].label;
      this.pickerTemp.id = values[0].id;
    },
    //确认
    esure() {
      this.finishRes[this.indexTemp].checkedId = this.pickerTemp.id;
      this.finishRes[this.indexTemp].checkedValue = this.pickerTemp.value;
      if (this.pickerTemp.id == 5) {
        this.finishRes[this.indexTemp].loanamount = 0;
      }
      this.isPopup = false;
    },
    //取消
    cancel() {
      this.isPopup = false;
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
      this.getOrder(1, this.unsureResPageNo, this.searchValue1);
      this.$refs.loadmore1.onBottomLoaded();
    },
    //下拉更新
    updateOrder2() {
      this.acceptRes = [];
      this.searchValue2 = "";
      this.getOrder(2, 1, this.searchValue2);
      this.$refs.loadmore2.onTopLoaded();
    },
    //上拉加载
    loadBottom2() {
      this.getOrder(2, this.acceptResPageNo, this.searchValue2);
      this.$refs.loadmore2.onBottomLoaded();
    },
    //下拉更新
    updateOrder3() {
      this.finishRes = [];
      this.searchValue3 = "";
      this.getOrder(3, 1, this.searchValue3);
      this.$refs.loadmore3.onTopLoaded();
    },
    //上拉加载
    loadBottom3() {
      this.getOrder(3, this.finishResPageNo, this.searchValue3);
      this.$refs.loadmore3.onBottomLoaded();
    },
    //待确认搜索
    unsureSearch() {
      this.unsureResPageNo = 1;
      this.unsureRes = [];
      this.getOrder(1, this.unsureResPageNo, this.searchValue1);
    },
    //已受理搜索
    acceptSearch() {
      this.acceptResPageNo = 1;
      this.acceptRes = [];
      this.getOrder(2, this.acceptResPageNo, this.searchValue2);
    },
    //已完成搜索
    finishSearch() {
      this.finishResPageNo = 1;
      this.finishRes = [];
      this.getOrder(3, this.finishResPageNo, this.searchValue3);
    },
    //受理
    accept: async function(id) {
      let params = {
        method: "XYJR00004",
        params: {
          applyId: id,
          status: 1
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.unsureResPageNo = 1;
        this.acceptResPageNo = 1;
        this.unsureRes = [];
        this.acceptRes = [];
        this.getOrder(1, this.unsureResPageNo, this.searchValue1);
        this.getOrder(2, this.acceptResPageNo, this.searchValue2);
      }
    },
    //拒绝
    refuse: async function(id) {
      let params = {
        method: "XYJR00004",
        params: {
          applyId: id,
          status: 3
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.acceptResPageNo = 1;
        this.finishResPageNo = 1;
        this.finishRes = [];
        this.acceptRes = [];
        this.getOrder(2, this.acceptResPageNo, this.searchValue2);
        this.getOrder(3, this.finishResPageNo, this.searchValue3);
      }
    },
    //通过
    pass: async function(id) {
      let params = {
        method: "XYJR00004",
        params: {
          applyId: id,
          status: 2
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.acceptResPageNo = 1;
        this.finishResPageNo = 1;
        this.finishRes = [];
        this.acceptRes = [];
        this.getOrder(2, this.acceptResPageNo, this.searchValue2);
        this.getOrder(3, this.finishResPageNo, this.searchValue3);
      }
    },
    //确认提交
    submit: async function(index) {
      if (!this.finishRes[index].checkedId) {
        Toast({
          message: "请选择受理结果",
          duration: 2000,
          position: "bottom"
        });
        return;
	  }
      if (this.finishRes[index].checkedId != 5) {
        let reg = /^\+?[1-9][0-9]*$/; //正整数
        if (!reg.test(this.finishRes[index].loanamount)) {
          Toast({
            message: "放款额度请填入整数",
            duration: 2000,
            position: "bottom"
          });
          return;
        }
      }

      let params = {
        method: "XYJR00004",
        params: {
          applyId: this.finishRes[index].id,
          status: this.finishRes[index].checkedId,
          loanAmount: this.finishRes[index].loanamount
        }
	  };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if ((res.resultCode = "0000")) {
        this.finishRes[index].operatestatus = res.result.operatestatus;
        this.finishRes[index].loanamount = res.result.loanamount;
      }
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
      min-height: px(123);
      padding: px(10) 0;
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
          .value {
            flex: 1;
          }
          &.form-item {
            height: px(30);
            line-height: px(30);
            &:not(:last-child) {
              margin-bottom: px(5);
            }
            .value {
              position: relative;
              padding: 0 px(10) 0 px(5);
              background: #ebebeb;
              [class^="picker-icon"] {
                position: absolute;
                right: px(10);
                border-style: solid;
                border-width: px(8) px(4);
              }
              .picker-icon-up {
                top: px(-5);
                border-color: transparent transparent $bd-default transparent;
              }
              .picker-icon-down {
                top: px(14);
                border-color: $bd-default transparent transparent transparent;
              }
              .input-group {
                display: flex;
                input[type="text"] {
                  flex: 1;
                  padding-right: 10px;
                  background: #ebebeb;
                }
              }
            }
          }
        }
      }
      .order-btn-wrap {
        position: absolute;
        top: px(27);
        right: px(15);
      }
      .order-btn-box {
        margin-top: px(10);
        display: flex;
        justify-content: space-around;
        .gutter {
          width: px(15);
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
    .picker-tool-bar {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
