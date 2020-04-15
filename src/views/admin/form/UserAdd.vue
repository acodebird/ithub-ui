<!--添加用户表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="添加用户"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="用户名字" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="用户名字" v-decorator="['username',
            {rules: [{required: true, message: '请输入用户名字'}]}]"></a-input>
          </a-form-item>

          <a-form-item label="用户邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="用户邮箱" v-decorator="['email',
            {rules: [{required: true, message: '请输入用户邮箱'},{validator: handleCheckEmail}]}]"></a-input>
          </a-form-item>

          <a-form-item label="用户密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              placeholder="用户密码"
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

          <a-form-item label="用户角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['roleId', 
            {rules: [{required: true, message: '请选择用户角色'}]}]" 
            placeholder="请选择">
              <a-select-option v-for="role in roleList" :key="role.id" :value="role.id">
                  {{role.description}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
import { addUser } from '@/api/user'

export default {
 name: 'UserAdd',
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
      //加载角色列表
      this.handleRoleList()
    },
    handleRoleList() {
      //加载角色列表
      getRoleList().then(res => {
          if (res.success === true) {
              console.log(res.data.content)
              this.roleList = res.data.content
          } else if(res.data == '403') {
              //没有权限访问，跳转带提示页面
              this.$notification.warning({message: '没有权限加载角色列表'})
          } else {
              this.$notification.error({message: '请求角色列表出现错误，请稍后再试'})
          }
      }).catch(ex => {
          this.$notification.error({message: '请求角色列表出现错误，请稍后再试'})
      });
    },
    handleCancel() {
      //关闭添加用户表单
      this.visible = false
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return addUser({...values}).then(res => {
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
              this.$message.error(`添加用户出错！: ${err.message}`)
          }) 
        } else {
            this.confirmLoading = false
        }
      })
    },
    handleCheckEmail(rule, value, callback) {
      //验证邮箱格式
      if (value!="" && (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)))) {
        callback('请输入正确的邮箱')
      }
      callback()
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