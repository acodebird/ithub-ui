<!--添加消息表单-->
<template>
 <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="发布消息"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="消息Title" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="消息Title" v-decorator="['title',
            {rules: [{required: true, message: '请输入消息Title'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="消息内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="消息内容" v-decorator="['msg',
            {rules: [{required: true, message: '请输入消息内容'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="发布时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-date-picker v-model="createTime" showTime placeholder="不选择时间则立即发布" />
            <!-- <a-date-picker v-model="createTime" showTime placeholder="不选择时间则立即发布" @change="onChange" /> -->
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment' //日期处理moment.js工具模块
import { addNotices } from '@/api/notices'

export default {
 name: 'NoticesAdd',
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
      createTime: undefined,
   };
 },

 components: {},

 computed: {},

 methods: {
    add() {
      this.visible = true
      this.createTime = undefined
      this.form.resetFields()
    },
    handleCancel() {
      //关闭发布消息表单
      this.visible = false
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          let parameter = {}
          if (this.createTime !== undefined && this.createTime != null) {
            this.createTime = moment(this.createTime).format('YYYY-MM-DD HH:mm:ss')
            parameter = {
                "createTime" : this.createTime,
                "msg": values.msg,
                "title": values.title,
            }
          }else {
            parameter = {
                "msg": values.msg,
                "title": values.title,
            }
          }
          return addNotices(parameter).then(res => {
            if (res.success === true) {
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', parameter)
              this.createTime = undefined
              this.$message.success(`${res.data}`)
            } else {
              this.confirmLoading = false
              this.$message.error(`${res.data}`)
            }
          }).catch(err => {
              this.confirmLoading = false
              this.$message.error(`发布消息出错！: ${err.message}`)
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