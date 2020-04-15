<!--编辑消息表单-->
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
          <a-form-item label="消息ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input :disabled="true" v-decorator="['id']"></a-input>
          </a-form-item>
          <a-form-item label="消息Title" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="消息Title" v-decorator="['title',
            {rules: [{required: true, message: '请输入消息Title'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="消息内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="消息内容" v-decorator="['msg',
            {rules: [{required: true, message: '请输入消息内容'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="发布时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-date-picker v-model="createTime" showTime placeholder="请选择时间" />
            <!-- <a-date-picker v-model="createTime" showTime placeholder="不选择时间则立即发布" @change="onChange" /> -->
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import pick from 'lodash.pick' //https://blog.csdn.net/suwu150/article/details/75250749
import moment from 'moment' //日期处理moment.js工具模块
import { updateNotices } from '@/api/notices'

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
    edit(record) {
      this.visible = true
      this.form.resetFields()
      //通过pick获取编辑record记录需要填充到表单的数据字段
        //注意：setFieldsValue(formData) 填充的数据必须和表单中的 输入元素必须一致
        const {
            form: { setFieldsValue }
        } = this
        const formData = pick(record, 
            ['id', 'title', 'msg']
        )
        this.createTime = moment(record.createTime)
        this.rid = formData.rid
        this.$nextTick(() => {
            setFieldsValue({
            'id': formData.id,
            'title': formData.title,
            'msg': formData.msg,
            })
        })
    },
    handleCancel() {
      //关闭编辑消息表单
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
            //this.createTime = moment(this.createTime).format('YYYY-MM-DD HH:mm:ss')
            this.createTime = moment(this.createTime).format('YYYY-MM-DD HH:mm:ss')
            parameter = {
                "id": values.id,
                "msg": values.msg,
                "title": values.title,
                "createTime" : this.createTime,
            }
          }else {
              parameter = {
                  "id": values.id,
                "msg": values.msg,
                "title": values.title,
            }
          }
          return updateNotices(parameter).then(res => {
              debugger;
            if (res.success === true) {
              this.createTime = undefined
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
              this.$message.error(`编辑消息出错！: ${err.message}`)
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