<!--写作页面-->
<template>
<a-locale-provider :locale="zh_CN">
    <div class="write_box">
        <div class="top_box">
            <a-row type="flex" align="middle">
                <a-col :span="20">
                    <a-row type="flex" align="middle">
                        <a-col :span="24" >
                            <a-input class="input_box" v-model="title" @change="handleSuffix" :suffix="maxLength" maxLength="100" placeholder="请输入文章标题,长度小于等于100个字符" />
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="4" >
                    <a-row type="flex" align="middle" justify="end">
                        <a-col :span="10" >
                            <a-button @click="handleSave" type="default" title="保存草稿">保存草稿</a-button>
                        </a-col>
                        <a-col :span="10" >
                            <a-button @click="handleSubmit" type="primary" title="发表文章">发表文章</a-button>
                        </a-col>
                    </a-row>
                    
                </a-col>
            </a-row>
        </div>
        <div class="markdown" style="position: relative;height: 620px;z-index: 1;">
            <div class="container" style="height: 620px;z-index: auto !important">
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="handleChange" style="height: 100%;"/>
            </div>
        </div>
        <!-- 脚部公共组件 -->
        <br>
        <footer-tag></footer-tag>
        <!-- 添加文件夹表单组件 -->
        <publish-tag ref="publishModal" @ok="handleOk"></publish-tag>
    </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import FooterTag from '../../Footer'
import PublishTag from '../form/PublishForm'

export default {
 name: 'Writing',
 data () {
    return {
        zh_CN,
        content:'', // 输入的markdown
        html:'',    // 实时转化的html
        title: '',
        bid: undefined,
        maxLength: '100',
   };
 },

 components: {
    mavonEditor,
    FooterTag,
    PublishTag,
 },

 created() {
     this.getMessage();
 },

 computed: {
    
 },

 mounted() {
     //隐藏浏览器滚动条以及关闭浏览器滚动条
   document.body.parentNode.style.overflow = "hidden";
   document.removeEventListener('scroll', this.scrollFun, false);
    //监听浏览器页面离开/刷新事件
   window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
 },

 beforeDestroy(){
     //显示浏览器滚动条并开启滚动功能
    document.body.parentNode.style.overflow = "auto";
    document.addEventListener('scroll', this.scrollFun, false);
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
 },
 
 methods: {
     //接受编辑页面传的文章数据
    getMessage() {
        let bid = this.$route.query.bid;
        if(bid) {
            console.log(`获取到编辑博客信息：${bid}`);
            this.bid = bid;
        }else {
            console.log(`写新博客`);
        }
    },
     /* 计算文章title剩余字数 */
    handleSuffix() {
        this.maxLength = `${100 - this.title.length}`;
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file){
        console.log("图片上传");
        return;
        let formdata = new FormData();

        this.$upload.post('/上传接口地址', formdata).then(res => {
            console.log(res.data);
            this.$refs.md.$img2Url(pos, res.data);
        }).catch(err => {
            console.log(err)
        })
    },
    // 所有操作都会被解析重新渲染
    handleChange(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
    },
    // 提交
    handleSubmit(){
        console.log(this.content);
        console.log(this.html);
        /* 打开发表文章表单组件 */
        if(!this.title) {
            this.$message.error('文章title不能为空！');
            return;
        }
        if(!this.content) {
            this.$message.error('文章内容不能为空！');
            return;
        }
        this.$refs.publishModal.publish(this.title, this.content);
    },
    handleSave() {
        console.log(`文章保存草稿`)
    },
    //发表文章表单成功函数
    handleOk() {
        this.$router.go(0)
    },
    //浏览器页面离开或刷新事件
    beforeunloadHandler(e) {
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
            e.returnValue = '确认离开当前页面吗？系统将不会对当前页面的内容进行保存';
        }
        
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '确认离开当前页面吗？系统将不会对当前页面的内容进行保存';
    },

 }
}

</script>

<style scoped>
    .write_box {
        background-color: #f5f6f7;
    }
    .top_box {
        padding: 15px;
    }
    .input_box {
        height: 42px;
    }
</style>