<template>
	<div class="download">
		<div class="g-header">
			<img src="../img/logo-qmsg.png" alt="场馆认证">
		</div>
		<div class="g-content">
			<p class="tip">请使用城市令扫码功能开启您的乐惠服务</p>
			<button class="btn btn-primary btn-block btn-large" @click="openApp">打开城市令</button>
		</div>
		<div class="mask" v-show="showflag" @click="showflag=false">
			<img src="../img/ios-tip.png" v-if="os.type==1" />
			<img src="../img/android-tip.png" v-else />
		</div>
	</div>
</template>

<script>
import utils from "@/js/utils";
export default {
  data() {
    return {
      os: {
        type: 1
      },
      showflag: false
    };
  },
  mounted() {
    let os = utils.getOS();
    if (os == "ios") {
      this.os.type = 1;
    }
    if (os == "android") {
      this.os.type = 2;
    }
  },
  methods: {
    openApp() {
      this.showflag = true;
    }
  }
};
</script>

<style lang="scss">
@import "../style/func";
@import "../style/mixin";
@import "../style/variable";
.download {
  height: 100%;
  background-color: #fff;
  .g-header {
    padding: 1rem 0;

    > img {
      margin: 0 auto;
      display: block;
      width: 12.775rem;
      height: 7.05rem;
    }
  }
  .g-content {
    padding: 0 px(15);
    .tip {
      padding: 0.5rem 0;
      font-size: 0.8rem;
      text-align: center;
      color: #000;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    img {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      width: 15rem;
      height: 7.5rem;
    }
  }
}
</style>
