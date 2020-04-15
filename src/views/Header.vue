<!--用户界面头部导航栏组件-->
<template>
 <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header class="header">
      <div class="logo">
          <img src="../assets/ITHub.svg" alt="网站logo">
      </div>
      <div style="float:left">
        <a-menu
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        class="menu"
        >
          <a-menu-item key="首页">
            <router-link to="/">首页</router-link>
          </a-menu-item>
          <a-menu-item key="下载">
            <router-link to="/download">下载</router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <div>
        <a-divider type="vertical" />
        <a-input-search placeholder="输入关键字" style="width: 200px" @search="onSearch" />
        <div style="float:right;margin-right:100px;">
          <a-button type="link" @click="onWriteBlog"><a-icon type="form" />写博客</a-button>
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              <a-badge :count="1">
                <a-icon type="bell" :style="{ fontSize: '20px' }" /> 
              </a-badge>
            </a>
            <a-menu slot="overlay" @click="onClickBell">
              <a-menu-item key="0">系统通知</a-menu-item>
              <a-menu-item key="1">评论</a-menu-item>
              <a-menu-item key="2">关注</a-menu-item>
              <a-menu-item key="3">点赞</a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-divider type="vertical" />
          <a-button size="small" v-show="!isLogin"><router-link to="/login">登录</router-link></a-button>
          <a-button size="small" v-show="!isLogin"><router-link to="/register">注册</router-link></a-button>
          <a-dropdown v-show="isLogin">
            <a class="ant-dropdown-link" href="#"><a-avatar icon="user" title="acodebird" src="../assets/acodebird.jpg" /> </a>
            <a-menu slot="overlay" @click="onClickUser">
              <a-menu-item key="0"><a-icon type="schedule" />签到</a-menu-item>
              <a-menu-item key="1"><a-icon type="user" />个人中心</a-menu-item>
              <a-menu-item key="2"><a-icon type="form" />我的博客</a-menu-item>
              <a-menu-item key="3"><a-icon type="setting" />管理博客</a-menu-item>
              <a-menu-item key="4"><a-icon type="download" />我的下载</a-menu-item>
              <a-menu-item key="5"><a-icon type="logout" />退出</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<script>
const clickType = {
  0: {
    text: '签到',
    name: 'Article',
  },
  1: {
    text: '个人中心',
    name: 'Article',
  },
  2: {
    text: '我的博客',
    name: 'Article',
  },
  3: {
    text: '管理博客',
    name: 'Article',
  },
  4: {
    text: '退出',
    name: 'Article',
  },
}

const msgType = {
  0: {
    text: '系统通知',
    path: '/msg/notices',
  },
  1: {
    text: '评论',
    path: '/msg/comments',
  },
  2: {
    text: '关注',
    path: '/msg/focus',
  },
  3: {
    text: '点赞',
    path: '/msg/likes',
  },
}

export default {
 name: 'Header',
 data () {
    return {
      isLogin: true,
   };
 },

 components: {},

 computed: {},

 methods: {
   onSearch(value) {
      console.log(`查询内容:${value}`);
   },
   onClickBell({ key }) {
     console.log(`Click on item ${key}`);
     this.$router.push({path: `${msgType[key].path}`});
   },
   onClickUser({ key }) {
     console.log(key)
     console.log(`Click on item ${clickType[key].text}`);
     let routeData = this.$router.resolve({
          name: `${clickType[key].name}`,
          //query: params,
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
   },
   onWriteBlog() {
     console.log(`写博客去啦！`);
     //路由跳转，跳转到新页面
     let routeData = this.$router.resolve({
          name: "Writing",
          //query: params,
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
      //路由跳转，但不打开新页面
    // this.$router.push({path: '/article/write'});
   },
 }
}

</script>

<style scoped>
  #components-layout-demo-top .logo {
    width: 120px;
    height: 64px;
    margin: 0 24px 0 0;
    float: left;
  }
  .header {
      width: 100%;
      background-color: white;
      padding-left: 100px;
  }
  .menu {
    border: 0px;
  }
</style>