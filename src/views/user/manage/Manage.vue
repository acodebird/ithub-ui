<!--用户管理界面-->
<template>
<a-locale-provider :locale="zh_CN">
    <div>
        <!-- 头部公共组件 -->
        <header-tag></header-tag>
        <!-- body内容 -->
        <a-row class="manageBody">
            <!-- 主页body左边导航栏 -->
            <a-col :span="6">
                <a-row type="flex" justify="end">
                    <a-col :span="10">
                        <div>
                            <a-menu 
                            mode="inline" 
                            @select="handleSelect"
                            :defaultSelectedKeys="['1']"
                            :defaultOpenKeys="['sub1']"
                            >
                            <a-sub-menu key="sub1">
                                <span slot="title"><a-icon type="dashboard" /><span>博客管理</span></span>
                                <a-menu-item key="1"><a-icon type="file-text" />文章管理</a-menu-item>
                                <a-menu-item key="2"><a-icon type="message" />评论管理</a-menu-item>
                                <a-menu-item key="3"><a-icon type="folder" />专栏管理</a-menu-item>
                            </a-sub-menu>
                            <a-menu-item key="4"><a-icon type="appstore" />资源管理</a-menu-item>
                            </a-menu>
                        </div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="18">
                <keep-alive  include="ArticleManage">
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

export default {
 name: 'Manage',
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
     handleSelect: function(e) {
     switch(e.key) {
      case '1':
        this.$router.push('/manage/article')
        break;
      case '2':
        this.$router.push('/manage/comment')
        break;
      case '3':
        this.$router.push('/manage/category')
        break;
      case '4':
        this.$router.push('/manage/resource')
        break;
     }
   },
 }
}

</script>

<style scoped>
    .manageBody {
        background-color: #f5f6f7;
        border-top: 2px solid white;
        padding-top: 10px;
        padding-bottom: 15px;
        width: 100%;
    }
</style>