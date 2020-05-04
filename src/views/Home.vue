<!--用户界面首页-->
<template>
<a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 主页body -->
   <a-row type="flex" justify="start" :gutter="16" class="homeBody">
     <!-- 主页body左边导航栏 -->
      <!-- <a-col :span="4">
        <div>
          <a-row type="flex" justify="end">
            <a-col :span="12">
              <div id="fixedNavigationBar" :class="{fixedNavigationBar:isFixed}">
                <a-menu 
                style="text-align: center"
                mode="vertical" 
                @select="handleSelect"
                :defaultSelectedKeys="['1']"
                theme="dark"
                >
                  <template v-for="(menu, index) in leftMenu">
                    <a-menu-item v-if="index==0" :class="{ active:isActive }" :key="menu.key">
                      {{menu.title}}
                    </a-menu-item>
                    <a-menu-item v-else :key="menu.key">
                      {{menu.title}}
                    </a-menu-item>
                  </template>
                </a-menu>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-col> -->
      <a-col :span="3"></a-col>
      <!-- 主页body中间内容 -->
      <a-col :span="15">
        <a-row type="flex">
          <a-col :span="24" v-if="contents.length != 0">
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
              <!-- 主页body中间内容加载提示 -->
              <div style="text-align: center" v-show="loading">
                <a-icon type="loading" />
                <span>{{tips}}</span>
              </div>
              <!-- 加载更多 -->
              <a v-if="isLoadMore" @click="loadMore" class="loadMore">加载更多...</a>
              <a v-else class="loadMore">没有更多了</a>
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
      </a-col>
      <!-- 主页body右边推荐 -->
      <a-col :span="6">
        <a-row type="flex">
          <a-col :span="18">
            <template>
              <div class="right_box" id="right_box">
                <a-row class="recommendedDaily">
                  <a-col>
                    <div class="category_title">
                      <a>
                        <strong>热门推荐</strong>
                      </a>
                    </div>
                    <div class="category_content" v-for="(hot, index) in recommendedHots" :key="index">
                      <a-row class="category_content_item">
                        <a-col>
                          <span style="color: #e41414;"><a-icon type="fire" theme="filled" />{{hot.click}}</span>
                          <a @click="showBlogDetail(hot.id)" style="font-weight: 500;color: #3d3d3d;">{{hot.title}}</a>
                        </a-col>
                      </a-row>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </template>
          </a-col>
        </a-row>
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
import HeaderTag from './Header'
import FooterTag from './Footer'
import { loadAll,loadHot } from '@/api/article'

export default {
 name: 'Home',
 data () {
    return {
      zh_CN,
      leftMenu: [{
          key: 1,
          title: '推荐'
        },
        {
          key: 2,
          title: '程序人生'
        },
        {
          key: 3,
          title: 'Java'
        },
        {
          key: 4,
          title: 'Python'
        },
        {
          key: 5,
          title: '前端'
        },
        {
          key: 6,
          title: '人工智能'
        },
        {
          key: 7,
          title: '大数据'
        },
        {
          key: 8,
          title: '数据库'
        },
        {
          key: 9,
          title: '其他'
        }
      ],
      contents: [],
      recommendedHots: [],
      isFixed: false,
      isActive: true,
      isLoadMore: true,
      loading: false,
      pageSize: 10,
      pageNo: 1,
      queryParam: this.$route.query.queryParam,
      tips: '加载中......'
   };
 },

 components: {
   HeaderTag,
   FooterTag
 },

 computed: {
   
 },

 mounted() {
   window.addEventListener('scroll', this.scrollBottom)
 },

 methods: {
    handleSelect( {key} ) {
      this.isActive = false
      console.log(`点击${key}`)
    },
    // addLike() {
    //   console.log(this.loading)
    //   console.log(`点赞加1`)
    // },
    showBlogger(id) {
      console.log(`点击前往博主博客`);
      //this.$router.push({path: '/article'});
      let routeData = this.$router.resolve({
          path: `/article`,
          query: {"userId": id},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    showBlogDetail(id) {
      console.log(`展示博客${id}详情`);
      //this.$router.push({path: '/article/detail',query: {"id": id}});
      let routeData = this.$router.resolve({
          path: `/article/detail`,
          query: {"id": id},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    loadMore() {
      console.log(`加载更多`)
      this.loading = true;
      if(this.queryParam === undefined) {
        this.queryParam = ""
      }
      loadAll({"pageSize": this.pageSize, "pageNo": this.pageNo + 1, "param": this.queryParam}).then( res => {
        if(res.success === true) {
          this.loading = false
          if(res.data.content.length == 0) {
            this.isLoadMore = false
            console.log(`没有啦`)
            return
          }
          for(let i in res.data.content) {
            this.contents.push(res.data.content[i]);
          }
          this.pageNo = this.pageNo + 1
          console.log(`数据加载完成`)
        }
      }).catch(err => {
         console.log('加载所有文章异常',err.message)
      })
    },
    loadAll() {
      if(this.queryParam === undefined) {
        this.queryParam = ""
      }
      loadAll({"pageSize": this.pageSize, "pageNo": this.pageNo, "param": this.queryParam}).then( res => {
        if(res.success === true) {
          this.contents = res.data.content
          if(res.data.content.length < 10) {
            this.isLoadMore = false
          }
        }
      }).catch(err => {
         console.log('加载所有文章异常',err.message)
      })
    },
    loadHot() {
      loadHot({"pageSize": 20, "pageNo": this.pageNo}).then( res => {
        if(res.success === true) {
          this.recommendedHots = res.data.content
        }
      }).catch(err => {
         console.log('加载热门推荐异常',err.message)
      })
    },
    scrollBottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      /* 固定左边导航栏 */
      let fixedNavigationBar = document.querySelector('#fixedNavigationBar');
      if(scrollTop >= 64) {
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
    }
 },
 created() {
   this.loadAll() //加载所有文章
   this.loadHot() //加载热门文章
 }
}

</script>

<style scoped>
  .homeBody {
    background-color: #f5f6f7;
    border-top: 2px solid white;
    padding-top: 10px;
  }
  .active {
    background-color:#1890ff;
    color:white;
  }
  /* 固定左边导航栏 */
  .fixedNavigationBar {
    position: fixed;
    top: 0;
    width: 120px;
    z-index: 10;
  }
  /* 主页body中间内容样式 */
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
  .loadMore {
    width: 100%;
    height: 40px;
    margin: 30px auto 60px;
    padding: 10px 15px;
    text-align: center;
    font-size: 15px;
    display: block;
    color: #fff;
    border-radius: 20px;
    background-color: #a5a5a5;

  }
  /* 主页body右边内容样式 */
  .right_box {
    width: 100%;
    background-color: white;
  }
  .technologicalFrontier {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
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
    padding: 5px;
    /* height: 50px; */
  }
  .category_content a {
    color: #4f4f4f;
  }
  .recommendedDaily {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1)
  }

</style>