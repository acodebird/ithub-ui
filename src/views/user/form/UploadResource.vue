<!--上传资源表单-->
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
      title="上传资源"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          
          <a-form-item label="上传资源" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <template>
                <!-- :beforeUpload="beforeUpload" -->
            <a-upload-dragger
                action="/api/qiniu/uploadFile"
                accept=".zip,.rar"
                :fileList="fileList"
                :disabled="fileList.length === 1"
                @change="handleChange"
                :remove="handleRemove"
                :beforeUpload="beforeUpload"
                style="width: 200px;"
            >
                <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">点击上传资源，只接收压缩包格式上传(资源大小不允许超过20M)</p>
            </a-upload-dragger>
            <span v-show="showTip" style="color: red;">*请上传资源</span>
            </template>
          </a-form-item>
          <a-form-item label="资源名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入资源名称" v-decorator="['title',
            {rules: [{required: true, message: '请输入资源名称'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="所需积分" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['integral',{rules: [{required: true, message: '请选择所需积分'}]}]" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="0">0</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="4">4</a-select-option>
              <a-select-option value="5">5</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="资源类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select v-decorator="['type',{rules: [{required: true, message: '请选择资源类型'}]}]" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="FILE">文档类</a-select-option>
              <a-select-option value="TOOL">工具类</a-select-option>
              <a-select-option value="CODE">代码类</a-select-option>
              <a-select-option value="OTHER">其他</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="资源描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea placeholder="请输入资源描述" v-decorator="['description',
            {rules: [{required: true, message: '请输入资源描述'}]}]" rows="3" autosize/>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { uploadFile,deleteFile } from '@/api/upload'
import { addDocument } from '@/api/document'

export default {
 name: 'UploadResource',
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
      user: {},
      url: '',
      isUpload: false,
      showTip: false,
      fileList: [],
   };
 },

 components: {},

 computed: {},

 methods: {
    upload(user) {
      this.visible = true
      this.user = user
      this.form.resetFields()
      this.showTip = false
    },
    handleCancel() {
      //关闭编辑资源表单
      this.visible = false;
    },
    handleSubmit() {
      console.log("提交资源")
      const {
        form: { validateFields }
      } = this;
      if(!this.isUpload) {
        this.showTip = true
        return
      }
      this.confirmLoading = true
      validateFields((errors, values) => {
          if (!errors && this.isUpload) {
            let paramter = {
                "title": values.title,
                "integral": values.integral,
                "type": values.type,
                "description": values.description,
                "url": this.url,
            }
            addDocument(paramter).then(res => {
                if(res.success === true) {
                    this.url = ''
                    this.isUpload = false
                    this.showTip = false
                    this.fileList = []
                    this.confirmLoading = false
                    this.visible = false
                    this.$emit('ok', values)
                }
                this.confirmLoading = false
            }).catch(err => {
                this.confirmLoading = false
                console.log('资源上传异常',err.message)
            })
        }else {
            this.confirmLoading = false
        }
      })
    },
    //文件上传变换函数
    handleChange(info) {
      if (info.file.status === 'done') {
        this.url = info.file.response.data
        this.isUpload = true
        this.showTip = false
        this.$message.success(`文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败`)
      }
    },
    //文件上传前函数，返回false停止上传
    beforeUpload(file) {
      console.log("上传的文件大小：" + file.size)
      if(file.size > 20971520) {
          this.$message.error(`上传文件的大小超过20M`)
          return false
      }
      if(this.isUpload) {
          this.$message.warning(`文件已经上传`)
      }
      this.fileList = [...this.fileList, file]
      return !this.isUpload;
    },
    //移除已上传资源函数
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      deleteFile({"url": this.url}).then( () => {
        this.isUpload = false
        this.showTip = true
        this.$message.success(`删除上传资源成功`)
      }).catch(err => {
        console.log('删除上传资源异常',err.message)
      })
    },
 }
}

</script>

<style scoped>

</style>