<template>
	<div class="comment content-padded">
		<div v-show="ok">
			<mt-radio title="请做出评价" v-model="value" :options="commentSelect" class="radios"></mt-radio>
			<div class="textarea">
				<mt-field placeholder="请您对本次服务进行评价（限制85个字）…" type="textarea" rows="9" v-model="commentText"></mt-field>
			</div>
			<div class="note">
				注意事项：<br/> 1.请认真填写对本次服务的评价。
				<br/> 2.提交评价的用户可参与评价抽奖活动。
				<br/>
			</div>
			<button class="btn btn-primary btn-large btn-block" @click="submit">确认提交</button>
		</div>

		<div v-show="!ok" class="result">
			<img class="result-img" src="../../img/umbrella/comment_success.png" alt="" srcset="">
			<div class="result-desc">感谢您的评价</div>
			<button class="btn btn-default btn-large" @click="fallback">返回</button>
		</div>
	</div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      ok: true,
      commentSelect: [
        {
          label: "满意",
          value: "1"
        },
        {
          label: "不满意",
          value: "0"
        }
      ],
      value: "1",
      commentText: "",
      applyid: "",
      recordcode: ""
    };
  },
  mounted() {
    this.recordcode = this.$route.query.recordCode;
    this.applyid = this.$route.query.applyId;
  },
  methods: {
    submit: async function() {
      if (!this.checkInput()) {
        return;
      }
      let params = {
        method: "XYQ00004",
        params: {
          applyid: this.applyid,
          recordcode: this.recordcode,
          issatisfaction: this.value,
          content: this.commentText
        }
      };
      const res = await this.$http.post("/apicenter/rest/post", params);
      if (res.resultCode == "0000") {
        this.ok = false;
      } else {
        Toast({
          message: res.resultMsg,
          duration: 2000,
          position: "bottom"
        });
      }
    },
    //验证输入
    checkInput() {
      if (!this.value || !this.commentText) {
        Toast({
          message: "评价不能为空",
          duration: 2000,
          position: "bottom"
        });
        return false;
      }
      if (this.commentText.length > 85) {
        Toast({
          message: "评价不能超过85个字",
          duration: 2000,
          position: "bottom"
		});
		this.commentText=this.commentText.slice(0,85);
        return false;
      }
      return true;
    },
    //返回
    fallback() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.comment {
  .radios {
    display: flex;
    label {
      font-size: px(16);
      line-height: px(32);
      color: rgba(0, 0, 0, 0.8);
    }
    .mint-cell {
      .mint-cell-wrapper {
        background-image: none;
        .mint-radio {
          .mint-radio-core {
            width: px(16);
            height: px(16);
            &:after {
              width: px(14);
              height: px(14);
              border: px(2) solid #fff;
              top: 0;
              left: 0;
            }
          }
          .mint-radio-input:checked {
            + .mint-radio-core {
              background-color: $text-primary;
              border-color: $text-primary;
              &:after {
                background: transparent;
              }
            }
          }
        }
        .mint-radio-label {
          color: $text-primary;
        }
      }
      &:last-child {
        background-image: none;
      }
    }
  }
  .textarea {
    .mint-cell-wrapper {
      border-left: px(1) solid $bd-grey;
      border-right: px(1) solid $bd-grey;
    }
    .mint-field-core {
      font-size: px(14);
      resize: none;
    }
  }
  .note {
    margin: px(10) 0 px(10) px(10);
    color: rgb(156, 156, 156);
  }
  .result {
    margin-top: px(50);
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
      + .btn {
        margin-top: px(15);
      }
    }
  }
}
</style>

