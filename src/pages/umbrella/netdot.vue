<template>
	<div class="net-dot">
		<div class="amap-wrapper">
			<el-amap ref="map" class="amap-box" :vid="'amap-vue'" :amap-manager="amapManager" :zoom="zoom" :center="center">
				<!-- <el-amap-marker :icon="usermarker.mark_icon" :position="usermarker.position" vid="user" offset:[-17, -72],></el-amap-marker> -->
				<el-amap-marker v-for="(marker,index) in markers" :icon="marker.mark_icon" :position="marker.position" :events="marker.events" :vid="index" :key="index" :offset="marker.offset"></el-amap-marker>
				<el-amap-info-window isCustom="true" v-if="window" closeWhenClickMap="true" :position="window.position" :visible="window.visible" :content="window.content" :events="window.events" :offset="window.offset"></el-amap-info-window>
			</el-amap>
		</div>

	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { AMapManager } from "vue-amap";
import mark_icon_s from "@/img/umbrella/icon_umbrella_s.png";
import mark_icon_l from "@/img/umbrella/icon_umbrella_l.png";
import icon_wangdian from "@/img/umbrella/icon_wangdian.png";
// import user_post from "@/img/umbrella/user_post.png";
let amapManager = new AMapManager();
export default {
  data() {
    return {
      amapManager,
      zoom: 13,
      center: [118.368125, 31.319867],
      //信用伞网点
      markers: [],
      //弹出窗体
      windows: [],
      //当前显示窗体
      window: "",
      marker: ""
    };
  },
  mounted() {
    this.getNetdot();
  },
  methods: {
    getNetdot: async function() {
      let params = {
        method: "XYQ00009",
        params: {}
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        if (res.result.length > 0) {
          let markers = [];
          let windows = [];
          let data = res.result;
          let _this = this;
          for (let i = 0; i < data.length; i++) {
            markers.push({
              mark_icon: mark_icon_s,
              offset: [-15, -37],
              position: [
                data[i].mapxy.split(",")[0],
                data[i].mapxy.split(",")[1]
              ],
              events: {
                click() {
                  _this.windows.forEach(window => {
                    window.visible = false;
                  });
                  _this.markers.forEach(marker => {
                    marker.mark_icon = mark_icon_s;
                    marker.offset = [-15, -37];
                  });
                  _this.window = _this.windows[i];
                  _this.marker = _this.markers[i];
                  _this.$nextTick(() => {
                    _this.window.visible = true;
                    _this.marker.mark_icon = mark_icon_l;
                    _this.marker.offset = [-19, -46];
                  });
                }
              }
            });

            windows.push({
              offset: [0, -50],
              position: [
                data[i].mapxy.split(",")[0],
                data[i].mapxy.split(",")[1]
              ],
              content: `<div class="prompt">
			  <div class="name"><img src="${icon_wangdian}"/>${data[i].travelname}</div>
			   <div class="addr">${data[i].traveladdress}</div>
			 </div>`,
              visible: false,
              events: {
                close() {
                  _this.markers.forEach(marker => {
                    marker.mark_icon = mark_icon_s;
                    marker.offset = [-15, -37];
                  });
                }
              }
            });
          }
          this.markers = markers;
          this.windows = windows;
        }
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.net-dot {
  height: 100%;
  .amap-wrapper {
    height: 100%;
    .prompt {
      width: px(165);
      height: px(90);
      padding: px(10);
      background: #fff;
      border-radius: px(4);
      box-shadow: 0 0 px(10) rgba(0, 0, 0, 0.3);
      .name {
        > img {
          width: px(16);
          margin-right: px(6);
          vertical-align: px(0);
        }
      }
      .addr {
        font-size: px(12);
        color: #c3c3c3;
        max-height: px(51);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>

