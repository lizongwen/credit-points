<template>
	<div class="apply">
		<div class="apply-main"  v-if="applyFlag=='applying'">
			<div class="title">是否确认申请</div>
			<div class="apply-icon">
				<img src="../../img/talent/ydy@2x.png" alt="" srcset="">
			</div>
			<div class="desc">
				乐惠分950分以上，享受一对一咨询服务<br/> 由大厅引导员一对一进行专门办事流程指引
				<br/> 和具体指导，每个账号一天最多申请2次
			</div>
			<div class="btn-wrap">
				<button class="btn btn-primary btn-block ">确认</button>
				<button class="btn btn-default btn-block">取消</button>
			</div>
		</div>
		<div class="apply-success" v-else-if="applyFlag=='success'">

		</div>
		<div class="apply-fail" v-else-if="applyFlag=='fail'">

		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
	data(){
		return{
			applyFlag:'applying'
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.apply {
  height: 100%;
  overflow: hidden;
  .apply-main {
    margin-top: px(50);
    height: inherit;
    text-align: center;
    .title {
      margin-bottom: px(15);
      font-size: px(18);
	}
	.apply-icon{
		margin-bottom: px(20);
	}
	.desc{
		margin-bottom: px(40)
	}
	.btn-wrap{
		width: px(240);
		margin: 0 auto;
		.btn-block{
			+.btn-block{
				margin-top: px(20);
			}
		}
	}
  }
}
</style>
