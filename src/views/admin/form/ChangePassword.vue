<!--管理系统修改密码表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="修改密码"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input :disabled="true" v-decorator="['id']"></a-input>
          </a-form-item>

          <a-form-item label="新密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              placeholder="新密码"
              v-decorator="['password',
              {rules: [{ required: true, message: '密码不能为空' }]}]"
            ></a-input>
          </a-form-item>

          <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              placeholder="确认密码"
              v-decorator="['comfirmPwd',
              {rules: [{ required: true, message: '确认密码不能为空' },{ validator: handleValidConfirm }]}]"
            ></a-input>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import  { changePwd } from '@/api/user'

export default {
 name: 'ChangePassword',
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
    change(id) {
      this.visible = true
      this.form.resetFields()
      //注意：setFieldsValue(formData) 填充的数据必须和表单中的 输入元素必须一致
      const {
            form: { setFieldsValue }
        } = this
      this.$nextTick(() => {
          setFieldsValue({
          'id': id,
          })
      })
    },
    handleCancel() {
      //关闭修改密码表单
      this.visible = false
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return changePwd({...values}).then(res => {
            if (res.success === true) {
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
              this.$message.success(`${res.data}`)
            } else {
              this.confirmLoading = false
              this.$message.error({
                message: `${res.data}`
              })
            }
          }).catch(err => {
              this.confirmLoading = false
              this.$message.error(`修改密码出错！: ${err.message}`)
          }) 
        } else {
            this.confirmLoading = false
        }
      })
    },
   handleValidConfirm(rule, value, callback) {
      //验证确认密码是否一致
      if (value && value !== this.form.getFieldValue('password')) {
        callback('确认密码不一致!');
      }
      callback();
    },
 }
}

</script>

<style scoped>

</style>