<!--用户评论管理页面-->
<template>
<a-locale-provider :locale="zh_CN">
 <div class="right_body" style="width: 90%;">
     <a-row>
         <a-col>
            <a-menu 
            mode="horizontal" 
            @select="handleSelect"
            :defaultSelectedKeys="['1']"
            >
                <a-menu-item key="1">我的文章评论</a-menu-item>
                <a-menu-item key="2">我发表的评论</a-menu-item>
            </a-menu>
         </a-col>
     </a-row>
     <a-row style="background-color: white;">
         <a-col>
             <template>
                <a-list itemLayout="horizontal" size="large" :pagination="pagination" :dataSource="listData" :bordered="true">
                    <a-list-item slot="renderItem" slot-scope="item" key="item.id" v-if="isArticleComment">
                        <a slot="actions" @click="handleReply(item.id)">快速回复</a>
                        <a slot="actions" @click="handleDelete(item.id)">删除</a>
                        <a-list-item-meta :description="item.summary">
                            <span slot="title" class="name_span">{{item.name}}</span>
                            <span slot="title" class="time_span">在&nbsp;{{item.time}}&nbsp;回复你的文章</span>
                            <a slot="title" @click="handleShow(item)" title="查看" style="font-size: 20px;"><b>{{item.title}}</b></a>
                            <a-avatar slot="avatar"><a-icon type="user" /></a-avatar>
                        </a-list-item-meta>
                    </a-list-item>
                    <a-list-item slot="renderItem" slot-scope="item" key="item.id" v-else>
                        <a slot="actions" @click="handleDelete(item.id)">删除</a>
                        <a-list-item-meta :description="item.summary">
                            <span slot="title" class="name_span">我</span>
                            <span slot="title" class="time_span">在&nbsp;{{item.time}}&nbsp;评论了</span>
                            <span slot="title" class="name_span">{{item.name}}</span>
                            <span slot="title" class="time_span">的文章</span>
                            <a slot="title" @click="handleShow(item)" title="查看" style="font-size: 20px;"><b>{{item.title}}</b></a>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </template>
         </a-col>
     </a-row>
 <!-- 添加文件夹表单组件 -->
 <reply-tag ref="replyModal" @ok="handleOk"></reply-tag>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import ReplyTag from '../form/QuikReply'

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        id: i+1,
        name: 'Janson',
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        title: `springboot项目部署到服务器后无法发送邮件的问题 ${i}`,
        summary: ' To help people create their product prototypes beautifully and efficiently.',
    });
}

export default {
 name: 'CommentManage',
 data () {
    return {
        zh_CN,
        listData,
        pagination: {
            onChange: page => {
                console.log(`翻页：${page}`);
            },
            pageSize: 13,
        },
        isArticleComment: true,
   };
 },

 components: {
    ReplyTag,
 },

 computed: {},

 methods: {
     //查看我的文章评论/我发表的评论
    handleSelect({key}) {
        console.log(`1代表我的文章评论；2代表我发表的评论:${key}`);
        if(key == 2) {
            this.isArticleComment = false;
        }else {
            this.isArticleComment = true;
        }
    },
    handleDelete(id) {
        console.log(`删除文章${id}`);
    },
    handleShow(e) {
        console.log(`查看文章详情`);
        let routeData = this.$router.resolve({
            name: 'ArticleDetail',
            query: { bid: e.id },
        });
        window.open(routeData.href, '_blank');
    },
    //快速回复操作后返回上一级路由
    handleOk() {
        this.$router.go(0)
    },
    handleReply(id) {
        console.log(`快速回复评论${id}`);
        //打开快速回复表单
        this.$refs.replyModal.reply(id);
    },
 }
}

</script>

<style scoped>
    .right_body {
        width: 90%;
        min-height: 550px;
    }
    .name_span {
        color: #000;
        font-size: 18px;
        font-weight: 400;
        margin-right: 5px;
    }
    .time_span {
        color: #999;
        margin-right: 5px;
    }
</style>