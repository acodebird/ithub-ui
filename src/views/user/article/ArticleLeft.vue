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
                          <a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="用户头像" />
                        </a-row>
                      </a-col>
                      <a-col :span="12" style="height:100%">
                        <a-row type="flex" align="bottom" style="height: 50%;">
                          <h4 class="user_name">ACodeBird</h4>
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
                            <a-row type="flex" justify="center" class="item_count">65</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(1)" title="6">
                            <a-row type="flex" justify="center" class="item">收藏</a-row>
                            <a-row type="flex" justify="center" class="item_count">6</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(2)" title="5">
                            <a-row type="flex" justify="center" class="item">资源</a-row>
                            <a-row type="flex" justify="center" class="item_count">5</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(3)" title="15">
                            <a-row type="flex" justify="center" class="item">粉丝</a-row>
                            <a-row type="flex" justify="center" class="item_count">15</a-row>
                        </a>
                      </a-col>
                      <a-col :span="4">
                        <a @click="handleClick(4)" title="165">
                            <a-row type="flex" justify="center" class="item">关注</a-row>
                            <a-row type="flex" justify="center" class="item_count">165</a-row>
                        </a>
                      </a-col>
                    </a-row>
                    <a-row type="flex" align="middle" justify="center" style="height:33.3%;">
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">积分</a-row>
                        <a-row type="flex" justify="center" class="item_count">1200</a-row>
                      </a-col>
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">获赞</a-row>
                        <a-row type="flex" justify="center" class="item_count">65</a-row>
                      </a-col>
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">评论</a-row>
                        <a-row type="flex" justify="center" class="item_count">15</a-row>
                      </a-col>
                      <a-col :span="4">
                        <a-row type="flex" justify="center" class="item">访问</a-row>
                        <a-row type="flex" justify="center" class="item_count">40000</a-row>
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
                    <div class="category_content" v-for="(article, index) in latestArticle" :key="index">
                      <a-row class="category_content_item">
                        <a-col>
                          <a-icon type="link" />
                          <a @click="showBlogDetail(article.id)">{{article.title}}</a>
                        </a-col>
                      </a-row>
                    </div>
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
                    <div class="category_content" v-for="(article, index) in latestArticle" :key="index">
                      <a-row class="category_content_item">
                        <a-col>
                          <a-icon type="link" />
                          <a @click="showBlogDetail(article.id)">{{article.title}}</a>
                        </a-col>
                      </a-row>
                    </div>
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
                    <div class="category_content" v-for="(column, index) in columns" :key="index">
                      <a @click="showColumnDetail(column.id)">
                        <router-link to="/article/category">
                        <a-row type="flex" align="middle" justify="center" class="category_content_item">
                          <a-col :span="20">
                            <a-icon type="folder" style="fontSize:20px" />
                            <a-divider type="vertical" />
                            {{column.title}}
                          </a-col>
                          <a-col :span="4">
                            <a-row type="flex" justify="end">{{column.count}}篇</a-row>
                          </a-col>
                        </a-row>
                        </router-link>
                      </a>
                    </div>
                  </a-col>
                 </a-row>
               </div>
             </template>
           </a-col>
         </a-row>
           
         
       </div>
     </a-col>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

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
      latestArticle: [{
          id: 1,
          title: '关于mybatis插入数据到数据库成功，数据库却没有数据'
        },
        {
          id: 1,
          title: '关于mybatis插入数据到数据库成功，数据库却没有数据'
        },
        {
          id: 1,
          title: '关于mybatis插入数据到数据库成功，数据库却没有数据'
        },
        {
          id: 1,
          title: '关于mybatis插入数据到数据库成功，数据库却没有数据'
        }
      ],
      columns: [{
          id: 1,
          title: 'Vue',
          count: 5
        },
        {
          id: 2,
          title: 'Java基础',
          count: 5
        },
        {
          id: 3,
          title: 'SpringMVC',
          count: 5
        },
        {
          id: 4,
          title: 'Spring',
          count: 5
        },{
          id: 5,
          title: 'SpringBoot',
          count: 5
        },
        {
          id: 6,
          title: 'Hibernate',
          count: 5
        },
        {
          id: 7,
          title: 'MyBatis',
          count: 5
        },
        {
          id: 8,
          title: 'html/js/css',
          count: 5
        }
      ],
   };
 },

 computed: {},

 methods: {
    showBlogDetail(e) {
      console.log(`展示博客${e}详情`);
      this.$router.push({path: '/article/detail'});
    },
    showColumnDetail(e) {
      console.log(`展示专栏${e}详情`);
      //this.$router.push({path: '/article/category'});
    },
    handleClick(type) {
      /* 跳转到关注、收藏、资源等页面 */
      console.log(`跳转到:${clickType[type].text}`);
      this.$router.push({path: `${clickType[type].path}`});
    },
    toResourceList() {
      console.log(`跳转到资源列表页面`);
      this.$router.push({path: '/uc/resource-list'});
    }
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