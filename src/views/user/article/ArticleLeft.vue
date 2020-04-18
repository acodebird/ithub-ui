<!--用户文章页面-->
<template>
<a-locale-provider :locale="zh_CN">
     <!-- 左边用户信息列 -->
     <a-col :span="7">
       <div>
         <a-row type="flex" justify="end">
           <a-col :span="18">
             <template>
               <div class="left_box">
                 <!-- 用户个人信息框 -->
                 <a-row style="height: 252px;background-color: white;">
                   <a-col style="height: 100%;">
                    <a-row type="flex" justify="center" style="height:33.4%;">
                      <a-col :span="6"  style="height:100%;">
                        <a-row type="flex" align="middle" justify="center" style="height: 100%;">
                          <a-avatar :size="64" :src="userInfo.avatar" alt="用户头像" />
                        </a-row>
                      </a-col>
                      <a-col :span="12" style="height:100%">
                        <a-row type="flex" align="bottom" style="height: 50%;">
                          <h4 class="user_name">{{userInfo.username}}</h4>
                        </a-row>
                        <a-row style="height: 50%;">
                          <a href="#" @click="toResourceList">Ta的资源></a>
                        </a-row>
                      </a-col>
                      <a-col :span="6" style="height:100%">
                        <a-row type="flex" align="middle" style="height: 100%;">
                          <a-button type="danger" size="small">关注</a-button>
                        </a-row>
                      </a-col>
                    </a-row>
                    <a-row type="flex" align="middle" justify="center" style="height:33.3%;">
                      <a-col :span="4">
                        <a @click="handleClick(0)" title="15">
                            <a-row type="flex" justify="center" class="item">文章</a-row>
                            <a-row type="flex" justify="center" class="item_count">{{userInfo.articleCount}}</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(1)" title="6">
                            <a-row type="flex" justify="center" class="item">收藏</a-row>
                            <a-row type="flex" justify="center" class="item_count">{{userInfo.collectCount}}</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(2)" title="5">
                            <a-row type="flex" justify="center" class="item">资源</a-row>
                            <a-row type="flex" justify="center" class="item_count">{{userInfo.documentCount}}</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(3)" title="15">
                            <a-row type="flex" justify="center" class="item">粉丝</a-row>
                            <a-row type="flex" justify="center" class="item_count">{{userInfo.fansCount}}</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(4)" title="165">
                            <a-row type="flex" justify="center" class="item">关注</a-row>
                            <a-row type="flex" justify="center" class="item_count">{{userInfo.focusCount}}</a-row>
                        </a>
                      </a-col>
                    </a-row>
                    <a-row type="flex" align="middle" justify="center" style="height:33.3%;">
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">积分</a-row>
                        <a-row type="flex" justify="center" class="item_count">{{userInfo.integral}}</a-row>
                      </a-col>
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">获赞</a-row>
                        <a-row type="flex" justify="center" class="item_count">{{userInfo.greatCount}}</a-row>
                      </a-col>
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">评论</a-row>
                        <a-row type="flex" justify="center" class="item_count">{{userInfo.commentCount}}</a-row>
                      </a-col>
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">访问</a-row>
                        <a-row type="flex" justify="center" class="item_count">{{userInfo.clickCount}}</a-row>
                      </a-col>
                      <a-col :span="4">
                      </a-col>
                    </a-row>
                   </a-col>
                 </a-row>
                 <!-- 热门文章 -->
                 <a-row class="article">
                  <a-col>
                    <div class="category_title">
                      <a>
                        <strong>热门文章</strong>
                      </a>
                    </div>
                    <template v-if="popularArticles.length != 0">
                      <div class="category_content" v-for="(article, index) in popularArticles" :key="index">
                        <a-row class="category_content_item">
                          <a-col>
                            <a-icon type="link" />
                            <a @click="showBlogDetail(article.id)">{{article.title}}</a>
                          </a-col>
                        </a-row>
                      </div>
                    </template>
                    <template v-else>
                      <a-empty />
                    </template>
                  </a-col>
                 </a-row>
                 <!-- 最新文章 -->
                 <a-row class="article">
                  <a-col>
                    <div class="category_title">
                      <a>
                        <strong>最新文章</strong>
                      </a>
                    </div>
                    <template v-if="latestArticles.length != 0">
                      <div class="category_content" v-for="(article, index) in latestArticles" :key="index">
                        <a-row class="category_content_item">
                          <a-col>
                            <a-icon type="link" />
                            <a @click="showBlogDetail(article.id)">{{article.title}}</a>
                          </a-col>
                        </a-row>
                      </div>
                    </template>
                    <template v-else>
                      <a-empty />
                    </template>
                  </a-col>
                 </a-row>
                 <!-- 专栏分类 -->
                 <a-row class="article">
                  <a-col>
                    <div class="category_title">
                      <a>
                        <strong>专栏分类</strong>
                      </a>
                    </div>
                    <template v-if="columns.length != 0">
                      <div class="category_content" v-for="(column, index) in columns" :key="index">
                        <a @click="showColumnDetail(column.id)">
                          <router-link to="/article/category">
                          <a-row type="flex" align="middle" justify="center" class="category_content_item">
                            <a-col :span="20">
                              <a-icon type="folder" style="fontSize:20px" />
                              <a-divider type="vertical" />
                              {{column.name}}
                            </a-col>
                            <a-col :span="4">
                              <a-row type="flex" justify="end">{{column.count}}篇</a-row>
                            </a-col>
                          </a-row>
                          </router-link>
                        </a>
                      </div>
                    </template>
                    <template v-else>
                      <a-empty />
                    </template>
                  </a-col>
                 </a-row>
               </div>
             </template>
           </a-col>
         </a-row>
         <br><br><br><br>
       </div>
     </a-col>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { loadByUser } from '@/api/article'
