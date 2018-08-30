/**
* 易出行首页
**/
<template>
  <div class="index">
    <!--header-->
    <div class="banner">安全·便捷</div>
    <div class="index-box">
      <div class="index-box-item">
        <img src="../../img/travel/icon_fenshizulin@3x.png">
        <p>分时租赁</p>
      </div>
      <div class="index-box-item">
        <img src="../../img/travel/icon_wangyueche@3x.png">
        <p>网约车</p>
      </div>
      <div class="index-box-item">
        <img src="../../img/travel/icon_danche@3x.png">
        <p>共享单车</p>
      </div>
    </div>
    <!--contain-->
    <div class="content-padded travel-list">
      <div class="card" v-for="(car,index) in cars" :key="index">
        <div class="card-head">
          <div class="card-head-title card-head-title-bd-green">{{car.name}}</div>
          <div class="card-head-small-title">{{car.description}}</div>
        </div>
        <div class="card-body">
          <img src="../../img/travel/banner2@2x.png">
        </div>
        <div class="card-foot">
          <div class="travel-wrap">
            <div class="item">
              <img src="../../img/travel/icon_yajinjianban@2x.png">
              <p class="name">押金减半</p>
              <p class="score">乐惠分900</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips" id="running">
      <div class="tips-number">+{{total}}</div>
      <div class="tips-desc">进行中</div>
    </div>

    <div class="score-tip" v-if="role === 'admin'">
      <img src="../../img/travel/icon_guanliyuan.png" >
			<span class="score">管理员</span>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      role: 'admin',
      cars: [
        {
          name: '易开出行',
          description: '出行更自由·生活更简单'
        },
        {
          name: '易开出行',
          description: '出行更自由·生活更简单'
        }
      ]
    }
  },
  mounted() {
    // TODO
    // 押金减半
    // 图片居中问题
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.index {
  height: 100%;
  background: $bg-grey;
  .banner {
    display: flex;
    height: px(160);
    font-size: px(24);
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.6);
    padding-top: px(42);
    justify-content: center;
    background: url("../../img/travel/banner1@2x.png") no-repeat center;
    background-size: cover;
    color: $text-white;
  }
  .index-box {
    position: relative;
    display: flex;
    width: px(275);
    height: px(75);
    margin: px(-38) auto px(30) auto;
    padding: px(5);
    border-radius: px(4);
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    .index-box-item {
      flex: 1;
      text-align: center;
      &:not(:last-child) {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          top: px(6);
          right: 0;
          width: px(2);
          height: px(54);
          background: $bd-grey;
        }
      }
      >img {
        width: px(30);
        margin-top: px(8);
        margin-bottom: px(5);
      }
    }
  }
  .travel-list {
    height: px(233);
    .travel-wrap {
      margin-top: px(15);
      margin-bottom: px(3);
      display: flex;
      .item {
        flex: 1;
        margin-left: px(30);
        >img {
          margin-left: px(10);
          width: px(31);
          height: px(35);
        }
        .name {
          margin-top: px(6);
          font-size: px(14);
          line-height: px(14);
          color: #4A4A4A;
        }
        .score {
          display: inline-block;
          margin-top: px(6);
          padding: 0 px(3);
          font-size: px(9);
          transform: scale(0.75);
          background: #ffe4e4;
          color: #FF7070;
        }
      }
    }
  }
  .tips {
    width: px(80);
    height: px(80);
    background: url("../../img/finance/icon_yellow.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    right: 4px;
    bottom: 10px;
    color: #ffffff;
    text-align: center;
    padding-top: 18px;
    .tips-number {
      font-size: px(22);
      line-height: px(24);
    }
    .tips-desc {
      font-size: px(14);
    }
  }
    .score-tip {
    position: absolute;
    width: px(82);
    height: px(26);
    right: 0;
    top: px(15);
    padding: px(4) px(0) px(4) px(10);
    border-radius: px(13) 0 0 px(13);
    font-size: px(12);
    >img {
      width: px(20);
      margin: 0 auto;
    }
    background-image: linear-gradient(-121deg, #FFF551 3%, #FDE728 100%);
    .score {
      font-size: px(12);
      vertical-align: px(-1);
    }
  }
}
</style>

