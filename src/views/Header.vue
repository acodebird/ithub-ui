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
          <a-dropdown v-show="isLogin">
            <a class="ant-dropdown-link" href="#">
              <a-badge :count="noticesUnread.count">
                <a-icon type="bell" :style="{ fontSize: '20px' }" /> 
              </a-badge>
            </a>
            <a-menu slot="overlay" @click="onClickBell">
              <a-menu-item key="0">系统通知&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.system}}</span></a-menu-item>
              <a-menu-item key="1">评论&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.comment}}</span></a-menu-item>
              <a-menu-item key="2">关注&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.focus}}</span></a-menu-item>
              <a-menu-item key="3">点赞&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.like}}</span></a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- <router-link to="/login"></router-link>
          <router-link to="/register"></router-link> -->
          <a-divider type="vertical" />
          <a-button size="small" v-show="!isLogin" @click="handleLoginAndRegister('/login')">登录</a-button>
          <a-button size="small" v-show="!isLogin" @click="handleLoginAndRegister('/register')">注册</a-button>
          <a-dropdown v-show="isLogin">
            <a class="ant-dropdown-link" href="#"><a-avatar icon="user" :title="user.username" :src="user.avatar" /> </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" v-if="!isSign" @click="handleSign">
                <a-icon type="schedule" />签到
              </a-menu-item>
              <a-menu-item key="0" disabled v-else>
                <a-icon type="schedule" />已签到
              </a-menu-item>
              <a-menu-item key="1" @click="handleProfile"><a-icon type="user" />个人信息</a-menu-item>
              <a-menu-item key="2" @click="handleArticle"><a-icon type="form" />我的博客</a-menu-item>
              <a-menu-item key="3" @click="handleManage"><a-icon type="setting" />管理博客</a-menu-item>
              <a-menu-item key="4" @click="handleLogout"><a-icon type="logout" />退出</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<script>
import { isLogin, logout } from '@/api/login'
import { getUnread } from '@/api/notices'
import { isSign, sign } from '@/api/user'

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
      isLogin: false,
      user:{
        id: '',
        username:'',
        avatar:''
      },
      noticesUnread: {
        count: '',
        like: '',
        focus: '',
        comment: '',
        system: '',
      },
      isSign: false,
   };
 },

 components: {},

 computed: {},

 methods: {
   onSearch(value) {
      console.log(`查询内容:${value}`);
      let routeData = this.$router.resolve({
          path: `/`,
          query: {"queryParam":value},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
   },
   handleLoginAndRegister(url) {
      let routeData = this.$router.resolve({
          path: url,
      });
      window.open(routeData.href, '_blank');
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
      if(!this.isLogin) {
        this.$router.push({path: '/login'});
        return
      }
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
   //注销登录
   handleLogout() {
     console.log(`注销登录`);
     logout().then(res => {
       if(res.success === true) {
         this.user = {}
         this.isLogin = false
         this.$message.success(`成功退出登录`)
         //this.$router.push({path:'/'})
         this.$router.go(0)
       }else {
         this.$router.go(0)
       }
     }).catch(ex => {
       this.$message.error(`退出登录失败`)
     })
   },
   //个人信息页面
   handleProfile() {
     this.$router.push({path: '/uc/profile'});
   },
   //个人博客页面
   handleArticle() {
     this.$router.push({path: '/article',query: {"userId": this.user.id}});
   },
   //管理博客页面
   handleManage() {
     this.$router.push({path: '/manage',query: {"userId": this.user.id}});
   },
   //加载未读消息数量
   handleUnread() {
     getUnread().then(res => {
      if (res.success === true) {
        this.noticesUnread.count = res.data.count > 0 ? res.data.count : ''
        this.noticesUnread.like = res.data.like > 0 ? res.data.like : ''
        this.noticesUnread.focus = res.data.focus > 0 ? res.data.focus : ''
        this.noticesUnread.comment = res.data.comment > 0 ? res.data.comment : ''
        this.noticesUnread.system = res.data.system > 0 ? res.data.system : ''
      }else {
        this.$router.go(0)
      }
    }).catch(ex => {
      console.log('获取未读消息数量出错',ex.message)
    })
   },
   //判断用户是否签到函数
   handleIsSign() {
     isSign().then(res => {
        if(res.success === true) {
          this.isSign = true
          console.log("今天已经签到")
        }else if(res.data === '今天未签到'){
          console.log("今天未签到")
        }else {
          this.$router.go(0)
        }
      }).catch(err => {
        console.log('判断用户是否签到出错',err.message)
      })
   },
   //用户签到函数
   handleSign() {
    console.log("签到")
    sign().then(res => {
      if(res.success === true) {
        this.$message.success(`${res.data}`)
        this.isSign = true
      }else{
        this.$router.go(0)
      }
    })
  }
 },

 created (){
    //判断用户是否登录
    isLogin().then(res => {
      if (res.success === true) {
        this.user.id = res.data.id
        this.user.username = res.data.username
        this.user.avatar = res.data.avatar
        this.isLogin = true
        console.log("加载未读消息数量")
        this.handleUnread()
        this.handleIsSign()
        return
      }
    }).catch(ex => {
      console.log('isLogin error',ex.message)
    })

  },
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