<!--修改昵称表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="修改昵称"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="用户昵称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入用户昵称" v-decorator="['username',
            {rules: [{required: true, message: '请输入用户昵称'}]}]"></a-input>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import pick from 'lodash.pick' //https://blog.csdn.net/suwu150/article/details/75250749
import { changeUsername } from '@/api/user'

export default {
 name: 'ChangeUsername',
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
      uid: ''
   };
 },

 components: {},

 computed: {},

 methods: {
    change(record) {
      this.visible = true
      this.form.resetFields()
        //通过pick获取编辑record记录需要填充到表单的数据字段
        //注意：setFieldsValue(formData) 填充的数据必须和表单中的 输入元素必须一致
        const {
            form: { setFieldsValue }
        } = this
        const formData = pick(record, 
            ['id', 'username']
        )
        this.uid = formData.id
        this.$nextTick(() => {
            setFieldsValue({
            'username': formData.username,
            })
        })
    },
    handleCancel() {
      //关闭修改昵称表单
      this.visible = false
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          let parameter = {
            'id': this.uid,
            'username': values.username,
          }
          return changeUsername(parameter).then(res => {
            if (res.success === true) {
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
              this.$message.success('修改昵称成功！')
            } else {
              this.confirmLoading = false
              this.$message.error('修改昵称失败！')
            }
          }).catch(err => {
              this.confirmLoading = false
              this.$message.error(`修改昵称出错！: ${err.message}`)
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