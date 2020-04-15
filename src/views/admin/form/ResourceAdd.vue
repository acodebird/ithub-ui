<!--添加权限表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="添加权限"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="权限" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="权限" v-decorator="['permission',
            {rules: [{required: true, message: '请输入权限'}]}]"></a-input>
          </a-form-item>

          <a-form-item label="权限描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="权限描述" v-decorator="['description',
            {rules: [{required: true, message: '请输入权限描述'}]}]"></a-input>
          </a-form-item>

        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { addResource } from '@/api/resource'

export default {
 name: 'ResourceAdd',
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
      roleList: [],
   };
 },

 components: {},

 computed: {},

 methods: {
    add() {
      this.visible = true
      this.form.resetFields()
    },
    handleCancel() {
      //关闭添加权限表单
      this.visible = false
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return addResource({...values}).then(res => {
            if (res.success === true) {
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
              this.$message.success(`${res.data}`)
            } else {
              this.confirmLoading = false
              this.$message.error(`${res.data}`)
            }
          }).catch(err => {
              this.confirmLoading = false
              this.$message.error(`添加权限出错！: ${err.message}`)
          }) 
        } else {
            this.confirmLoading = false
        }
      })
    },
 }
}

</script>

<style scoped>

</style>