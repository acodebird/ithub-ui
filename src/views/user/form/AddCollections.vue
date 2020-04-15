<!--添加收藏夹表单-->
<template>
    <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="添加收藏夹"
      :width="440"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入收藏夹标题" v-decorator="['title',
            {rules: [{required: true, message: '请输入收藏夹标题'}]}]"></a-input>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
export default {
 name: 'AddCollections',
 data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
   };
 },

 components: {},

 computed: {},

 methods: {
    add() {
      this.visible = true;
    },
    handleCancel() {
      //关闭添加收藏夹表单
      this.visible = false;
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this;
      this.confirmLoading = true;
      validateFields((errors, values) => {
        if (!errors) {
          let parameter = {
            'title': values.title,
          };
          console.log(`添加收藏夹${parameter.title}`);
        }
      })
    },
 }
}

</script>

<style scoped>

</style>