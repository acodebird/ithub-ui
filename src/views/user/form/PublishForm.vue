<!--发表文章表单，选择创建标签、文章专栏等操作-->
<template>
<div>
    <!--
        visible:是否显示当前a-modal
        confirmLoading:加载动画效果
         @ok="handleSubmit"         提交表单数据给后台
         @cancel="handleCancel"     this.visible=false
    -->
    <a-modal
      title="发表文章"
      :width="660"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      style="z-index: 3000;"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="文章标签" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <div>
                <template v-for="tag in tags">
                  <a-tooltip v-if="tag.length > 10" :key="tag" :title="tag">
                      <a-tag :key="tag" :closable="true" @close="() => handleClose(tag)">
                      {{`${tag.slice(0, 10)}...`}}
                      </a-tag>
                  </a-tooltip>
                  <a-tag v-else :key="tag" :closable="true" @close="() => handleClose(tag)">
                      {{tag}}
                  </a-tag>
                </template>
                <a-input
                v-if="inputVisible"
                ref="input"
                type="text"
                size="small"
                :style="{ width: '178px' }"
                :value="inputValue"
                @change="handleInputChange"
                @blur="handleInputConfirm"
                @keyup.enter="handleInputConfirm"
                />
                <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
                  <a-icon type="plus" /> 添加标签
                </a-tag>
            </div>
          </a-form-item>
          <a-form-item label="分类专栏" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <div>
                <template v-if="section">
                  <a-tooltip v-if="section.length > 15" :key="section" :title="section">
                    <a-tag :key="section" :closable="true" @close="() => handleClose2(section)">
                    {{`${section.slice(0, 15)}...`}}
                    </a-tag>
                  </a-tooltip>
                  <a-tag v-else :key="section" :closable="true" @close="() => handleClose2(section)">
                      {{section}}
                  </a-tag>
                </template>
                <a-input
                v-if="inputVisible2"
                ref="input2"
                type="text"
                size="small"
                :style="{ width: '178px' }"
                :value="inputValue2"
                @change="handleInputChange2"
                @blur="handleInputConfirm2"
                @keyup.enter="handleInputConfirm2"
                />
                <a-tag v-else @click="showInput2" style="background: #fff; borderStyle: dashed;">
                  <a-icon type="plus" /> 创建专栏
                </a-tag>
            </div>
            <div v-show="sections.length > 0">
              <a-select
                mode="default"
                style="width: 100%"
                placeholder="选择已有专栏"
                @change="handleChange"
                allowClear
                v-decorator="['section']"
              >
                <a-select-option v-for="s in sections" :key="s.name">
                  {{s.name}}
                </a-select-option>
              </a-select>
            </div>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { loadAll } from '@/api/column'
import { addArticle,updateArticle } from '@/api/article'

