<!--快速回复评论表单-->
<template>
    <div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="快速回复"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="回复内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入回复内容" v-decorator="['content',
            {rules: [{required: true, message: '请输入回复内容'}]}]" autosize/>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
 name: 'QuikReply',
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
      id: undefined,
      articleId: undefined,
   };
 },

 components: {},

 computed: {},

 methods: {
    reply(id,articleId) {
      this.form.resetFields()
      this.visible = true;
      this.id = id
      this.articleId = articleId
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
          // let parameter = {
          //   'content': values.content,
          // };
          console.log(`快速回复评论${this.id}:${this.articleId}:${values.content}`);
          let parameter = {
            "articleId": this.articleId,
            "replyId": this.id,
            "content": values.content
          }
          addComment(parameter).then( res => {
            if(res.success === true) {
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
            }
            this.confirmLoading = false
          }).catch(err => {
            console.log("快速回复评论异常:"+ err.message)
            this.confirmLoading = false
          })
        }
        this.confirmLoading = false
      })
    },
 }
}

</script>

<style scoped>

</style>