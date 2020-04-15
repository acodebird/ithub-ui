<!--编辑权限表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="编辑权限"
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

          <a-form-item label="权限" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input  v-decorator="['permission',
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
import pick from 'lodash.pick' //https://blog.csdn.net/suwu150/article/details/75250749
import { updateResource } from '@/api/resource'

export default {
 name: 'ResourceEdit',
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
     edit(record) {
         console.log(`编辑权限${record.id}`)
         this.visible = true
         this.form.resetFields()
         //通过pick获取编辑record记录需要填充到表单的数据字段
        //注意：setFieldsValue(formData) 填充的数据必须和表单中的 输入元素必须一致
        const {
            form: { setFieldsValue }
        } = this
        const formData = pick(record, 
            ['id', 'permission', 'description']
        )
        this.rid = formData.rid
        this.$nextTick(() => {
            setFieldsValue({
            'id': formData.id,
            'permission': formData.permission,
            'description': formData.description,
            })
        })
     },
     handleCancel() {
      //关闭编辑用户表单
      this.visible = false
     },
     handleSubmit() {
        console.log(`提交编辑权限表单`)
        const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          return updateResource({...values}).then(res => {
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
              this.$message.error(`编辑权限出错！: ${err.message}`)
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