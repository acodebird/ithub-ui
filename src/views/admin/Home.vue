<!--管理界面-->
<template>
 <a-layout id="components-layout-demo-custom-trigger" >
    <a-layout-sider>
      <div class="logo" >ItHub后台管理</div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" :openKeys="openKeys" @openChange="onOpenChange" @select="handleSelect">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="team" /><span>用户管理</span></span>
          <a-menu-item key="1">用户列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="read" /><span>博客管理</span></span>
          <a-menu-item key="2">文章列表</a-menu-item>
          <a-menu-item key="3">评论列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="download" /><span>资源管理</span></span>
          <a-menu-item key="4">资源列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="message" /><span>消息管理</span></span>
          <a-menu-item key="5">消息列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title"><a-icon type="appstore" /><span>权限管理</span></span>
          <a-menu-item key="6">角色列表</a-menu-item>
          <a-menu-item key="7">权限列表</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="float: right;padding-right: 50px;">
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              <a-avatar icon="user" :title="user.username" :src="user.avatar" />{{user.username}} 
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="changePwd"><a-icon type="exclamation" />修改密码</a-menu-item>
              <a-menu-item key="2" @click="handleLogout"><a-icon type="logout" />退出</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '732px' }">
        <keep-alive  include="UserList">
          <router-view/>
        </keep-alive>
      </a-layout-content>
    </a-layout>
    <!-- 使用子组件 ref绑定子组件的名字 -->
    <change-password ref="changeModal" @ok="handleOk" /> 
  </a-layout>
</template>

<script>
import {logout,isLogin } from '@/api/login'
import {addUser,noPermission,normal } from '@/api/user'
import ChangePassword from './form/ChangePassword'


export default {
 name: 'Home',
 components: {
   ChangePassword,
 },
 data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'],
      openKeys: ['sub1'],
      user: {},
   };
 },
 methods: {
   //导航菜单选中跳转路由
   handleSelect: function(e) {
     switch(e.key) {
      case '1':
        this.$router.push('/admin/user-list')
        break;
      case '2':
        this.$router.push('/admin/article-list')
        break;
      case '3':
        this.$router.push('/admin/comment-list')
        break;
      case '4':
        this.$router.push('/admin/document-list')
        break;
      case '5':
        this.$router.push('/admin/notices-list')
        break;
      case '6':
        this.$router.push('/admin/role-list')
        break;
      case '7':
        this.$router.push('/admin/resource-list')
        break;
     }
   },
   //只展开当前父级菜单
   onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    //注销登录
   handleLogout() {
     console.log(`退出管理系统`);
     logout().then(res => {
       if(res.success === true) {
         this.$notification.success({message: "成功退出登录"})
         this.$router.push({path:'/admin/login'})
       }
     }).catch(ex => {
       this.$message.error(`退出登录失败`)
     })
   },
   //打开修改密码表单
   changePwd() {
     console.log(`修改密码：${this.user.id}`)
      this.$refs.changeModal.change(this.user.id) //打开修改密码表单
   },
   //表单回调函数
    handleOk() {
      //修改密码成功后退出当前界面重新登录
      this.handleLogout();
    },
 },
 created (){
    //判断用户是否登录
    isLogin().then(res => {
      if (res.success === true) {
        this.user=res.data
        return
      }
      this.$notification.error({message: "用户未登录"})
      this.$router.push('/admin/login')
    }).catch(ex => {
      console.log('isLogin error',ex.message)
    })
  }
}

</script>

<style scoped>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    width: 195px;
    height: 31px;
    margin: 16px 24px 16px 0;
    float: left;
    text-align: center;
    line-height: 31px;
    color: wheat;
    font-size: 22px;
  }

</style>