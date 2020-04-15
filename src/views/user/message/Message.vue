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
                        :defaultSelectedKeys="['0']"
                        >
                        <a-menu-item key="0">
                            <a-icon type="setting" />系统通知
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a-icon type="message" />评论
                        </a-menu-item>
                        <a-menu-item key="2">
                            <a-icon type="user-add" />关注
                        </a-menu-item>
                        <a-menu-item key="3">
                            <a-icon type="like" />点赞
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
   };
 },

 components: {
    HeaderTag,
    FooterTag,
 },

 computed: {},

 methods: {
    handleSelect( {key} ) {
     console.log(`点击导航菜单${key}`);
     this.$router.push({path: `${msgType[key].path}`});
   },
 }
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