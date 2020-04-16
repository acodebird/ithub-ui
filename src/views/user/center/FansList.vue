<!--粉丝列表页面-->
<template>
<a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" justify="start" :gutter="16" class="article_body">
     <!-- 左边公共组件 -->
     <left-tag></left-tag>
     <!-- 右边关注列表 -->
     <a-col :span="14">
       <a-row type="flex">
          <a-col :span="24">
            <template>
              <div class="title">
                  <a-row type="flex" align="middle" justify="start" style="height: 100%;">
                      <a-col>
                          <span style="color: red; font-weight: 700;">
                            Ta的粉丝({{count}})
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
                                <a @click="showBlogger">
                                    <a-avatar :size="64" :src="follow.avatar" alt="用户头像"></a-avatar>
                                </a>
                            </a-col>
                            <a-col>
                                <a @click="showBlogger" style="color: #333;font-weight: 700;">{{follow.name}}</a>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="16">
                        <a-row type="flex" justify="end">
                            <a-col>
                                <a-button type="danger">关注</a-button>
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

export default {
 name: 'FansList',
 data () {
    return {
      zh_CN,
      followList: [
          {
              id: 1,
              name: 'Monkey',
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          },
          {
              id: 2,
              name: 'Apple',
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          },
          {
              id: 3,
              name: '南人',
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          },
          {
              id: 4,
              name: '奥里给',
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          },
          {
              id: 5,
              name: '老阿布',
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          },
          {
              id: 6,
              name: 'C_K',
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          },
      ],
      count: 100,
      defaultCurrent: 1,
      total: 100,
   };
 },

 components: {
   HeaderTag,
   FooterTag,
 },

 computed: {},

 methods: {
    showBlogger() {
      console.log(`点击前往博主博客`);
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`);
    },
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