<template>
	<div class="protocol">
		<div class="title">信用金融使用条款</div>
		<div class="sub-title">【提示条款】</div>
		<div class="detail">欢迎您与信用晴雨伞（详见定义条款）共同签署本《信用晴雨伞服务协议》（下称“本协议”）并使用信用晴雨伞平台服务。各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</div>
		<div class="sub-title">【审慎阅读】</div>
		<div class="detail">您在申请使用信用晴雨伞流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向城市令乐惠分咨询。</div>
		<div class="section-title">1 定义</div>
		<div class="detail">
			在本协议中，除非上下文有其他的规定，下列表达应作如下释：
			<br/> 信用晴雨伞：指用户实际使用的实体产品。
			<br/> 用户：指具有民事行为能力的信用晴雨伞使用者。
			<br/> 认证用户：指与信用晴雨伞签订《信用晴雨伞服务协议》的用户。一个认证用户仅可以拥有一个账户，每个账户对应唯一的用户名。
			<br/> 账户：指用户认证时设置的账户名，其账号具有唯一性。
			<br/> 借伞服务：指信用晴雨伞通过平台向认证用户提供免费使用信用晴雨伞所拥有伞的服务。信用晴雨伞和认证用户均应遵守《信用晴雨伞使用规则》对该等服务设定的权利义务。
		</div>
		<div class="section-title">2 协议范围</div>
		<div class="detail">
			（1）签约主体
			<br/>本协议由您与信用晴雨伞的经营者共同缔结，本协议对您与信用晴雨伞的运营方均具有合同效力。
			<br/>（2）补充协议
			<br/> 《信用晴雨伞隐私规则》、《信用晴雨伞借伞规则》均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用信用晴雨伞平台，视为您同意上述补充协议。
		</div>

	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/variable";
.protocol {
  height: 100%;
  padding: 0 px(15);
  overflow: auto;
  .title {
    text-align: center;
    font-size: px(16);
    margin: px(17);
  }
  .sub-title {
    margin-bottom: px(10);
    text-align: center;
    color: #000;
  }
  .detail {
	  margin-bottom: px(10);
    line-height: 1.8;
    font-size: px(12);
    color: $text-grey;
  }
}
</style>
