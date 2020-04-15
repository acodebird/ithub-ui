<!--资源列表-->
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
              <div class="item">
                  <a-row type="flex" align="middle" justify="start" style="height: 100%;">
                      <a-col>
                          <span style="color: red; font-weight: 700;">
                            Ta的资源({{count}})
                          </span>
                      </a-col>
                  </a-row>
              </div>
            </template>
            <template>
              <div class="resourceList" v-for="(resource, index) in resources" :key="index">
                <a-row class="resource">
                  <a-col>
                    <h4 class="title">
                      {{resource.title}}
                    </h4>
                    <div class="info">
                      <div style="float: left">
                        <span>
                          <a @click="showBlogger">上传作者：{{resource.author}}</a>
                        </span>
                        <span>上传时间：{{resource.time}}</span>
                        <span>所需积分：{{resource.integral}}</span>
                      </div>
                    </div>
                    <div style="float: right">
                        <a-button type="danger">下载</a-button>
                      </div>
                    <br><br>
                    <div class="description">
                     {{resource.description}}
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

export default {
 name: 'ResourceList',
 data () {
    return {
      zh_CN,
      resources: [
          {
              id: 1,
              title: 'json复杂数据解析demo1',
              description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
              integral: 5,
              time: '2020-03-01',
              author: 'C_K',
          },
          {
              id: 2,
              title: 'json复杂数据解析demo2',
              description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
              integral: 6,
              time: '2020-03-01',
              author: 'C_K',
          },
          {
              id: 3,
              title: 'json复杂数据解析demo3',
              description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
              integral: 8,
              time: '2020-03-01',
              author: 'C_K',
          },
          {
              id: 4,
              title: 'json复杂数据解析demo4',
              description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
              integral: 2,
              time: '2020-03-01',
              author: 'C_K',
          },
          {
              id: 5,
              title: 'json复杂数据解析demo5',
              description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
              integral: 3,
              time: '2020-03-01',
              author: 'C_K',
          },
          {
              id: 6,
              title: 'json复杂数据解析demo6',
              description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
              integral: 2,
              time: '2020-03-01',
              author: 'C_K',
          },
      ],
      count: 10,
      defaultCurrent: 1,
      total: 100,
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
  .item {
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: white;
    padding: 15px;
  }
  .resourceList {
    width: 100%;
    background-color: white;
  }
  .resource {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
  .title {
    color: #333;
    font-size: 20px;
  }
  .info span{
    margin: 5px;
  }
  .description {
    color: #8a8a8a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pagination {
    float: right;
  }
</style>