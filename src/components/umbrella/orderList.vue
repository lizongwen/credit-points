<template>
	<div class="order-list">
		<div class="order-item border-b-1px" v-for="(order,index) in orders" :key="index">
			<div class="order-avatar">
				<img src="../../img/umbrella/umbrella_running.png" v-if="order.isTimeout==0" />
				<img src="../../img/umbrella/umbrella_timeout.png" v-if="order.isTimeout==1" />
				<img src="../../img/umbrella/remand_end.png" v-if="order.isTimeout==2" />
				<img src="../../img/umbrella/remand_end.png" v-if="order.isTimeout==3" />
			</div>
			<div class="order-detail">
				<div>
					<span>服务编号：</span>
					<span>{{order.recordCode}}</span>
				</div>
				<div>
					<span>申请状态：</span>
					<span :class="order.isTimeout | filterClass ">{{order.isTimeout | formatText}}</span>
				</div>
				<div>
					<span>申请时间：</span>
					<span>{{order.applyStartTime}}</span>
				</div>
			</div>
			<div class="order-btn-wrap" v-if="hasbtn">
				<button class="btn btn-default" v-if="order.isTimeout==2" @click="comment(order.id,order.recordCode)">评价</button>
				<button class="btn btn-default" v-if="order.isTimeout!=2&&order.isTimeout!=3" @click="ramand">归还</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    hasbtn: {
      type: Boolean
    },
    orders: {
      type: Array
    }
  },
  data() {
    return {};
  },
  filters: {
    filterClass(val) {
      if (val == "0") {
        return "running";
      }
      if (val == "1") {
        return "timeout";
      }
      if (val == "2") {
        return "remand";
      }
      if (val == "3") {
        return "default";
      }
    },
    formatText(val) {
      if (val == "0") {
        return "使用中";
      }
      if (val == "1") {
        return "已超时";
      }
      if (val == "2") {
        return "已归还";
      }
      if (val == "3") {
        return "已完成";
      }
    }
  },
  mounted() {},
  methods: {
    //归还
    ramand() {
      this.$router.push("./remand");
    },
    //评价
    comment(id, recordCode) {
      this.$router.push({
        path: "./comment",
        query: {
          applyId: id,
          recordCode: recordCode
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.order-list {
	overflow: auto;
  .order-item {
    position: relative;
    display: flex;
    height: px(100);
    &:not(:last-child) {
      @include border-b-1px(#ebebeb);
    }
    .order-avatar {
      width: px(70);
      align-self: center;
      text-align: center;
      img {
        width: px(40);
        height: px(40);
      }
    }
    .order-detail {
      flex: 1;
      margin-top: px(13);
      line-height: px(24);
      .running {
        color: #f5a623;
      }
      .timeout {
        color: #ff7070;
      }
      .default {
        color: #000;
      }
      .remand {
        color: #000;
      }
    }
    .order-btn-wrap {
      position: absolute;
      top: px(27);
      right: px(15);
    }
  }
}
</style>
