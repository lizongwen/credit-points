/**
* author: 王蒙Sanm
* createTime: 2018/8/30
* description: 审批
**/
<template>
  <div class="approval-info">
    <mt-navbar v-model="selected" class="border-b-1px">
      <mt-tab-item id="1">待审批</mt-tab-item>
      <mt-tab-item id="2">已完成</mt-tab-item>
    </mt-navbar>
    <div class="search-approval"></div>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="approval-list" v-for="(approval,index) in approvalList" :key="index">
          <div class="order-item border-b-1px">
            <div class="order-avatar">
              <img src="../../img/travel/icon_yajinjianban@2x.png" />
              <span class="label">押金减半</span>
            </div>
            <div class="approval-detail">
              <div class="approval-detail-item">
                <p>
                  <span>申请人：</span>
                  <span>{{approval.name}}</span>
                </p>
              </div>
              <div class="approval-detail-item">
                <p>
                  <span>身份证号：</span>
                  <span>{{approval.idCard}}</span>
                </p>
              </div>
              <div class="approval-detail-item">
                <p>
                  <span>申请时间：</span>
                  <span>{{approval.time}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="approval-btn">
            <button class="btn refuse-btn" @click="actionSheet">拒绝审批</button>
            <button class="btn pass-btn">通过审批</button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="approval-pass" v-for="(result,index) in approvalResult" :key="index">
          <div class="order-item border-b-1px">
            <div class="order-avatar">
              <img src="../../img/travel/icon_yajinjianban@2x.png" />
              <span class="label">押金减半</span>
              <span class="label-status" :class="result.status !== 1 ? 'refuse-status' : 'pass-status'">{{reasonDeal(result.status)}}</span>
            </div>
            <div class="approval-detail">
              <div class="approval-detail-item">
                <p>
                  <span>申请人：</span>
                  <span>{{result.name}}</span>
                </p>
              </div>
              <div class="approval-detail-item">
                <p>
                  <span>身份证号：</span>
                  <span>{{result.idCard}}</span>
                </p>
              </div>
              <div class="approval-detail-item">
                <p>
                  <span>申请时间：</span>
                  <span>{{result.time}}</span>
                </p>
              </div>
              <div class="approval-detail-item" v-if="result.status !== 1">
                <p>
                  <span>拒绝原因：</span>
                  <span>{{result.reason}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-actionsheet :actions="actions" v-model="sheetVisible">
      </mt-actionsheet>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '1',
      sheetVisible: false,
      statusList: [
        {
          id: 0,
          name: '拒绝'
        },
        {
          id: 1,
          name: '通过'
        }
      ],
      actions: [
        {
          name: '非新用户',
          // method : this.getCamera
        }, {
          name: '原因一',
          // method : this.getLibrary
        },
        {
          name: '原因二',
          // method : this.getLibrary
        }
      ],
      approvalList: [
        {
          name: '某某某',
          idCard: '34122220000909234X',
          time: '2018/08/28 12:23',
        },
        {
          name: '某某某',
          idCard: '34122220000909234X',
          time: '2018/08/28 12:23',
        }
      ],
      approvalResult: [
        {
          name: '某某某',
          idCard: '34122220000909234X',
          time: '2018/08/28 12:23',
          status: 0,
          reason: '非新用户'
        },
        {
          name: '某某某',
          idCard: '34122220000909234X',
          time: '2018/08/28 12:23',
          status: 1,  // 1通过
        }
      ],
    };
  },
  methods: {
    actionSheet() {
      this.sheetVisible = true;
    },
    reasonDeal(status) {
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";

.approval-info {
  height: 100%;
  .is-selected {
    z-index: 1;
    position: relative;
    margin-bottom: -1px;
    border-bottom-color: #5DA904;
  }
  .search-approval {
    margin-bottom: px(10);
  }
  .approval-list {
    height: px(146);
    overflow: auto;
    &:first-child {
      @include border-t-1px(#EBEBEB);
    }
    @include border-b-1px(#EBEBEB);
    .order-item {
      background-color: #ffffff;
      display: flex;
      .order-avatar {
        margin-left: px(20);
        img {
          width: px(31);
          height: px(35);
          margin: 0 auto;
          display: block;
          margin-bottom: px(6);
          margin-top: px(21);
        }
        .label {
          font-size: px(14);
          color: #4A4A4A;
        }
      }
      .approval-detail {
        margin-top: px(14);
        margin-left: px(17);
        flex: 1;
        .approval-detail-item {
          font-size: px(14);
          line-height: px(14);
          margin-top: px(10);
        }
      }
    }
    .approval-btn {
      margin-top: px(15);
      .refuse-btn {
        border: px(1) solid #5DA904;
        background: #ffffff;
        color: #5DA904;
        margin-left: px(10);
        margin-right: px(18);
        width: px(167.5);
      }
      .pass-btn {
        background: #5DA904;
        color: #ffffff;
        font-size: px(14);
        width: px(167.5);
      }
    }
  }
  .approval-pass {
    height: px(140);
    overflow: auto;
    &:first-child {
      @include border-t-1px(#EBEBEB);
    }
    @include border-b-1px(#EBEBEB);
    .order-item {
      background-color: #ffffff;
      display: flex;
      .order-avatar {
        margin-left: px(20);
        img {
          width: px(31);
          height: px(35);
          margin: 0 auto;
          display: block;
          margin-bottom: px(6);
          margin-top: px(28);
        }
        .label {
          font-size: px(14);
          display: block;
          color: #4A4A4A;
          margin: px(4) 0;
        }
        .label-status {
          font-size: px(14);
          color: #4A4A4A;
          margin-left: px(8);
        }
        .refuse-status {
          background: rgba(255, 112, 112, 0.2);
          color: #FF7070;
          padding: px(2) px(5);
          border-radius: px(2);
        }

        .pass-status {
          background: rgba(164, 231, 86, 0.2);
          color: #A4E756;
          padding: px(2) px(5);
          border-radius: px(2);
        }
      }
      .approval-detail {
        margin-top: px(14);
        margin-left: px(17);
        flex: 1;
        .approval-detail-item {
          font-size: px(14);
          line-height: px(14);
          margin-top: px(12);
        }
      }
    }
  }
}
</style>
