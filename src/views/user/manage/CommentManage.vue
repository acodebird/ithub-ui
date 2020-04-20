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
                        <a slot="actions" @click="handleReply(item.id,item.article.id)">快速回复</a>
                        <a slot="actions">
                            <a-popconfirm title="确认删除评论?" okText="是" cancelText="否" @confirm="handleDelete(item.id)" >
                            删除
                            </a-popconfirm>
                        </a>
                        <a-list-item-meta :description="item.content">
                            <span slot="title" class="name_span" @click="showBlogger(item.user.id)" title="查看用户">{{item.user.username}}</span>
                            <span slot="title" class="time_span">在&nbsp;{{item.createTime}}&nbsp;回复你的文章</span>
                            <a slot="title" @click="handleShow(item.article.id)" title="查看文章" style="font-size: 20px;"><b>{{item.article.title}}</b></a>
                            <a-avatar slot="avatar" @click="showBlogger(item.user.id)" :src="item.user.avatar" title="查看用户" style="cursor: pointer;"></a-avatar>
                        </a-list-item-meta>
                    </a-list-item>
                    <a-list-item slot="renderItem" slot-scope="item" key="item.id" v-else>
                        <a slot="actions">
                            <a-popconfirm title="确认删除评论?" okText="是" cancelText="否" @confirm="handleDelete(item.id)" >
                            删除
                            </a-popconfirm>
                        </a>
                        <a-list-item-meta :description="item.content">
                            <span slot="title" class="name_span">我</span>
                            <span slot="title" class="time_span">在&nbsp;{{item.createTime}}&nbsp;评论了</span>
                            <span slot="title" class="name_span" @click="showBlogger(item.user.id)" title="查看用户">{{item.article.user.username}}</span>
                            <span slot="title" class="time_span">的文章</span>
                            <a slot="title" @click="handleShow(item.article.id)" title="查看文章" style="font-size: 20px;"><b>{{item.article.title}}</b></a>
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
import { loadArticleComment, deleteCommentByNormal} from '@/api/comment'
import { isLogin } from '@/api/login'

// const listData = [];
// for (let i = 0; i < 23; i++) {
//     listData.push({
//         id: i+1,
//         name: 'Janson',
//         time: moment().format('YYYY-MM-DD HH:mm:ss'),
//         title: `springboot项目部署到服务器后无法发送邮件的问题 ${i}`,
//         summary: ' To help people create their product prototypes beautifully and efficiently.',
//     });
// }

export default {
 name: 'CommentManage',
 data () {
    return {
        zh_CN,
        listData: [],
        defaultCurrent: 1,
        pagination: {
            onChange: page => {
                this.defaultCurrent = page
                console.log(`翻页：${page}`);
            },
            pageSize: 10,
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
            this.handleLoadCommentByUser()
        }else {
            this.isArticleComment = true;
            this.handleLoadCommentByUserArticle()
        }
    },
    handleDelete(id) {
        console.log(`删除评论${id}`);
        deleteCommentByNormal(id).then( res => {
            if(res.success === true) {
                this.$message.success(`删除成功`)
                if(this.isArticleComment) {
                    this.handleLoadCommentByUserArticle()
                }else {
                    this.handleLoadCommentByUser()
                }
            }else {
                this.$message.error(`删除失败`)
            }
        }).catch( err => {
            console.log("删除文章异常" + err.message)
        })
    },
    //查看博客
    showBlogger(userId) {
      console.log(`点击前往博主博客`)
      let routeData = this.$router.resolve({
          path: `/article`,
          query: {"userId": userId},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    //查看文章
    handleShow(id) {
       console.log(`展示博客${id}详情`);
      let routeData = this.$router.resolve({
          path: `/article/detail`,
          query: {"id": id},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    //快速回复操作后返回上一级路由
    handleOk() {
        this.$message.success('快速回复成功')
        this.$router.go(0)
    },
    handleReply(id,articleId) {
        console.log(`快速回复评论:${id},${articleId}`);
        //打开快速回复表单
        this.$refs.replyModal.reply(id,articleId);
    },
    //加载用户评论
    handleLoadComment(paramter) {
        loadArticleComment(paramter).then(res => {
            if(res.success === true) {
                this.listData = res.data.content
            }
        }).catch(err => {
            console.log('加载用户评论异常',err.message)
        })
    },
    //加载用户文章的评论
    handleLoadCommentByUserArticle() {
        console.log('加载用户文章评论')
        let paramter = {
            "pageSize": this.pagination.pageSize, 
            "pageNo": this.defaultCurrent,
            "articleUserId": this.$route.query.userId,
        }
        this.listData = []
        this.handleLoadComment(paramter)
    },
    //加载用户发表的评论
    handleLoadCommentByUser() {
        console.log('加载用户发表评论')
        let paramter = {
            "pageSize": this.pagination.pageSize, 
            "pageNo": this.defaultCurrent,
            "userId": this.$route.query.userId,
        }
        this.listData = []
        this.handleLoadComment(paramter)
    },
    //判断是否登录函数
    handleIsLogin() {
         //判断用户是否登录
        isLogin().then(res => {
            if (res.success === false) {
                this.$router.push({path: '/login'})
                return
            }else {
                
            }
        }).catch(ex => {
            console.log('isLogin error',ex.message)
        })
    },
 },
 created() {
     console.log("获取到用户id:" + this.$route.query.userId)
     this.handleIsLogin()
     this.handleLoadCommentByUserArticle() //加载用户文章评论
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
        cursor: pointer;
    }
    .time_span {
        color: #999;
        margin-right: 5px;
    }
</style>