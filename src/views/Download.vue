<!--下载页面-->
<template>
<a-locale-provider :locale="zh_CN">
    <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" :gutter="10" justify="center" class="download_body">
     <!-- 资源列表 -->
     <a-col :span="5">
       <!-- 用户个人信息框 -->
      <a-row style="padding: 15px;background-color: white;">
        <a-col :span="24">
          <a-row type="flex" justify="center" >
            <a-col :span="8">
              <a-row type="flex" align="middle" justify="center" style="height: 80px;">
                <a-avatar :size="64" src="" alt="用户头像" />
              </a-row>
            </a-col>
            <a-col :span="16" v-if="isLogin">
              <a-row type="flex" align="bottom" style="height: 50%;">
                <a @click="showBlogger"><h4 class="user_name">ACodeBird</h4></a>
              </a-row>
              <a-row style="height: 50%;">
                积分:<span style="color: red;">1000</span>
              </a-row>
            </a-col>
            <a-col :span="16" v-else>
              <a-row type="flex" align="middle" style="height: 50%;">
                <a-button @click="handleLogin" size="small" type="primary">立即登录</a-button>
              </a-row>
              <a-row style="height: 50%;">
                <span style="color: red;">Hi!欢迎来到ITHub下载专区</span>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-button @click="handleUpload" type="danger" style="width: 100%;">上传资源赚取积分</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
     </a-col>
     <a-col :span="16">
       <a-row type="flex">
          <a-col :span="24">
            <template>
              <div class="search">
                <a-input-group compact>
                  <a-select defaultValue="all" @change="handleChangeSelect">
                    <a-select-option value="all">所有</a-select-option>
                    <a-select-option value="tool">工具类</a-select-option>
                    <a-select-option value="code">代码类</a-select-option>
                    <a-select-option value="file">文档类</a-select-option>
                    <a-select-option value="other">其他</a-select-option>
                  </a-select>
                  <a-input-search style="width: 80%;" placeholder="请输入关键字" @search="onSearch" enterButton />
                </a-input-group>
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
                    <div class="description" :title="resource.description">
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
import HeaderTag from './Header'
import FooterTag from './Footer'

const resources = [];
for(let i = 0; i<20; i++) {
  resources.push({
      id: 1,
      title: `json复杂数据解析demo${i}`,
      description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
      integral: 5+i,
      time: '2020-03-01',
      author: 'C_K',
  });
}

export default {
 name: 'DownLoad',
 data () {
    return {
      zh_CN,
      resources,
      isLogin: true,
      select: 'all',
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
    handleChangeSelect(value) {
      this.select = value;
    },
    onSearch(value) {
      console.log(`查询内容:${this.select}=>${value}`);
    },
    showBlogger() {
      console.log(`点击前往博主博客`);
      this.$router.push({path: '/article'});
    },
    handleLogin() {
      console.log(`去登陆`);
      this.$router.push({name: 'Login'});
    },
    handleUpload() {
      if(this.isLogin) {
        console.log(`去上传资源`);
      }else{
        console.log(`去登陆`);
        this.$router.push({name: 'Login'});
      }
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`);
    },
 }
}

</script>

<style scoped>
  .download_body{
    background-color: #f5f6f7;
    border-top: 2px solid white;
    padding-top: 50px;
  }
  .search {
    width: 100%;
    height: 100px;
    border: 1px solid #ddd;
    background-color: white;
    padding-top: 30px;
    text-align: center;
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
    margin-bottom: 30px;
  }
</style>