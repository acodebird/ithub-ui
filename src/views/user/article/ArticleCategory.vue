<!--文章专栏-->
<template>
 <a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" justify="start" :gutter="16" class="article_body">
     <!-- 左边公共组件 -->
     <left-tag :userId="this.$route.query.userId"></left-tag>
     <!-- 右边文章列表 -->
     <a-col :span="14">
       <a-row type="flex">
          <a-col :span="24">
            <template>
              <div class="category_title">
                <a-row style="height:100%;" type="flex" align="middle" justify="end">
                    <a-col :span="4">
                        <a-row type="flex" align="middle" justify="start">
                            <a-icon type="folder" theme="twoTone" style="fontSize:120px;" />
                        </a-row>
                    </a-col>
                    <a-col :span="20">
                        <a-row type="flex" justify="start" align="middle">
                            <a-col>
                                <strong style="font-size: 22px;">{{column.name}}</strong>
                            </a-col>
                            <!-- <a-col>
                                <a-divider type="vertical"></a-divider>
                            </a-col>
                            <a-col>
                                <a-button type="danger">管理专栏文章</a-button>
                            </a-col> -->
                        </a-row>
                    </a-col>
                </a-row>
              </div>
            </template>
            <template>
              <div class="blogList" v-for="(content, index) in contents" :key="index">
                <a-row class="blog">
                  <a-col class="blog_content">
                    <h4 class="title">
                      <a @click="showBlogDetail(content.id)">{{content.title}}</a>
                    </h4>
                    <div class="info">
                      <div style="float: left">
                        <span>
                          <a @click="showBlogger(content.user.id)">{{content.user.username}}</a>
                        </span>
                        <span>{{content.time}}</span>
                        <span  v-for="(keyword, index) in content.label!=null ? content.label.split(',') : ''" :key="index">
                          <a-icon type="tag" />{{keyword}}
                        </span>
                      </div>
                      <div style="float: right">
                        <span>
                          <a-icon type="like" />{{content.like}}
                        </span>
                        <a-divider type="vertical" />
                        <span>
                          <a-icon type="eye" />{{content.click}}
                        </span>
                        <a-divider type="vertical" />
                        <span>
                          <a-icon type="message" />{{content.reply}}
                        </span>
                      </div>
                    </div>
                    <br><br>
                    <div class="summary">
                     {{content.summary}}
                    </div>
                  </a-col>
                </a-row>
              </div>
            </template>
            <template>
              <a-pagination class="pagination" showQuickJumper :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
            </template>
          </a-col>
        </a-row>
        <br/><br/><br/><br/>
     </a-col>
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
import HeaderTag from '../../Header'
import FooterTag from '../../Footer'
import LeftTag from './ArticleLeft'
import {getColumn} from '@/api/column'
import {loadByUser} from '@/api/article'

export default {
 name: 'ArticleCategory',
 data () {
    return {
      zh_CN,
      column: {},
      contents: [],
      defaultCurrent: 1,
      total: 0,
   };
 },

 components: {
   HeaderTag,
   FooterTag,
   LeftTag,
 },

 computed: {},

 methods: {
    showBlogger() {
      console.log(`点击前往博主博客`);
      this.$router.push({path: '/article'});
    },
    showBlogDetail(e) {
      console.log(`展示博客${e}详情`);
      this.$router.push({path: '/article/detail'});
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`)
      this.defaultCurrent = pageNumber
      this.handleLoadAllArticle()
    },
    //加载专栏信息
    handleLoadCategory() {
      console.log("加载专栏：" + this.$route.query.categoryId)
      getColumn(this.$route.query.categoryId).then(res => {
        if(res.success === true) {
          this.column = res.data
        }
      }).catch(err => {
        console.log("加载专栏信息异常：" + err.message)
      })
    },
    //加载专栏文章
    handleLoadAllArticle() {
      let parameter=  {
        "pageSize": 10, 
        "pageNo": this.defaultCurrent,
        "userId": this.$route.query.userId,
        "columnId": this.$route.query.categoryId
      }
      loadByUser(parameter).then( res => {
        if(res.success === true) {
          this.contents = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载专栏文章异常',err.message)
      })
    },
 },
 created() {
   this.handleLoadCategory() //加载专栏信息
   this.handleLoadAllArticle() //加载专栏文章
 },
 watch: {
  '$route' (to, from) {
    if (to.path === '/article/category' || to.path === '/article') {
      this.contents = []
      this.handleLoadCategory() //加载专栏信息
      this.handleLoadAllArticle() //加载专栏文章
    }
  }
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
  /* 右边文章列表样式 */
  /* 主页body中间内容样式 */
  .category_title {
    width: 100%;
    height: 150px;
    border: 1px solid #ddd;
    background-color: white;
    padding: 15px;
  }
  .blogList {
    width: 100%;
    background-color: white;
  }
  .blog {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
  .title a {
    color: #333;
    font-size: 20px;
  }
  .title a:hover {
    color: red;
  }
  .info span{
    margin: 5px;
  }
  .summary {
    color: #8a8a8a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pagination {
    float: right;
  }
</style>