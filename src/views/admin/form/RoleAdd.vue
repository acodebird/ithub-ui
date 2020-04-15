<!--添加角色表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="添加角色"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="角色名字" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="角色名字" v-decorator="['name',
            {rules: [{required: true, message: '请输入角色名字'}]}]"></a-input>
          </a-form-item>

          <a-form-item label="角色描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="角色描述" v-decorator="['description',
            {rules: [{required: true, message: '请输入角色描述'}]}]"></a-input>
          </a-form-item>

        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { addRole } from '@/api/role'

export default {
 name: 'RoleAdd',
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
      this.visible = true
      this.form.resetFields()
    },
    handleCancel() {
      //关闭添加角色表单
      this.visible = false
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return addRole({...values}).then(res => {
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
              this.$message.error(`添加角色出错！: ${err.message}`)
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