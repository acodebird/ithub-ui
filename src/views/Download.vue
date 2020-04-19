<!--下载页面-->
<template>
<a-locale-provider :locale="zh_CN">
    <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" :gutter="10" justify="center" class="download_body">
     <!-- 资源列表 -->
     <a-col :span="5">
       <!-- 用户个人信息框 -->
      <a-row style="padding: 15px;background-color: white;">
        <a-col :span="24">
          <a-row type="flex" justify="center" >
            <a-col :span="8">
              <a-row type="flex" align="middle" justify="center" style="height: 80px;">
                <a-avatar :size="64" :src="user.avatar" alt="用户头像" />
              </a-row>
            </a-col>
            <a-col :span="16" v-if="isLogin">
              <a-row type="flex" align="bottom" style="height: 50%;">
                <a @click="showBlogger(user.id)"><h4 class="user_name">{{user.username}}</h4></a>
              </a-row>
              <a-row style="height: 50%;">
                积分:<span style="color: red;">{{user.integral}}</span>
              </a-row>
            </a-col>
            <a-col :span="16" v-else>
              <a-row type="flex" align="middle" style="height: 50%;">
                <a-button @click="handleLogin" size="small" type="primary">立即登录</a-button>
              </a-row>
              <a-row style="height: 50%;">
                <span style="color: red;">Hi!欢迎来到ITHub下载专区</span>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-button @click="handleUpload" type="danger" style="width: 100%;">上传资源赚取积分</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
     </a-col>
     <a-col :span="16">
       <a-row type="flex">
          <a-col :span="24" v-if="resources.length != 0">
            <template>
              <div class="search">
                <a-input-group compact>
                  <a-select defaultValue="" @change="handleChangeSelect">
                    <a-select-option value="">所有</a-select-option>
                    <a-select-option value="TOOL">工具类</a-select-option>
                    <a-select-option value="CODE">代码类</a-select-option>
                    <a-select-option value="FILE">文档类</a-select-option>
                    <a-select-option value="OTHER">其他</a-select-option>
                  </a-select>
                  <a-input-search style="width: 80%;" placeholder="请输入关键字" @search="onSearch" enterButton />
                </a-input-group>
              </div>
            </template>
            <template>
              <div class="resourceList" v-for="(resource, index) in resources" :key="index">
                <a-row class="resource">
                  <a-col>
                    <h4 class="title">
                      {{resource.title}}
                    </h4>
                    <div class="info">
                      <div style="float: left">
                        <span>
                          <a @click="showBlogger">上传作者：{{resource.user.username}}</a>
                        </span>
                        <span>上传时间：{{resource.uploadTime}}</span>
                        <span>所需积分：{{resource.integral}}</span>
                      </div>
                    </div>
                    <div style="float: right">
                        <a-button type="danger" @click="handleDownload(resource)">下载</a-button>
                      </div>
                    <br><br>
                    <div class="description" :title="resource.description">
                     {{resource.description}}
                    </div>
                  </a-col>
                </a-row>
              </div>
            </template>
            <template>
              <a-pagination class="pagination" showQuickJumper :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
            </template>
          </a-col>
          <a-col :span="24" v-else>
            <template>
              <div class="search">
                <a-input-group compact>
                  <a-select defaultValue="" @change="handleChangeSelect">
                    <a-select-option value="">所有</a-select-option>
                    <a-select-option value="TOOL">工具类</a-select-option>
                    <a-select-option value="CODE">代码类</a-select-option>
                    <a-select-option value="FILE">文档类</a-select-option>
                    <a-select-option value="OTHER">其他</a-select-option>
                  </a-select>
                  <a-input-search style="width: 80%;" placeholder="请输入关键字" @search="onSearch" enterButton />
                </a-input-group>
              </div>
            </template>
            <template>
              <div style="min-height: 600px;background-color: white;">
                <a-empty />
              </div>
            </template>
          </a-col>
        </a-row>
        <br><br><br><br>
     </a-col>
     <login-tag ref="loginModal" @ok="handleOk" />
     <upload-tag ref="uploadModal" @ok="handleOk" />
   <!-- 回到顶部 -->
   <a-back-top />
   <!-- 脚部公共组件 -->
   <footer-tag></footer-tag>
   </a-row>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import HeaderTag from './Header'
import FooterTag from './Footer'
import LoginTag from './user/form/LoginForm'
import UploadTag from './user/form/UploadResource'
import { isLogin } from '@/api/login'
import { loadAll, download } from '@/api/document'

export default {
 name: 'DownLoad',
 data () {
    return {
      zh_CN,
      resources: [],
      user: {},
      isLogin: false,
      select: '',
      query: '',
      defaultCurrent: 1,
      total: 0,
   };
 },

 components: {
   HeaderTag,
   FooterTag,
   LoginTag,
   UploadTag,
 },

 computed: {},

 methods: {
   //表单回调函数
    handleOk() {
      this.$message.success(`资源上传成功,等待管理员审核`)
    },
    handleChangeSelect(value) {
      this.select = value;
    },
    onSearch(value) {
      console.log(`查询内容:${this.select}=>${value}`)
      this.query = value
      this.handleLoadAll()
    },
    showBlogger() {
      console.log(`点击前往博主博客`);
      this.$router.push({path: '/article'});
    },
    handleLogin() {
      console.log(`去登陆`);
      if(!this.isLogin) {
        //用户未登录，弹出登录表单
        this.$refs.loginModal.login()
        return
      }
    },
    handleUpload() {
      if(!this.isLogin) {
        //用户未登录，弹出登录表单
        this.$refs.loginModal.login()
        return
      }
      console.log(`去上传资源`)
      this.$refs.uploadModal.upload(this.user) //打开上传资源表单
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`)
      this.defaultCurrent = pageNumber
      this.handleLoadAll()
    },
    handleIsLogin() {
      //判断用户是否登录
      isLogin().then(res => {
        if (res.success === true) {
          this.user = res.data
          this.isLogin = true
          return
        }
      }).catch(ex => {
        console.log('isLogin error',ex.message)
      })
    },
    //加载所有资源
   handleLoadAll() {
      let parameter = {
        "pageSize": 10, 
        "pageNo": this.defaultCurrent,
        "type": this.select,
        "title": this.query,
        "description": this.query
      }
      loadAll(parameter).then( res => {
        if(res.success === true) {
          this.resources = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载所有资源异常',err.message)
      })
   },
   //下载资源
    handleDownload(resource) {
      if(!this.isLogin) {
        //用户未登录，弹出登录表单
        this.$refs.loginModal.login()
        return
      }
      console.log("用户已登陆，可以下载资源")
      download(resource.id).then( res => {
        if(res.success === true) {
          this.handleIsLogin()
          window.open(res.data, '_blank')
        }else {
          this.$message.error(res.data)
        }
      }).catch(err => {
         console.log('下载用户资源异常',err.message)
      })
    },
 },
 created() {
   this.handleIsLogin() //判断用户是否登录
   this.handleLoadAll() //加载所有资源
 }
}

</script>

<style scoped>
  .download_body{
    background-color: #f5f6f7;
    border-top: 2px solid white;
    padding-top: 50px;
  }
  .search {
    width: 100%;
    height: 100px;
    border: 1px solid #ddd;
    background-color: white;
    padding-top: 30px;
    text-align: center;
  }
  .resourceList {
    width: 100%;
    background-color: white;
  }
  .resource {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
  .title {
    color: #333;
    font-size: 20px;
  }
  .info span{
    margin: 5px;
  }
  .description {
    color: #8a8a8a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pagination {
    float: right;
    margin-bottom: 30px;
  }
</style>