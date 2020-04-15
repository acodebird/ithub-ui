<!--用户界面首页-->
<template>
<a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 主页body -->
   <a-row type="flex" justify="start" :gutter="16" class="homeBody">
     <!-- 主页body左边导航栏 -->
      <a-col :span="4">
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
      </a-col>
      <!-- 主页body中间内容 -->
      <a-col :span="14">
        <a-row type="flex">
          <a-col :span="24">
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
                          <a @click="showBlogger">{{content.author}}</a>
                        </span>
                        <span>{{content.time}}</span>
                        <span v-for="(keyword, index) in content.keywords" :key="index">
                          <a-icon type="tag" />{{keyword}}
                        </span>
                      </div>
                      <div style="float: right">
                        <span>
                          <a-icon @click="addLike" type="like" />{{content.like}}
                        </span>
                        <a-divider type="vertical" />
                        <span>
                          <a-icon type="eye" />{{content.eye}}
                        </span>
                        <a-divider type="vertical" />
                        <span>
                          <a-icon type="message" />{{content.message}}
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
              <a @click="loadMore" class="loadMore">加载更多...</a>
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
                <a-row class="technologicalFrontier">
                  <a-col>
                    <div class="category_title">
                      <a>
                        <strong>科技前沿</strong>
                      </a>
                    </div>
                    <div class="category_content" v-for="(technologicalFrontier, index) in technologicalFrontiers" :key="index">
                      <a-row class="category_content_item">
                        <a-col>
                          <a-icon type="link" />
                          <a @click="showBlogDetail(technologicalFrontier.id)">{{technologicalFrontier.title}}</a>
                        </a-col>
                      </a-row>
                    </div>
                  </a-col>
                </a-row>
                <a-row class="recommendedDaily">
                  <a-col>
                    <div class="category_title">
                      <a>
                        <strong>每日推荐</strong>
                      </a>
                    </div>
                    <div class="category_content" v-for="(recommendedDaily, index) in recommendedDailys" :key="index">
                      <a-row class="category_content_item">
                        <a-col>
                          <a-icon type="heart" />
                          <a @click="showBlogDetail(recommendedDaily.id)">{{recommendedDaily.title}}</a>
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
      contents: [
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'
        },
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'

        },
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'

        },
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'

        },
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'

        },
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'

        },
        {
          id: 1,
          title: 'spring的aop配置中aop:advisor和aop:aspect的区别',
          author: 'ACodeBird',
          time: '2019-08-31 15:18:31',
          keywords: ['aop','spring','java'],
          like: 666,
          eye: 888,
          message: 911,
          summary: '1.aop:advisor配置的通知类必须实现advice接口常用的有下面几个接口：1.MethodBeforeAdvice 前置通知2.AfterReturningAdvice 成功通知3.ThrowsAdvice 异常通知4.AfterAdvice 是一个空接口，被2和3继承advice是一个空接口，定义方法还是跟平时一样2.aop:aspect配置的通知类不用实现advice接口，普通类即可'

        }
      ],
      technologicalFrontiers: [{
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
      recommendedDailys: [{
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
      isFixed: false,
      isActive: true,
      loading: false,
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
    addLike() {
      console.log(this.loading)
      console.log(`点赞加1`)
    },
    showBlogger() {
      console.log(`点击前往博主博客`);
      this.$router.push({path: '/article'});
    },
    showBlogDetail(e) {
      console.log(`展示博客${e}详情`);
      this.$router.push({path: '/article/detail'});
    },
    loadMore() {
      console.log(`加载更多`)
      this.loading = true;
      window.setTimeout(() => {
        this.loading = false;
        for(let i in this.contents) {
          this.contents.push(this.contents[i]);
        }
        console.log(`数据加载完成`)
      },1000);
    },
    scrollBottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      /* 加载更多数据 */
      /* let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight-50) {
        if(this.loading) return;
        console.log(`滚动条到底部`)
        this.loading = true;
        window.setTimeout(() => {
          this.loading = false;
          for(let i in this.contents) {
            this.contents.push(this.contents[i]);
          }
          console.log(`数据加载完成`)
        },1000);
      } */
      /* 固定左边导航栏 */
      let fixedNavigationBar = document.querySelector('#fixedNavigationBar');
      if(scrollTop >= 64) {
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
    }
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
    height: 50px;
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