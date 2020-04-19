<!--粉丝列表页面-->
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
                            Ta的粉丝
                          </span>
                      </a-col>
                  </a-row>
              </div>
            </template>
            <template>
              <div class="followList" v-for="(follow, index) in followList" :key="index">
                <a-row class="follow" type="flex" align="middle">
                    <a-col>
                        <a-row type="flex" justify="start" align="middle">
                            <a-col>
                                <a @click="showBlogger(follow.user.id)" title="查看用户博客">
                                    <a-avatar :size="64" :src="follow.user.avatar" alt="用户头像"></a-avatar>
                                </a>
                            </a-col>
                            <a-col>
                                <a @click="showBlogger(follow.user.id)" title="查看用户博客" style="color: #333;font-weight: 700;">{{follow.user.username}}</a>
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
import LeftTag from '../article/ArticleLeft'
import { getFollowList } from '@/api/follow'

export default {
 name: 'FansList',
 data () {
    return {
      zh_CN,
      followList: [
          // {
          //     id: 1,
          //     name: 'Monkey',
          //     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          // },
          // {
          //     id: 2,
          //     name: 'Apple',
          //     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          // },
          // {
          //     id: 3,
          //     name: '南人',
          //     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          // },
          // {
          //     id: 4,
          //     name: '奥里给',
          //     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          // },
          // {
          //     id: 5,
          //     name: '老阿布',
          //     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          // },
          // {
          //     id: 6,
          //     name: 'C_K',
          //     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          // },
      ],
      defaultCurrent: 1,
      total: 0,
      currentUserId: '',
      canFocus: false,
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
    handleLoadFans() {
      let parameter = {
        "pageSize": 10, 
        "pageNo": this.defaultCurrent,
        "followId": this.$route.query.userId,
      }
      getFollowList(parameter).then( res => {
        if(res.success === true) {
          this.followList = res.data.content
          this.total = res.data.totalElements
        }
      }).catch(err => {
         console.log('加载用户粉丝异常',err.message)
      })
    },
 },
 created() {
   this.handleLoadFans() //加载用户粉丝
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