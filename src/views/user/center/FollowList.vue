<!--关注列表-->
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
          <a-col :span="24" v-if="followList.length != 0">
            <template>
              <div class="title">
                  <a-row type="flex" align="middle" justify="start" style="height: 100%;">
                      <a-col>
                          <span style="color: red; font-weight: 700;">
                            Ta的关注
                          </span>
                      </a-col>
                  </a-row>
              </div>
            </template>
            <template>
              <div class="followList" v-for="(follow, index) in followList" :key="index">
                <a-row class="follow" type="flex" align="middle">
                    <a-col :span="8">
                        <a-row type="flex" justify="start" align="middle">
                            <a-col>
                                <a @click="showBlogger(follow.follower.id)" title="查看用户博客">
                                    <a-avatar :size="64" :src="follow.follower.avatar" alt="用户头像"></a-avatar>
                                </a>
                            </a-col>
                            <a-col>
                                <a @click="showBlogger(follow.follower.id)" title="查看用户博客" style="color: #333;font-weight: 700;">{{follow.follower.username}}</a>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="16" v-if="self">
                        <a-row type="flex" justify="end">
                            <a-col>
                                <a-button type="danger" @click="handleCancelFocus(follow.id)">取消关注</a-button>
                            </a-col>
                        </a-row>
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
import LeftTag from '../article/ArticleLeft'
import { getFollowList, deleteFollow } from '@/api/follow'
import { isLogin } from '@/api/login'

export default {
 name: 'FollowList',
 data () {
    return {
        zh_CN,
        followList: [],
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
    showBlogger(id) {
      console.log(`点击前往博主博客`);
      let routeData = this.$router.resolve({
          path: `/article`,
          query: {"userId": id},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`)
      this.defaultCurrent = pageNumber
      this.handleLoadFans()
    },
    //加载用用户关注
    handleLoadFocus() {
      let parameter = {
        "pageSize": 10, 
        "pageNo": this.defaultCurrent,
        "userId": this.$route.query.userId,
      }
      getFollowList(parameter).then( res => {
        if(res.success === true) {
          this.followList = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载用户关注异常',err.message)
      })
    },
    //判断是否为当前用户的博客，是可以取消关注，不是隐藏取消关注按钮
    handleIsSelf() {
      let userId = this.$route.query.userId
      isLogin().then(res => {
        if (res.success === true) {
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
    //用户取消关注
    handleCancelFocus(id) {
      console.log("取消关注：" + id)
      deleteFollow(id).then( res => {
        if(res.success === true) {
          this.handleLoadFocus()
        }
      }).catch(err => {
         console.log('取消用户关注异常',err.message)
      })
    },
 },
 created() {
   this.handleLoadFocus() //加载用户关注
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
  .title {
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: white;
    padding: 15px;
  }
  .followList {
    width: 100%;
    background-color: white;
  }
  .follow {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
  .pagination {
    float: right;
  }
</style>