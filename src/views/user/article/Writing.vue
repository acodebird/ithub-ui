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
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="handleChange" style="height: 100%;"/>
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
import { isLogin } from '@/api/login'
import { uploadImg,deleteImg,getArticle,addArticle,updateArticle } from '@/api/article'

export default {
 name: 'Writing',
 data () {
    return {
        zh_CN,
        content:'', // 输入的markdown
        html:'',    // 实时转化的html
        title: '', //文章title
        tags: [], //文章标签
        section: '', //文章专栏
        id: this.$route.query.id, //编辑时的文章id
        maxLength: '100',
   };
 },

 components: {
    mavonEditor,
    FooterTag,
    PublishTag,
 },

 created() {
    this.handleIsLogin()
    if(this.id != undefined) {
        this.handleLoadArticle() //加载编辑文章的信息
    }
    //this.getMessage() //获取编辑文章id
 },

 computed: {
    
 },

 mounted() {
     //隐藏浏览器滚动条以及关闭浏览器滚动条
   document.body.parentNode.style.overflow = "hidden";
   document.removeEventListener('scroll', this.scrollFun, false);
    //监听浏览器页面离开/刷新事件
   //window.addEventListener('beforeunload', this.beforeunloadHandler, false)
   this.createBeforeunloadHandler()
 },

 beforeDestroy(){
     //显示浏览器滚动条并开启滚动功能
    document.body.parentNode.style.overflow = "auto";
    document.addEventListener('scroll', this.scrollFun, false);
    //window.removeEventListener('beforeunload', this.beforeunloadHandler, false)
    this.destroyedBeforeunloadHandler();
 },
 
 methods: {
     //接受编辑页面传的文章数据
    getMessage() {
        let id = this.$route.query.id;
        if(id) {
            console.log(`获取到编辑博客信息：${id}`);
            this.id = id;
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
        //return;
        let formdata = new FormData();
        formdata.append('file', $file)
        uploadImg(formdata).then( res => {
            if (res.success === true) {
                this.$refs.md.$img2Url(pos, res.data);
            }
        }).catch(err => {
            console.log('文章图片上传出现异常',err.message)
        })
    },
    //删除文章的图片
    $imgDel(pos) {
      deleteImg({"url": pos[0]}).then( () => {
        this.$notification.success({message: '图片删除成功'})
      }).catch(err => {
        console.log('文章图片删除出现异常',err.message)
      })
    },
    // 所有操作都会被解析重新渲染
    handleChange(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
    },
    // 提交
    handleSubmit(){
        this.handleIsLogin()
        // console.log(this.content);
        // console.log(this.html);
        /* 打开发表文章表单组件 */
        if(!this.title) {
            this.$message.error('文章title不能为空！');
            return;
        }
        if(!this.content) {
            this.$message.error('文章内容不能为空！');
            return;
        }
        let paramter = {
            "title": this.title,
            "content": this.content,
            "html": this.html,
            "tags": this.tags,
            "section": this.section,
            "id": this.id
        }
        this.$refs.publishModal.publish(paramter);
    },
    handleSave() {
        this.handleIsLogin()
        let parameter = {
            "title": this.title,
            "content": this.content,
            "html": this.html,
            "status": "DRAFT",
        }
        if(this.id != undefined) {
            console.log("编辑文章后保存草稿")
            let edit = {
                "id": this.id,
            }
            updateArticle({...parameter, ...edit}).then( res => {
                if (res.success === true) {
                    console.log('编辑文章保存草稿成功')
                    this.$notification.success({message: "编辑文章成功"})
                    this.$router.push({path:'/article/detail',query: {"id": res.data}})
                }
            }).catch(err => {
                console.log('发表文章出现异常',err.message)
            })
        }else {
            console.log("新建文章后保存草稿")
            addArticle(parameter).then( res => {
                if (res.success === true) {
                    console.log('发表文章保存草稿成功')
                    this.$notification.success({message: "发表文章成功"})
                    this.$router.push({path:'/article/detail',query: {"id": res.data}})
                }
            }).catch(err => {
                console.log('发表文章出现异常',err.message)
            })
        }
    },
    //发表文章表单成功函数
    handleOk() {
        this.$router.go(0)
    },
    //判断是否登录函数
    handleIsLogin() {
         //判断用户是否登录
        isLogin().then(res => {
            if (res.success === false) {
                this.$router.push({path: '/login'})
                return
            }
        }).catch(ex => {
            console.log('isLogin error',ex.message)
        })
    },
    //加载编辑的文章信息
    handleLoadArticle() {
        getArticle(this.id).then(res => {
       if(res.success === true) {
         this.title = res.data.title
         this.content = res.data.content
         this.html = res.data.html
         this.tags = res.data.label.split(",")
         this.section = res.data.column.name
         this.handleSuffix() //计算文章title剩余字数
       }
     }).catch(ex => {
       console.log('获取单个文章信息出现异常',err.message)
     })
    },
    //浏览器页面离开或刷新事件
    beforeunloadHandler(e) {
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
            e.returnValue = '确认离开当前页面吗？系统将不会对当前页面的内容进行保存1';
        }
        
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '确认离开当前页面吗？系统将不会对当前页面的内容进行保存1';
    },
    //添加beforeunload监听事件
    createBeforeunloadHandler() {
        //window.addEventListener(‘beforeunload‘, e => this.beforeunloadHandler(e));
        window.addEventListener('beforeunload', this.beforeunloadHandler, false);
    },
    //移除beforeunload事件
    destroyedBeforeunloadHandler() {
        //window.removeEventListener(‘beforeunload‘, e => this.beforeunloadHandler(e));//错误方法，无法移除
        window.removeEventListener('beforeunload', this.beforeunloadHandler, false);
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