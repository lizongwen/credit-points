<template>
	<div class="borrow">
		<div v-show="ok" class="borrow-field">
			<form class="form">
				<div class="form-item border-b-1px">
					<div class="inner-box">
						<span class="required">*</span>
					</div>
					<div class="title">
						<span class="text">借用人(单位)</span>
					</div>
					<div class="value">
						<input type="text" placeholder="请输入借用人" v-model="form.user">
					</div>
				</div>
				<div class="form-item border-b-1px">
					<div class="inner-box">
						<span class="required">*</span>
					</div>
					<div class="title" @click="changeType">
						<span class="text">{{pickerValue}}
							<span class="picker-icon-up"></span>
							<span class="picker-icon-down"></span>
						</span>
					</div>
					<div class="value">
						<input type="text" :placeholder="placeholder" v-model="form.searchText">
					</div>
				</div>
			</form>
			<div class="content-padded">
				<button class="btn btn-primary btn-block  btn-large" @click="submit">确认还伞</button>
			</div>
		</div>
		<div v-show="!ok" class="result">
			<img class="result-img" src="../../img/umbrella/result_success@3x.png" alt="" srcset="">
			<div class="result-desc">您替{{person}}成功还伞</div>
			<button class="btn btn-default btn-large" @click="fallback">返回</button>
		</div>
		<mt-popup v-model="isPopup" position="bottom" class="popup">
			<mt-picker :slots="slots" @change="onValuesChange" value-key="label" :showToolbar="true">
				<div class="picker-tool-bar">
					<button class="btn btn-default btn-small fl" @click="cancel">取消</button>
					<button class="btn btn-primary btn-small fr" @click="esure">确定</button>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      //替人还伞表单
      placeholder: "请输入联系电话",
      pickerValue: "联系电话",
      person: "",
      form: {
        user: "",
        searchText: "",
        type: 1
      },
      pickerTemp: {
        value: "",
        id: ""
      },
      ok: true,
      checked: false,
      isPopup: false,
      slots: [
        {
          flex: 1,
          values: [
            {
              id: 1,
              label: "联系电话"
            },
            {
              id: 2,
              label: "证件号码"
            }
          ],
          defaultIndex: 0,
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    submit: async function(status) {
      if (!this.checkInput(this.form.type)) {
        return;
      }
      let params = {
        method: "XYQ00002",
        params: {
          userid: this.$store.state.umbrella.userId,
          username: this.form.user,
          searchText: this.form.searchText,
          type: this.form.type
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.person = this.form.user;
        this.ok = false;
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000
        });
      }
    },
    //切换类型
    changeType() {
      this.isPopup = true;
    },
    onValuesChange(picker, values) {
      this.pickerTemp.value = values[0].label;
      this.pickerTemp.id = values[0].id;
    },
    esure() {
      this.pickerValue = this.pickerTemp.value;
      this.form.type = this.pickerTemp.id;
      this.placeholder =
        this.form.type == 1 ? "请输入联系电话" : "请输入证件号码";
      this.isPopup = false;
    },
    cancel() {
      this.isPopup = false;
    },
    //验证输入
    checkInput(type) {
      let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      let cardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!this.form.user && !this.form.searchText) {
        Toast({
          message: "请输入正确的信息",
          duration: 2000
        });
        return false;
      }
      if (type == 1 && !phoneReg.test(this.form.searchText)) {
        Toast({
          message: "请输入正确联系电话",
          duration: 2000
        });
        return false;
      } else if (type == 2 && !cardReg.test(this.form.searchText)) {
        Toast({
          message: "请输入正确的证件号码",
          duration: 2000
        });
        return false;
      }
      return true;
    },
    //返回
    fallback() {
      this.$router.go(-2);
      //   this.$router.push({
      //     path: "./home",
      //     query: {
      //       wdbm: this.$store.state.umbrella.wdbm,
      //       code: this.$store.state.umbrella.code
      //     }
      //   });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.borrow {
  height: 100%;
  .borrow-field {
    height: 100%;
    overflow: hidden;
    background-color: $bg-grey;
    .form {
      margin-top: px(10);
      .form-item {
        .text {
          position: relative;
          [class^="picker-icon"] {
            position: absolute;
            right: px(-18);
            border-style: solid;
            border-width: px(8) px(4);
          }
          .picker-icon-up {
            top: px(-8);
            border-color: transparent transparent $bd-default transparent;
          }
          .picker-icon-down {
            top: px(10);
            border-color: $bd-default transparent transparent transparent;
          }
        }
      }
    }
    .content-padded {
      margin-top: px(60);
    }
  }
  .result {
    margin-top: px(80);
    text-align: center;
    .result-img {
      width: px(85);
      height: px(85);
    }
    .result-desc {
      margin: px(12) 0 px(37);
      font-size: px(18);
    }
    .btn {
      width: px(240);
      height: px(38);
      border: 1px solid #d8d8d8;
      letter-spacing: px(10);
      background: #fff;
    }
  }
}
.popup {
  width: 100%;
  .picker-tool-bar {
    padding: 0.25rem 0.5rem;
  }
}
</style>
