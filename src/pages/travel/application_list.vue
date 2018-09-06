/**
* author: 王蒙Sanm
* createTime: 2018/8/30
* description: 申请列表
**/
<template>
	<div class="application-list">
		<mt-navbar v-model="selected" class="border-b-1px">
			<mt-tab-item id="1">进行中</mt-tab-item>
			<mt-tab-item id="2">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1" class="unfinish-wrap">
				<!-- <div class="content-padded"> -->
				<div class="order-list">
					<div class="order-item border-b-1px" v-for="(application,index) in applications" :key="index">
						<div class="order-avatar">
							<img src="../../img/travel/icon_yikai@2x.png" />
						</div>
						<div class="order-detail">
							<div class="order-detail-title">
								<div class="name">易开出行</div>
								<div class="remark">({{application.incentivenames}})</div>
							</div>
							<div class="order-detail-item">
								<div>申请时间：</div>
								<div>{{application.applytime}}</div>
							</div>
							<div class="order-detail-item">
								<div>申请状态：</div>
								<div>{{dealStatus(application.operatestatus)}}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- </div> -->
			</mt-tab-container-item>
			<mt-tab-container-item id="2" class="finish-wrap">
				<!-- <div class="content-padded"> -->
				<div class="order-list">
					<div class="order-item border-b-1px" v-for="(application,index) in finished" :key="index">
						<div class="order-avatar">
							<img src="../../img/travel/icon_yikai@2x.png" />
						</div>
						<div class="order-detail">
							<div class="order-detail-title">
								<div class="name">{{application.username}}</div>
								<div class="remark">({{application.incentivenames}})</div>
							</div>
							<div class="order-detail-item">
								<div>申请时间：</div>
								<div>{{application.applytime}}</div>
							</div>
							<div class="order-detail-item">
								<div>申请状态：</div>
								<div>{{dealStatus(application.operatestatus)}}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- </div> -->
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
export default {
  data() {
    return {
      allLoaded: false,
      selected: "1",
      ordersHeight: "",
      statusList: [
        {
          id: 0,
          name: "待审核"
        },
        {
          id: 1,
          name: "审核成功"
        },
        {
          id: 2,
          name: "审核失败"
        }
      ],
      applications: [],
      finished: []
    };
  },
  methods: {
    dealStatus(status) {
      let self = this;
      let data;
      self.statusList.forEach(item => {
        if (item.id === parseInt(status)) {
          data = item.name;
        }
      });
      return data;
    },
    //获取列表
    getIndexInfo: async function(type) {
      let params = {
        method: "XYX00003",
        params: {
          type: type,
          userId: this.$store.state.travel.userId
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (type === 1) {
          this.applications = res.result;
        } else {
          this.finished = res.result;
        }
      }
    }
  },
  mounted() {
    this.ordersHeight = (window.innerHeight - 52) / 20 + "rem";
    this.getIndexInfo(1);
    this.getIndexInfo(2);
  }
};
</script>

<style lang="scss">
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";

.application-list {
  height: 100%;
  background: $bg-grey;
  .is-selected {
    z-index: 1;
    position: relative;
    margin-bottom: -1px;
    border-bottom-color: #5da904;
	.mint-tab-item-label{
		color:#5da904;
	}
  }
  .order-list {
    overflow: auto;
    .order-item {
      background-color: #ffffff;
      position: relative;
      display: flex;
      height: px(100);
      margin-top: px(10);
      &:not(:last-child) {
        @include border-b-1px(#ebebeb);
      }
      .order-avatar {
        margin-left: px(15);
        margin-top: px(16);
        margin-right: px(12);
        width: px(68);
        height: px(68);
      }
      .order-detail {
        flex: 1;
        margin-top: px(16);
        .order-detail-title {
          display: flex;
          height: px(22);
          .name {
            font-size: px(16);
            font-weight: bold;
            margin-right: px(10);
          }
          .remark {
            font-size: px(16);
            color: #4a4a4a;
            overflow: hidden;
            margin-right: px(10);
          }
        }
        .order-detail-item {
          display: flex;
          height: px(12);
          margin-top: px(10);
          font-size: px(12);
          color: #4a4a4a;
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