import { loadAllByUser } from '@/api/column'
import { loadInfo } from '@/api/user'

const clickType = {
  0: {
    text: '文章',
    path: '/article',
  },
  1: {
    text: '收藏',
    path: '/article/collection-list',
  },
  2: {
    text: '资源',
    path: '/uc/resource-list',
  },
  3: {
    text: '粉丝',
    path: '/uc/fans-list',
  },
  4: {
    text: '关注',
    path: '/uc/follow-list',
  },
}

export default {
 name: 'ArticleLeft',
 data () {
    return {
      zh_CN,
      popularArticles: [], //用户热门文章
      latestArticles: [],//用户最新文章
      columns: [], //用户专栏
      userInfo: {}, //用户信息
   };
 },
 props: ['userId'],

 computed: {},

 methods: {
    showBlogDetail(id) {
      console.log(`展示博客${id}详情`);
      this.$router.push({path: '/article/detail',query: {"id": id}});
    },
    showColumnDetail(e) {
      console.log(`展示专栏${e}详情`);
      console.log("获取到用户id"+this.userId)
      //this.$router.push({path: '/article/category'});
    },
    handleClick(type) {
      /* 跳转到关注、收藏、资源等页面 */
      console.log(`跳转到:${clickType[type].text}`);
      this.$router.push({path: `${clickType[type].path}`,query: {"userId": this.userId}});
    },
    toResourceList() {
      console.log(`跳转到资源列表页面`);
      this.$router.push({path: '/uc/resource-list'});
    },
    //加载用户热门文章
    handleLoadHotByUser() {
      let parameter=  {
        "pageSize": 5, 
        "pageNo": 1,
        "userId": this.userId,
        "sortField": "click"
      }
      loadByUser(parameter).then( res => {
        if(res.success === true) {
          this.popularArticles = res.data.content
        }
      }).catch(err => {
         console.log('加载用户热门文章异常',ex.message)
      })
    },
    //加载用户最新文章
    handleLoadNewByUser() {
      let parameter=  {
        "pageSize": 5, 
        "pageNo": 1,
        "userId": this.userId,
        "sortField": "createTime"
      }
      loadByUser(parameter).then( res => {
        if(res.success === true) {
          this.latestArticles = res.data.content
        }
      }).catch(err => {
         console.log('加载用户最新文章异常',ex.message)
      })
    },
    //记载用户所有专栏
    handleLoadColumnByUser() {
      loadAllByUser(this.userId).then( res => {
          if (res.success === true) {
            this.columns = res.data
          }
      }).catch(err => {
          console.log('加载用户专栏出错',err.message)
      })
    },
    //加载用户信息
    handleLoadInfo() {
      loadInfo(this.userId).then( res => {
          if (res.success === true) {
            this.userInfo = res.data
          }
      }).catch(err => {
          console.log('加载用户专栏出错',err.message)
      })
    },
  },
  created() {
    console.log("获取到用户id:" + this.userId)
    this.handleLoadHotByUser() //加载用户热门文章
    this.handleLoadNewByUser() //加载用户最新文章
    this.handleLoadColumnByUser() //加载用户专栏
    this.handleLoadInfo() //加载用户信息

  }
}

</script>

<style scoped>
  /* 左边用户信息模块样式 */
  .left_box{
    width: 100%;
  }
  .article {
    width: 100%;
    background-color: white;
    padding: 15px;
    margin-top: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    min-height: 100px;
  }
  .item {
    font-weight: 600;
    font-size: 14px;
    color: #333122;
  }
  .item_count {
    font-weight: 600;
    font-size: 18px;
    color: black;
  }
  .category_title {
    width: 100%;
    height: 37px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .category_title a {
    display: inline-block;
    border-bottom: 3px solid #9E9E9E;
    margin: 0 5px;
    pointer-events: none;
  }
  .category_content {
    width: 100%;
  }
  .category_content_item {
    width: 100%;
    height: 50px;
  }
  .category_content a {
    color: #4f4f4f;
  }
</style>