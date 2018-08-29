<template>
	<div class="credit-card">
		<div class="credit-slogan">
			<img src="../../img/finance/credit_card_slogan.png">
		</div>
		<ul class="credit-card-list">
			<li class="credit-card-item">
				<div class="l-box">
					<img src="../../img/finance/card-1.png">
					<div class="content">
						<p class="title">最高额度
							<span>8000</span>元</p>
						<p class="desc">乐惠分800以上</p>
					</div>
				</div>
				<div class="r-box">
					<button class="btn btn-golden" @click="apply">申请</button>
				</div>
			</li>
			<li class="credit-card-item">
				<div class="l-box">
					<img src="../../img/finance/card-2.png">
					<div class="content">
						<p class="title">最高额度
							<span>20000</span>元</p>
						<p class="desc">乐惠分850以上</p>
					</div>
				</div>
				<div class="r-box">
					<button class="btn btn-golden" @click="apply">申请</button>
				</div>
			</li>
			<li class="credit-card-item">
				<div class="l-box">
					<img src="../../img/finance/card-3.png">
					<div class="content">
						<p class="title">最高额度
							<span>50000</span>元</p>
						<p class="desc">乐惠分900以上</p>
					</div>
				</div>
				<div class="r-box">
					<button class="btn btn-golden btn-disabled" disabled @click="apply">申请</button>
				</div>
			</li>
		</ul>
		<div class="score-tip">乐惠分
			<span class="score">999</span>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    apply() {
      let url =
        "https://creditcard.cmbc.com.cn/wsv2/?enstr=D5BPBrUR4ksuO2c5rku%2f49hNZgDUiVUadCIevSHNs%2bkF2eQ0XghIyNLT5ExxEGbXkni66LncfY8OLaITZQdNdoTlQrViDuMMpTiD4XSAJlt6rdy%2fbLoG5Z%2fnipfK1fmqq9LJb2RmfHkOAEGU8BvIPj8UdbqetSKvpUlTMvhci7odCQcEqTTyFYTxFwvAkeVAByR0qbUIt6y%2frkN7%2bXvqSkK44xTiQJn79pJET6ASYw8ZZBd9Hdkc9TS9I8pbclDpf8UNQ882%2f5lOX1Ufv2w3kedK9p9sRXgaDC%2faruIueJcjZzgkcNMQ%2fbpCiriDQVX83siIL6j5bZYVvgj0%2bQ9N%2fg%3d%3d";
      location.href = url;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.credit-card {
  height: 100%;
  background: url("../../img/finance/xyksq.png") no-repeat bottom;
  background-size: cover;
  overflow: hidden;
  .credit-slogan {
    width: px(205);
    margin: px(58) auto px(28);
  }
  .credit-card-list {
    .credit-card-item {
      display: flex;
      width: px(295);
      height: px(100);
      margin: 0 auto;
      &:not(:last-child) {
        margin-bottom: px(20);
      }
      .l-box {
        display: flex;
        position: relative;
        width: px(200);
        padding-left: px(10);
        border-top-left-radius: px(4);
        border-bottom-left-radius: px(4);
        background: #fff;
        background: radial-gradient(
              circle at top right,
              transparent px(10),
              #fff 0
            )
            top right,
          radial-gradient(circle at bottom right, transparent px(10), #fff 0)
            bottom right;
        background-size: 100% 50%;
        background-repeat: no-repeat;
        align-items: center;
        &::after {
          position: absolute;
          top: px(10);
          right: -1px;
          content: "";
          height: px(78);
          border: 1px dashed $bd-grey;
        }
        img {
          width: px(40);
          height: px(44);
        }
        .content {
          padding-left: px(10);
          font-size: px(12);
          line-height: px(22);
          .title {
            > span {
              font-size: px(24);
            }
          }
          .desc {
            color: $text-grey;
          }
        }
      }
      .r-box {
        display: flex;
        flex: 1;
        border-top-right-radius: px(4);
        border-bottom-right-radius: px(4);
        background: #fff;
        background: radial-gradient(
              circle at top left,
              transparent px(10),
              #fff 0
            )
            top right,
          radial-gradient(circle at bottom left, transparent px(10), #fff 0)
            bottom right;
        background-size: 100% 50%;
        background-repeat: no-repeat;
        justify-content: center;
        align-items: center;
        .btn {
          box-shadow: 0 2px 6px 0 #e4b641;
          &.btn-disabled {
            box-shadow: none;
          }
        }
      }
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
    background-image: linear-gradient(-121deg, #fff551 3%, #d7c30e 100%);
    .score {
      font-size: px(14);
      vertical-align: px(-1);
    }
  }
}
</style>

