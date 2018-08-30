/**
* author: 王蒙Sanm
* description: 申请狀態
**/
<<template>
  <div class="application-status">
      <div class="submit-application" v-if="status === 1">
        <div class="application-img">
          <img src="../../img/travel/wait.png"/>
        </div>
        <div class="submit-info">
            <span>提交成功</span>
        </div>
        <div class="submit-title">
            <span>请等待管理人员审批处理 </span>
        </div>
        <div class="application-btn">
            <button class="btn application-btn-return">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</button>
        </div>
      </div>
      <div class="submit-application" v-else-if="status === 2">
        <div class="application-img">
          <img src="../../img/travel/wait.png"/>
        </div>
        <div class="submit-info">
            <span>恭喜您申请成功！</span>
        </div>
        <div class="submit-title-unpass">
            <span>您可以在易开出行APP中专享
                “乐惠分押金减半”套餐 </span>
        </div>
        <div class="application-btn">
            <button class="btn application-btn-return">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;认</button>
        </div>
      </div>
      <div class="submit-application" v-else>
        <div class="application-img">
          <img src="../../img/travel/wait.png"/>
        </div>
        <div class="submit-info">
            <span>很遗憾您的申请未通过</span>
        </div>
        <div class="submit-title-unpass">
            <span>原因：非易开出行新用户
                  您可以申请其他激励措施 </span>
        </div>
        <div class="application-btn">
            <button class="btn application-btn-return">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;认</button>
        </div>
      </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            status: 3
        }
    },
    methods: {

    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/func";
@import "../../style/mixin";
@import "../../style/variable";
.application-status {
    height: 100%;
    .submit-application {
        text-align: center;
        .application-img {
            display: inline-block;
            height: px(85);
            width: px(85);
            margin-top: px(50);
        }
        .submit-info {
            font-size: px(18);
            line-height: px(25);
            margin-top: px(15);
        }
        .submit-title {
            font-size: px(16);
            line-height: px(21);
            margin-top: px(20);
        }
        .submit-title-unpass{
            margin: 0 auto;
            font-size: px(16);
            line-height: px(21);
            margin-top: px(20);
            width: px(180)
        }
        .application-btn {
            width: px(240);
            height: px(36);
            margin: 0 auto;
            margin-top: 61px;
            .application-btn-return {
                width: 100%;
                background-color: #D8D8D8;
            }
        }
    }
}
</style>


