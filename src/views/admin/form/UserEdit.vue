<!--编辑用户表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="编辑用户"
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

          <a-form-item label="用户邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input :disabled="true"  v-decorator="['email']"></a-input>
          </a-form-item>

          <a-form-item label="用户名字" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="用户名字" v-decorator="['username',
            {rules: [{required: true, message: '请输入用户名字'}]}]"></a-input>
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
import pick from 'lodash.pick' //https://blog.csdn.net/suwu150/article/details/75250749
import { getRoleList } from '@/api/role'
import { updateUser } from '@/api/user'

export default {
 name: 'UserEdit',
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
     edit(record) {
         console.log(`编辑用户:${record.id}`)
         this.visible = true
         this.form.resetFields()
         //通过pick获取编辑record记录需要填充到表单的数据字段
        //注意：setFieldsValue(formData) 填充的数据必须和表单中的 输入元素必须一致
        const {
            form: { setFieldsValue }
        } = this
        const formData = pick(record, 
            ['id', 'username', 'role', 'email']
        )
        this.rid = formData.rid
        this.$nextTick(() => {
            setFieldsValue({
            'id': formData.id,
            'username': formData.username,
            'roleId': formData.role.id,
            'email': formData.email,
            })
        })

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
      //关闭编辑用户表单
      this.visible = false
     },
     handleSubmit() {
        console.log(`提交编辑表单`)
        const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return updateUser({...values}).then(res => {
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
              this.$message.error(`编辑用户出错！: ${err.message}`)
          }) 
        } else {
            this.confirmLoading = false
        }
      })
     },
     handleValidConfirm(rule, value, callback) {
      //验证确认密码是否一致
      if (!this.form.getFieldValue('password') && value && value !== this.form.getFieldValue('password')) {
        callback('确认密码不一致!');
      }
      callback();
    },
 }
}

</script>

<style scoped>

</style>