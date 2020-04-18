import Vue from 'vue'
import Router from 'vue-router'
// 引入网站主页界面
import Home from '@/views/Home'
// 引入用户界面
// 1.用户注册界面
import Register from '@/views/user/Register'
// 2.用户登录界面 
import Login from '@/views/user/Login' 
// 3.用户找回密码界面 
import Reset from '@/views/user/ResetPassword'
// 4.用户文章相关页面
//    4.1用户文章页面
import Article from '@/views/user/article/ArticleList'
//    4.2用户文章详情页面
import ArticleDetail from '@/views/user/article/ArticleDetail'
//    4.3用户文章专栏页面
import ArticleCategory from '@/views/user/article/ArticleCategory'
//    4.4用户收藏夹页面
import ArticleCollectionList from '@/views/user/article/ArticleCollectionList'
//    4.5用户收藏夹详情页面
import ArticleCollections from '@/views/user/article/ArticleCollections'
//    4.6用户写作页面
import Writing from '@/views/user/article/Writing'
// 5.用户中心相关页面
//    5.1用户关注列表页面
import FollowList from '@/views/user/center/FollowList'
//    5.2用户粉丝列表页面
import FansList from '@/views/user/center/FansList'
//    5.3用户资源列表页面
import ResourceList from '@/views/user/center/ResourceList'
//    5.4用户个人信息页面
import Profile from '@/views/user/center/Profile'
// 6.用户消息相关页面
import Message from '@/views/user/message/Message'
// 7.下载页面
import Download from '@/views/Download'
// 8.用户博客管理相关页面
import Manage from '@/views/user/manage/Manage'


// 1.引入管理页面
import Admin from '@/views/admin/Home'
// 2.引入管理员登录页面
import AdminLogin from '@/views/admin/Login'

// 1.引入403页面
import Exception403 from '@/views/Exception403'

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


Vue.use(Router)

export default new Router({
  mode: 'history',/* 去除访问地址中的# */
  /* 该函数解决路由跳转后页面定位不是顶部的问题 */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; //当浏览器前进或后退时页面保留前一页面的定位
    }else {
      //否则新页面定位到顶部
      return {
        x: 0,
        y: 0
      };
    }
  },
  routes: [
    /* 网站主页路由注册 */
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    /* 用户路由注册 */
    // 1.用户注册页面
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // 2.用户登录页面
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 3.用户找回密码页面
    {
      path: '/reset',
      name: 'Reset',
      component: Reset
    },
    // 4.文章模块路由注册
    {
      //    4.1用户文章页面
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      //    4.2用户文章详情页面
      path: '/article/detail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      //    4.3用户文章专栏页面
      path: '/article/category',
      name: 'ArticleCategory',
      component: ArticleCategory
    },
    // {
    //   //    4.4用户收藏夹页面
    //   path: '/article/collection-list',
    //   name: 'ArticleCollectionList',
    //   component: ArticleCollectionList
    // },
    {
      //    4.5用户收藏夹详情页面
      path: '/article/collection-list',
      name: 'ArticleCollections',
      component: ArticleCollections
    },
    {
      //    4.6用户写作页面
      path: '/article/write',
      name: 'Writing',
      component: Writing
    },
    // 5.用户中心相关页面
    {
      //    5.1.用户关注列表页面
      path: '/uc/follow-list',
      name: "FollowList",
      component: FollowList
    },
    {
      //    5.2.用户粉丝列表页面
      path: '/uc/fans-list',
      name: "FansList",
      component: FansList
    },
    {
      //    5.3.用户资源列表页面
      path: '/uc/resource-list',
      name: "ResourceList",
      component: ResourceList
    },
    {
      //    5.4.用户个人信息页面
      path: '/uc/profile',
      name: "Profile",
      component: Profile
    },
    // 6.用户消息相关页面
    {
      path: '/msg',
      name: 'Message',
      redirect: '/msg/notices',
      component: Message,
      children: [
        {
          path: '/msg/notices',
          name: 'Notices',
          component: () => import('@/views/user/message/Notices')
        },
        {
          path: '/msg/comments',
          name: 'Comments',
          component: () => import('@/views/user/message/Comments')
        },
        {
          path: '/msg/likes',
          name: 'Likes',
          component: () => import('@/views/user/message/Likes')
        },
        {
          path: '/msg/focus',
          name: 'Focus',
          component: () => import('@/views/user/message/Focus')
        },
      ]
    },
    //7.下载页面
    {
      path: '/download',
      name: 'Download',
      component: Download
    },
    //8.用户博客管理页面
    {
      path: '/manage',
      name: 'Manage',
      redirect: '/manage/article',
      component: Manage,
      children: [
        {
          path: '/manage/article',
          name: 'ArticleManage',
          component: () => import('@/views/user/manage/ArticleManage')
        },
        {
          path: '/manage/comment',
          name: 'CommentManage',
          component: () => import('@/views/user/manage/CommentManage')
        },
        {
          path: '/manage/category',
          name: 'CategoryManage',
          component: () => import('@/views/user/manage/CategoryManage'),
        },
        {
          path: '/manage/category/:categoryId',
          name: 'CategoryArticleManage',
          component: () => import('@/views/user/manage/CategoryArticleManage')
        },
        {
          path: '/manage/resource',
          name: 'ResourceManage',
          component: () => import('@/views/user/manage/ResourceManage')
        },
      ]
    },

    //  后台管理路由注册
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/user-list',
      component: Admin,
      children: [
        {
          path: '/admin/user-list',
          name: 'UserList',
          component: () => import('@/views/admin/UserList')
        },
        {
          path: '/admin/article-list',
          name: 'ArticleList',
          component: () => import('@/views/admin/ArticleList')
        },
        {
          path: '/admin/comment-list',
          name: 'CommentList',
          component: () => import('@/views/admin/CommentList')
        },
        {
          path: '/admin/document-list',
          name: 'DocumentList',
          component: () => import('@/views/admin/DocumentList')
        },
        {
          path: '/admin/notices-list',
          name: 'NoticesList',
          component: () => import('@/views/admin/NoticesList')
        },
        {
          path: '/admin/role-list',
          name: 'RoleList',
          component: () => import('@/views/admin/RoleList')
        },
        {
          path: '/admin/resource-list',
          name: 'ResourceList',
          component: () => import('@/views/admin/ResourceList')
        },
      ]
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
    },
    //异常页面
    {
      path: '/403',
      name: 'Exception403',
      component: Exception403,
    },
  ]
})
