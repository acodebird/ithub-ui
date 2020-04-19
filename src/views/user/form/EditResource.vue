<!--编辑资源表单-->
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
      title="编辑资源"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="资源名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入资源名称" v-decorator="['name',
            {rules: [{required: true, message: '请输入资源名称'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="所需积分" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['integral',{rules: [{required: true, message: '请选择所需积分'}]}]" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="0">0</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="4">4</a-select-option>
              <a-select-option value="5">5</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="资源类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['type',{rules: [{required: true, message: '请选择资源类型'}]}]" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="0">文档类</a-select-option>
              <a-select-option value="1">工具类</a-select-option>
              <a-select-option value="2">代码类</a-select-option>
              <a-select-option value="3">其他</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="资源描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入资源描述" v-decorator="['description',
            {rules: [{required: true, message: '请输入资源描述'}]}]" rows="3" autosize/>
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
 name: 'EditResource',
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
      rid: undefined,
   };
 },

 components: {},

 computed: {},

 methods: {
    edit(rid) {
      this.visible = true;
      this.rid = rid;
    },
    handleCancel() {
      //关闭编辑资源表单
      this.visible = false;
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this;
      this.confirmLoading = true;
      validateFields((errors, values) => {
        if (!errors) {
          console.log(`编辑专栏${this.rid}:${values.name}`);
        }
      })
    },
 }
}

</script>

<style scoped>

</style>