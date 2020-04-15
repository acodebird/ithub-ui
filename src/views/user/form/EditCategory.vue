<!--编辑文章专栏表单-->
<template>
<a-locale-provider :locale="zh_CN">
    <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="编辑专栏"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="专栏名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入专栏名称" v-decorator="['cname',
            {rules: [{required: true, message: '请输入专栏名称'}]}]" autosize/>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
 name: 'EditCategory',
 data () {
    return {
      zh_CN,
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
      cid: undefined,
   };
 },

 components: {},

 computed: {},

 methods: {
    edit(cid) {
      this.visible = true;
      this.cid = cid;
    },
    handleCancel() {
      //关闭快速回复表单
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
            'cname': values.cname,
          };
          console.log(`编辑专栏${this.cid}:${parameter.cname}`);
        }
      })
    },
 }
}

</script>

<style scoped>

</style>