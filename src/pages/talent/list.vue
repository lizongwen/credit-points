<template>
	<div class="list">
		<div class="banner"></div>
		<div class="list-content" :style="{height:ordersHeight}">
			<mt-loadmore :auto-fill="false" :top-method="updateOrder" :bottom-method="loadBottom" bottomPullText="上拉加载" bottomDropText="释放加载更多" :bottom-all-loaded="allLoaded" ref="loadmore">
				<div class="order-list" :style="{'min-height':ordersHeight}">
					<div class="order-item border-b-1px" v-for="(list,index) in lists" :key="index">
						<div class="order-detail">
							<div class="dept">{{list.travelName}}</div>
							<div>
								<span>服务项目：</span>
								<span>{{list.incentivename}}</span>
							</div>
							<div>
								<span>申请状态：</span>
								<span>申请成功</span>
							</div>
							<div>
								<span>申请时间：</span>
								<span>{{list.applytime}}</span>
							</div>
						</div>
						<div class="order-btn-wrap" v-if="list.operatestatus==1">
							<button class="btn btn-default-primary btn-min" @click="comment(list.id,list.recordcode,list.applytime,list.incentivename)">评价</button>
						</div>
					</div>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      allLoaded: false,
      pageNo: 1,
      ordersHeight: 0,
      lists: []
    };
  },
  mounted() {
    this.ordersHeight = (window.innerHeight - 160) / 20 + "rem";
    this.getList(this.pageNo);
  },
  methods: {
    //获取订单列表
    getList: async function(pageNo) {
      let params = {
        method: "XYRC00004",
        params: {
          userId: this.$store.state.talent.userId,
          pageNo: pageNo,
          pageSize: 10
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result.length) {
          this.lists = this.lists.concat(res.result);
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
    //评价
    comment(applyid, recordCode,applytime,incentivename) {
      this.$router.push({
        path: "/talent/comment",
        query: {
          applyId: applyid,
          recordCode: recordCode,
          applytime: applytime,
          incentivename: incentivename
        }
      });
    },
    //下拉更新
    updateOrder() {
      this.lists = [];
      this.getList(1);
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.getOrderList(this.pageNo, 3);
      this.$refs.loadmore.onBottomLoaded();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.list {
  height: 100%;
  .banner {
    display: flex;
    height: px(160);
    font-size: px(24);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
    background: url("../../img/talent/ms_talent@2x.jpg") no-repeat center;
    background-size: cover;
    color: $text-white;
  }
  .list-content {
    overflow: scroll;
    .order-list {
      overflow: auto;
      .order-item {
        position: relative;
        display: flex;
        &:not(:last-child) {
          @include border-b-1px(#ebebeb);
        }
        .order-detail {
          flex: 1;
          margin: px(13) 0 px(13) px(20);
          line-height: px(24);
          .dept {
            font-size: px(16);
            font-weight: bold;
          }
        }
        .order-btn-wrap {
          position: absolute;
          top: px(27);
          right: px(15);
        }
      }
    }
  }
}
</style>