export default {
 name: 'PublishForm',
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
      visible: false, //是否显示表单
      confirmLoading: false, //确认提交效果
      form: this.$form.createForm(this), //创建表单
      tags: [], //标签数组
      inputVisible: false, //显示标签输入框
      inputValue: '', //新建标签内容
      inputVisible2: false, //显示专栏输入框
      inputValue2: '', //输入框专栏内容
      section: '', //新建专栏
      sections: [], //已创建的专栏数组
      value: '[]', //选中已有的专栏
      title: '', //文章title
      content: '', //文章的markdown内容
      html: '', //文章的html内容
      id: undefined, //编辑文章的id
   };
 },

 components: {},

 computed: {},

 methods: {
    //表单被调用函数，主要传递数据和显示表单
    publish(paramter) {
      this.title = paramter.title
      this.content = paramter.content
      this.html = paramter.html
      this.tags = paramter.tags
      this.section = paramter.section
      this.id = paramter.id
      console.log(this.id)
      this.visible = true
      //加载用户专栏
      this.loadAllColumn()
    },
    //关闭表单
    handleCancel() {
      //关闭发表文章表单
      this.visible = false;
    },
    //表单提交事件
    handleSubmit() {
      if(!this.section) {
        this.$notification.error({
          message: '错误',
          description: '请选择或创建文章专栏!'
        })
        return;
      }
      let parameter = {
        "title": this.title,
        "content": this.content,
        "html": this.html,
        "label": this.tags.join(","),
        "section": this.section,
        "status": "NORMAL",
      }
      if(this.id != undefined) {
        console.log("编辑文章后发表文章")
        debugger
        let edit = {
          "id": this.id,
        }
        updateArticle({...parameter, ...edit}).then( res => {
            if (res.success === true) {
              this.tags = []
              this.section = ''
              this.form.resetFields()
              this.visible = false
              console.log('编辑文章成功')
              this.$notification.success({message: "编辑文章成功"})
              this.$router.push({path:'/article/detail',query: {"id": res.data}})
            }
        }).catch(err => {
            console.log('发表文章出现异常',err.message)
        })

      }else{
        console.log("新建文章后发表文章")
        addArticle(parameter).then( res => {
            if (res.success === true) {
              this.tags = []
              this.section = ''
              this.form.resetFields()
              this.visible = false
              console.log('发表文章成功')
              this.$notification.success({message: "发表文章成功"})
              this.$router.push({path:'/article/detail',query: {"id": res.data}})
            }
        }).catch(err => {
            console.log('发表文章出现异常',err.message)
        })
      }
      return
      //console.log(`文章title：${this.title};文章md内容：${this.content};文章html内容：${this.html};文章标签：${this.tags};文章专栏：${this.section}`);
    },
    //加载用户所有专栏
    loadAllColumn() {
      loadAll().then( res => {
          if (res.success === true) {
            this.sections = res.data
          }
      }).catch(err => {
          console.log('加载用户专栏出错',err.message)
      })
    },
    //动态添加标签相关函数
    //关闭标签
    handleClose(removedTag) {
        const tags = this.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.tags = tags;
    },
    //显示标签输入框并获取焦点
    showInput() {
        if(this.tags.length >= 3) {
          this.$notification.info({
            message: '提示',
            description: "最多只能创建3个标签",
          })
          return;
        }
        this.inputVisible = true;
        this.$nextTick(function() {
            this.$refs.input.focus();
        });
    },
    //标签输入框变化函数，保存标签输入内容
    handleInputChange(e) {
        this.inputValue = e.target.value;
    },
    //确认标签函数
    handleInputConfirm() {
        const inputValue = this.inputValue;
        if(inputValue.length > 15) {
          this.$notification.error({
            message: '提示',
            description: '标签长度要求小于15个字符',
          })
          return;
        }
        let tags = this.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        Object.assign(this, {
            tags,
            inputVisible: false,
            inputValue: '',
        });
    },
    //动态添加专栏相关函数
    //关闭专栏
    handleClose2(removedSection) {
        const section = this.sections.filter(section => section === removedSection);
        console.log(section);
        if(section) {
          this.form.resetFields();
        }
        this.section = '';
    },
    //显示专栏输入框并获取焦点
    showInput2() {
        if(this.section) {
          this.$notification.info({
            message: '提示',
            description: "文章只能属于一个专栏",
          })
          return;
        }
        this.inputVisible2 = true;
        this.$nextTick(function() {
            this.$refs.input2.focus();
        });
    },
    //专栏输入框变化函数，保存专栏输入内容
    handleInputChange2(e) {
        this.inputValue2 = e.target.value;
    },
    //确认专栏函数
    handleInputConfirm2() {
        const inputValue = this.inputValue2;
        if(inputValue.length > 20) {
          this.$notification.error({
            message: '提示',
            description: '专栏长度要求不超过20个字符',
          })
          return;
        }
        let section = inputValue;
        console.log(section);
        Object.assign(this, {
            section,
            inputVisible2: false,
            inputValue2: '',
        });
    },
    //专栏选择框改变函数
    handleChange(value) {
      this.section = value
    },
 }
}

</script>

<style scoped>

</style>