<!--文章收藏-->
<template>
 <a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" justify="start" :gutter="16" class="article_body">
     <!-- 左边公共组件 -->
     <left-tag></left-tag>
     <!-- 右边文章列表 -->
     <a-col :span="14">
       <a-row type="flex">
          <a-col :span="24">
            <template>
              <div class="category_title">
                <a-row style="height:100%;" type="flex" align="middle" justify="end">
                    <a-col :span="4">
                        <a-row type="flex" align="middle" justify="start">
                            <a-icon type="star" theme="twoTone" style="fontSize: 120px;" />
                        </a-row>
                    </a-col>
                    <a-col :span="20">
                        <a-row type="flex" justify="start" align="middle">
                            <a-col>
                                <strong style="font-size: 22px;">Ta的收藏</strong>
                            </a-col>
                            <a-col>
                                <a-divider type="vertical"></a-divider>
                            </a-col>
                            <a-col>
                                <a-button type="danger" @click="addCollections"><a-icon type="plus" />创建收藏夹</a-button>
                            </a-col>
                        </a-row>
                        <a-row></a-row>
                    </a-col>
                </a-row>
              </div>
            </template>
            <template>
              <div class="collection_list" v-for="(collections,index) in collectionList" :key="index">
                <div style="border: 1px solid #ddd;height: 70px;padding: 10px;">
                  <a-row type="flex" align="middle" style="height: 100%;">
                    <a-col :span="8">
                      <a-row>
                        <a-col>
                          <a title="进入收藏夹" @click="handleToCollections">
                            <span style="color: black; font-weight: 700;cursor: pointer;font-style: normal;">
                              {{collections.name}}
                            </span>
                          </a>
                        </a-col>
                      </a-row>
                      <a-row>
                        <a-col>
                          <span style="font-size: 13px;">{{collections.count}}篇文章</span>
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-col :span="16">
                      <a-row type="flex" justify="end">
                        <a-col>
                          <a title="进入收藏夹" @click="handleToCollections"><a-icon type="right" style="fontSize: 18px;" /></a>
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                </div>
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
 <!-- 添加文件夹表单组件 -->
 <add-tag ref="addModal" @ok="handleOk"></add-tag>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import HeaderTag from '../../Header'
import FooterTag from '../../Footer'
import LeftTag from './ArticleLeft'
import AddTag from '../form/AddCollections'

export default {
 name: 'ArticleCollectionList',
 data () {
    return {
      zh_CN,
      collectionList: [
        {
          id: 1,
          name: "默认收藏夹",
          count: 4
        },
        {
          id: 2,
          name: "Spring",
          count: 21
        },
        {
          id: 3,
          name: "面试",
          count: 13
        },
      ],
   };
 },

 components: {
   HeaderTag,
   FooterTag,
   LeftTag,
   AddTag,
 },

 computed: {},

 methods: {
   addCollections() {
     /* 打开添加收藏夹表单组件 */
     this.$refs.addModal.add();
   },
   //添加收藏夹操作后关闭表单
   handleOk() {
     this.$router.go(0)
   },
   handleToCollections() {
     console.log(`进入收藏夹`);
     this.$router.push({path: "/article/collection"});
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
  /* 收藏夹列表样式 */
  .collection_list {
    width: 100%;
    background-color: white;
  }


  
  /* 右边文章列表样式 */
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
</style>