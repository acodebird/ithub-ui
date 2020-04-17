<!--用户消息界面-->
<template>
<a-locale-provider :locale="zh_CN">
    <div>
        <!-- 头部公共组件 -->
        <header-tag></header-tag>
        <!-- 主页body -->
        <a-row class="msgBody">
            <!-- 主页body左边导航栏 -->
            <a-col :span="6">
                <a-row type="flex" justify="end">
                <a-col :span="10">
                    <div>
                        <a-menu 
                        mode="vertical" 
                        @select="handleSelect"
                        :defaultSelectedKeys="[key]"
                        >
                        <a-menu-item key="/msg/notices">
                            <a-icon type="setting" />系统通知&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.system}}</span>
                        </a-menu-item>
                        <a-menu-item key="/msg/comments">
                            <a-icon type="message" />评论&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.comment}}</span>
                        </a-menu-item>
                        <a-menu-item key="/msg/focus">
                            <a-icon type="user-add" />关注&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.focus}}</span>
                        </a-menu-item>
                        <a-menu-item key="/msg/likes">
                            <a-icon type="like" />点赞&nbsp;<span style="color: red;font-weight: 500">{{noticesUnread.like}}</span>
                        </a-menu-item>
                        </a-menu>
                    </div>
                </a-col>
                </a-row>
            </a-col>
            <a-col :span="18">
                <keep-alive  include="Notices">
                    <router-view/>
                </keep-alive>
            </a-col>
        </a-row>
        <!-- 回到顶部 -->
        <a-back-top />
        <!-- 脚部公共组件 -->
        <br><br>
        <footer-tag></footer-tag>
    </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import HeaderTag from '../../Header'
import FooterTag from '../../Footer'
import { getUnread } from '@/api/notices'
import { isLogin } from '@/api/login'

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
 name: 'Message',
 data () {
    return {
        zh_CN,
        key: this.$route.path,
        noticesUnread: {
          like: '',
          focus: '',
          comment: '',
          system: '',
        },
   };
 },

 components: {
    HeaderTag,
    FooterTag,
 },

 computed: {},

 methods: {
    handleSelect( {key} ) {
     console.log(this.$route.path)
     console.log(`点击导航菜单${key}`);
     this.$router.push({path: `${key}`});
   },
   //加载未读消息数量
   handleUnread() {
     getUnread().then(res => {
      if (res.success === true) {
        this.noticesUnread.like = res.data.like > 0 ? res.data.like : ''
        this.noticesUnread.focus = res.data.focus > 0 ? res.data.focus : ''
        this.noticesUnread.comment = res.data.comment > 0 ? res.data.comment : ''
        this.noticesUnread.system = res.data.system > 0 ? res.data.system : ''
      }
    }).catch(ex => {
      console.log('获取未读消息数量出错',ex.message)
    })
   },
 },
 created (){
   //判断用户是否登录
    isLogin().then(res => {
      if (res.success === true) {
        this.user = res.data
      }else {
        this.$router.push({path: '/'});
      }
    }).catch(ex => {
      console.log('isLogin error',ex.message)
    })
   console.log("加载未读消息数量")
   this.handleUnread()
  },
}

</script>

<style scoped>
    .msgBody {
    background-color: #f5f6f7;
    border-top: 2px solid white;
    padding-top: 10px;
    padding-bottom: 15px;
    width: 100%;
  }
</style>