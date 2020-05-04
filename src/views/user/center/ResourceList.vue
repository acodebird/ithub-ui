<!--资源列表-->
<template>
<a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" justify="start" :gutter="16" class="article_body">
     <!-- 左边公共组件 -->
     <left-tag :userId="this.$route.query.userId"></left-tag>
     <!-- 右边关注列表 -->
     <a-col :span="14">
       <a-row type="flex">
          <a-col :span="24" v-if="resources.length != 0">
            <template>
              <div class="item">
                  <a-row type="flex" align="middle" justify="start" style="height: 100%;">
                      <a-col>
                          <span style="color: red; font-weight: 700;">
                            Ta的资源
                          </span>
                      </a-col>
                  </a-row>
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
                          上传作者：<a @click="showBlogger(resource.user.id)">{{resource.user.username}}</a>
                        </span>
                        <span>上传时间：{{resource.uploadTime}}</span>
                        <span>所需积分：{{resource.integral}}</span>
                      </div>
                    </div>
                    <div style="float: right" v-if="!self">
                        <a-button type="danger" @click="handleDownload(resource)">下载</a-button>
                      </div>
                    <br><br>
                    <div class="description">
                     {{resource.description}}
                    </div>
                  </a-col>
                </a-row>
              </div>
            </template>
            <template>
              <a-pagination class="pagination" showQuickJumper :defaultPageSize="defaultPageSize" :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
            </template>
          </a-col>
          <a-col :span="24" v-else>
            <template>
              <div style="min-height: 600px;background-color: white;">
                <a-empty />
              </div>
            </template>
          </a-col>
        </a-row>
        <br><br><br><br>
     </a-col>
   <!-- 回到顶部 -->
   <a-back-top />
   <!-- 脚部公共组件 -->
   <footer-tag></footer-tag>
   <login-tag ref="loginModal" @ok="handleOk" />
   </a-row>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import HeaderTag from '../../Header'
import FooterTag from '../../Footer'
import LeftTag from '../article/ArticleLeft'
import LoginTag from '../form/LoginForm'
import { loadAll,download } from '@/api/document'
import { isLogin } from '@/api/login'

export default {
 name: 'ResourceList',
 data () {
    return {
      zh_CN,
      resources: [],
      defaultPageSize: 3,
      defaultCurrent: 1,
      total: 0,
      self: false,
      isLogin: false,
   };
 },

 components: {
   HeaderTag,
   FooterTag,
   LeftTag,
   LoginTag,
 },

 computed: {},

 methods: {
   showBlogger(userId) {
      console.log(`点击前往博主博客`);
      let routeData = this.$router.resolve({
          path: `/article`,
          query: {"userId": userId},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
   onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`)
      this.defaultCurrent = pageNumber
      this.handleLoadAll()
   },
   //表单回调函数
    handleOk() {
      this.$router.go(0)
    },
   //加载用户资源
   handleLoadAll() {
      let parameter = {
        "pageSize": this.defaultPageSize, 
        "pageNo": this.defaultCurrent,
        "userId": this.$route.query.userId,
        "status": "PASS",
      }
      loadAll(parameter).then( res => {
        if(res.success === true) {
          this.resources = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载用户资源异常',err.message)
      })
   },
   //判断是否为当前用户的博客，是可以取消收藏文章，不是隐藏收藏文章按钮
    handleIsSelf() {
      let userId = this.$route.query.userId
      isLogin().then(res => {
        if (res.success === true) {
          this.isLogin = true
          //console.log("创建获取用户id:" + this.$route.query.userId)
          if(res.data.id == userId) {
            this.self = true
          }else{
            this.self = false
          }
        }else {
          this.self = false
        }
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
   this.handleLoadAll() //加载用户资源
   this.handleIsSelf() //判断是否为当前用户博客
 }
}

</script>

<style scoped>
   a:hover {
    color: red;
  }
  /* 用户文章页面body样式 */
  .article_body{
    background-color: #f5f6f7;
    border-top: 2px solid white;
    padding-top: 50px;
  }
  /* 右边关注列表样式 */
  /* 主页body中间内容样式 */
  .item {
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: white;
    padding: 15px;
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
  }
</style>