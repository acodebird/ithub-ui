<!--用户文章页面-->
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
          <a-col :span="24" v-if="contents.length != 0">
            <template>
              <div class="query">
                <a-row style="height:100%;" type="flex" align="middle" justify="end">
                  <a-col :span="2">排序：</a-col>
                  <a-col :span="2"><a :disabled="query == 'createTime'" @click="handleQuery('createTime')">按更新时间</a></a-col>
                  <a-divider type="vertical" />
                  <a-col :span="2"><a :disabled="query == 'click'" @click="handleQuery('click')">按访问量</a></a-col>
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
                          <a v-if="content.user" @click="showBlogger(content.user.id)">{{content.user.username}}</a>
                        </span>
                        <span>{{content.createTime}}</span>
                        <span  v-for="(keyword, index) in content.label!=null ? content.label.split(',') : ''" :key="index">
                          <a-icon type="tag" />{{keyword}}
                        </span>
                      </div>
                      <div style="float: right">
                        <span>
                          <a-icon type="like" />{{content.approval}}
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
          <a-col :span="24" v-else>
            <template>
              <div style="min-height: 600px;background-color: white;">
                <a-empty />
              </div>
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
import { loadByUser } from '@/api/article'

export default {
 name: 'ArticleList',
 data () {
    return {
      zh_CN,
      contents: [],
      query: "createTime",
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
    showBlogger(userId) {
      console.log(`点击前往博主博客`)
      let routeData = this.$router.resolve({
          path: `/article`,
          query: {"userId": userId},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    showBlogDetail(id) {
      console.log(`展示博客${id}详情`);
      let routeData = this.$router.resolve({
          path: `/article/detail`,
          query: {"id": id},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`);
      this.defaultCurrent = pageNumber
      this.handleLoadByUser()
    },
    handleQuery(query) {
      this.query = query
      this.handleLoadByUser() //根据更新时间或者访问量加载用户文章
    },
    handleLoadByUser() {
      let parameter=  {
        "pageSize": 10, 
        "pageNo": this.defaultCurrent,
        "userId": this.$route.query.userId,
        "sortField": this.query
      }
      loadByUser(parameter).then( res => {
        if(res.success === true) {
          this.contents = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载用户所有文章异常',err.message)
      })
    },
  },
  created() {
    this.handleLoadByUser() //加载用户所有文章
  },
  watch: {
  '$route' (to, from) {
    if (to.path === '/article') {
     this.handleLoadByUser() //加载用户所有文章
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
  .query {
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: white;
  }
  .query a {
    text-decoration: none;
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