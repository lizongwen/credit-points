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
      <mt-tab-container-item id="1">
        <div class="order-list">
          <div class="order-item border-b-1px" v-for="(application,index) in applications" :key="index">
            <div class="order-avatar">
              <img src="../../img/travel/icon_yikai@2x.png" />
            </div>
            <div class="order-detail">
              <div class="order-detail-title">
                <div class="name">{{application.name}}</div>
                <div class="remark">({{application.remark}})</div>
              </div>
              <div class="order-detail-item">
                <div>申请时间：</div>
                <div>{{application.time}}</div>
              </div>
              <div class="order-detail-item">
                <div>申请状态：</div>
                <div>{{dealStatus(application.status)}}</div>
              </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="finish-wrap" :style="{height:ordersHeight}">
        <mt-loadmore :bottom-all-loaded="allLoaded" bottomPullText="上拉加载" bottomDropText="释放加载更多" ref="loadmore">
          <div class="order-list">
            <div class="order-item border-b-1px" v-for="(application,index) in applications" :key="index">
              <div class="order-avatar">
                <img src="../../img/travel/icon_yikai@2x.png" />
              </div>
              <div class="order-detail">
                <div class="order-detail-title">
                  <div class="name">{{application.name}}</div>
                  <div class="remark">({{application.remark}})</div>
                </div>
                <div class="order-detail-item">
                  <div>申请时间：</div>
                  <div>{{application.time}}</div>
                </div>
                <div class="order-detail-item">
                  <div>申请状态：</div>
                  <div>{{dealStatus(application.status)}}</div>
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
      allLoaded: false,
      selected: '1',
      searchValue: '',
      unsureRes: [],
      ordersHeight: '',
      statusList: [
        {
          id: 0,
          name: '待审核'
        },
        {
          id: 1,
          name: '审核失败'
        },
        {
          id: 2,
          name: '审核成'
        }
      ],
      applications: [
        {
          name: '易开出行',
          remark: '押金减半',
          time: '2018-08-28 12:23',
          status: 0
        },
        {
          name: '易开出行',
          remark: '押金减半',
          time: '2018-08-28 12:23',
          status: 1
        }
      ]
    };
  },
  methods: {
    dealStatus(status) {
      let self = this;
      let data;
      self.statusList.forEach(item => {
        if (item.id === status) {
          data = item.name;
        }
      });
      return data;
    }
  },
  mounted() {
    this.ordersHeight = (window.innerHeight - 52) / 20 + "rem";
  }
}
</script>

<style lang="scss" scoped>
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
    border-bottom-color: #5DA904;
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
            width: px(64);
            font-size: px(16);
            font-weight: bold;
            text-align: justify;
            overflow: hidden;
            margin-right: px(10);
          }
          .remark {
            width: px(75);
            font-size: px(16);
            color: #4A4A4A;
            text-align: justify;
            overflow: hidden;
            margin-right: px(10);
          }
        }
        .order-detail-item {
          display: flex;
          height: px(12);
          margin-top: px(10);
          font-size: px(12);
          color: #4A4A4A;
        }
      }
    }
  }
}
</style>
