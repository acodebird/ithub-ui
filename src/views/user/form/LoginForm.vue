<!--登录表单-->
<template>
<div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <!-- @ok="handleSubmit" -->
    <a-modal
      title="登录"
      :width="500"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      style="z-index: 3000;"
      :footer="null"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="用户邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
            v-decorator="[
                'email',
                {
                rules: [{ required: true, message: '用户邮箱不能为空!' }],
                },
            ]"
            placeholder="用户邮箱"
            style="height:42px;"
            >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-password
                v-decorator="[
                    'password',
                    {
                    rules: [{ required: true, message: '用户密码不能为空!' }],
                    },
                ]"
                placeholder="用户密码"
                style="height:42px;"
                >
                <a-icon slot="prefix" type="safety" style="color: rgba(0,0,0,.25)" />
              </a-input-password>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" style="text-align: center;">
                <a-button type="primary" @click="handleSubmit" class="sign_in_button">
                    登录
                </a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import {login } from '@/api/login'

export default {
 name: 'LoginForm',
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
    login() {
      this.visible = true;
    },
    handleCancel() {
      //关闭登录表单
      this.visible = false;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          login( {...values} ).then(res => {
            if(res.success === true) {
              this.visible = false;
              //this.$notification.success({message: res.data})
              this.$message.success(`${res.data}`)
              this.$emit('ok', values)
              this.$router.go(0)
            }else{
              this.$message.error(`${res.data}`)
            }
          }).catch(err => {
            this.$message.error(`登录失败：请求异常，请稍后再试`)
          })
        }
      })
    },
 }
}

</script>

<style scoped>

</style>