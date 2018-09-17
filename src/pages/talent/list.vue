<template>
	<div class="list">
		<div class="banner"></div>
		<mt-loadmore :auto-fill="false" :top-method="updateOrder" :bottom-method="loadBottom" bottomPullText="上拉加载" bottomDropText="释放加载更多" :bottom-all-loaded="allLoaded" ref="loadmore">
			<div class="order-list">
				<div class="order-item border-b-1px">
					<div class="order-detail">
						<div class="dept">市人力资源和社会保障局</div>
						<div>
							<span>服务项目：</span>
							<span>一对已引导服务</span>
						</div>
						<div>
							<span>申请状态：</span>
							<span>申请成功</span>
						</div>
						<div>
							<span>申请时间：</span>
							<span>2017/12/12 10:23</span>
						</div>
					</div>
					<div class="order-btn-wrap" v-if="hasbtn">
							<button class="btn btn-default-primary btn-min">评价</button>
					</div>
				</div>
				<div class="order-item border-b-1px">
					<div class="order-detail">
						<div class="dept">市人力资源和社会保障局</div>
						<div>
							<span>服务项目：</span>
							<span>一对已引导服务</span>
						</div>
						<div>
							<span>申请状态：</span>
							<span>申请成功</span>
						</div>
						<div>
							<span>申请时间：</span>
							<span>2017/12/12 10:23</span>
						</div>
					</div>
					<div class="order-btn-wrap" v-if="hasbtn">
						<button class="btn btn-default-primary btn-min">评价</button>
					</div>
				</div>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
export default {
  data() {
    return {
      allLoaded: false,
      hasbtn: true
    };
  },
  methods: {
    //下拉更新
    updateOrder() {
      this.unfinish = [];
      this.getOrderList(1, 3);
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
</style>
