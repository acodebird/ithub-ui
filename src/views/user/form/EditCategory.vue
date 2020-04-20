<!--编辑文章专栏表单-->
<template>
<a-locale-provider :locale="zh_CN">
    <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="编辑专栏"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="专栏名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入专栏名称" v-decorator="['name',
            {rules: [{required: true, message: '请输入专栏名称'}]}]">
            </a-input>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { updateColumn } from '@/api/column'

export default {
 name: 'EditCategory',
 data () {
    return {
      zh_CN,
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
      id: undefined,
   };
 },

 components: {},

 computed: {},

 methods: {
    edit(id) {
      this.visible = true;
      this.id = id;
    },
    handleCancel() {
      //关闭快速回复表单
      this.visible = false;
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this;
      this.confirmLoading = true;
      validateFields((errors, values) => {
        if (!errors) {
          let parameter = {
            'id': this.id,
            'name': values.name,
          }
          console.log(`编辑专栏${parameter.id}:${parameter.name}`)
          updateColumn(parameter).then( res => {
            if(res.success === true) {
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
              this.$message.success(`编辑专栏成功`)
            }else {
              this.confirmLoading = false
              this.$message.error(`编辑专栏失败`)
            }
            this.confirmLoading = false
          }).catch( err => {
            this.confirmLoading = false
            console.log("编辑专栏异常" + err.message)
          })
        }else {
          this.confirmLoading = false
        }
      })
    },
 }
}

</script>

<style scoped>

</style>