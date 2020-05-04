<!--收藏夹详细页面-->
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
          <a-col :span="24" v-if="favorites.length != 0">
            <template>
              <div class="collect">
                  <a-row type="flex" align="middle" justify="start" style="height: 100%;">
                      <a-col>
                          <span style="color: red; font-weight: 700;">
                            Ta的收藏
                          </span>
                      </a-col>
                  </a-row>
              </div>
            </template>
            <template>
              <div class="blogList" v-for="(favorite, index) in favorites" :key="index">
                <a-row class="blog">
                  <a-col class="blog_content">
                    <h4 class="title">
                      <a @click="showBlogDetail(favorite.article.id)">{{favorite.article.title}}</a>
                    </h4>
                    <div class="info">
                      <div style="float: left">
                        <span>
                          <a @click="showBlogger(favorite.article.user.id)">{{favorite.article.user.username}}</a>
                        </span>
                        <span>{{favorite.article.createTime}}</span>
                        <span  v-for="(keyword, index) in favorite.article.label!=null ? favorite.article.label.split(',') : ''" :key="index">
                          <a-icon type="tag" />{{keyword}}
                        </span>
                      </div>
                      <div style="float: right" v-if="self">
                        <a-button type="danger" @click="handleCancelCollect(favorite.id)">取消收藏</a-button>
                      </div>
                    </div>
                    <br><br>
                    <div class="summary">
                     {{favorite.article.summary}}
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
import { getFavoritesList, deleteFavorites } from '@/api/favorites'
import { isLogin } from '@/api/login'

export default {
 name: 'ArticleCollections',
 data () {
    return {
      zh_CN,
      favorites: [],
      defaultCurrent: 1,
      total: 0,
      self: false,
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
      console.log(`点击前往博主博客`);
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
      this.handleLoadAll()
    },
    handleLoadAll() {
      console.log(this.$route.query.userId)
      let parameter =  {
        "pageSize": 10, 
        "pageNo": this.defaultCurrent,
        "userId": this.$route.query.userId,
      }
      getFavoritesList(parameter).then( res => {
        if(res.success === true) {
          this.favorites = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载用户所有收藏异常',err.message)
      })
    },
    //判断是否为当前用户的博客，是可以取消收藏文章，不是隐藏收藏文章按钮
    handleIsSelf() {
      let userId = this.$route.query.userId
      isLogin().then(res => {
        if (res.success === true) {
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
    //用户取消收藏
    handleCancelCollect(id) {
      console.log("取消收藏：" + id)
      deleteFavorites(id).then( res => {
        if(res.success === true) {
          this.handleLoadAll()
        }
      }).catch(err => {
         console.log('取消用户收藏异常',err.message)
      })
    },
 },
 created() {
   this.handleLoadAll() //加载用户所有收藏
   this.handleIsSelf() //判断是否为当前用户博客
 },
 watch: {
  '$route' (to, from) {
    if (to.path === '/article') {
     this.handleLoadAll() //加载用户所有收藏
     this.handleIsSelf() //判断是否为当前用户博客
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
  .collect {
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: white;
    padding: 15px;
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