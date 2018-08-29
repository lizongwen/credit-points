<template>
  <div class="index">
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
    <div class="content-padded travel-list">
      <div class="card" v-for="(car,index) in cars" :key="index">
        <div class="card-head">
          <div class="card-head-title card-head-title-bde-blue">{{car.name}}</div>
        </div>
      </div>
    </div>
    <div class="tips" id="running">
			<div class="tips-number">+{{total}}</div>
			<div class="tips-desc">进行中</div>
		</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          total: 0,
          cars:[
            {
              name: '易开出行'
            },
            {

            }
          ]
        }
    },
    mounted(){

    },
     methods: {

    }
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
        > img {
          width: px(30);
          margin-top: px(8);
          margin-bottom: px(5);
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
  }
</style>
