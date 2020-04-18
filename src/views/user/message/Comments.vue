<!--评论消息页面-->
<template>
<a-locale-provider :locale="zh_CN">
  <a-row type="flex" justify="start">
    <a-col style="min-height: 600px;" :span="20" v-if="total > 0">
      <div class="msg_box">
          <a-row type="flex" align="middle" class="msg_box_top">
            <a-col :span="18" class="unread">未读消息：{{unread}}</a-col>
            <a-col :span="3" v-show="unread > 0"><a @click="handleMarkAll" >标记所有消息已读</a></a-col>
            <a-col :span="3" v-show="total > 0"><a-divider type="vertical" v-show="unread > 0" /><a @click="handleDeleteAll" >清空所有消息</a></a-col>
          </a-row>
          <a-row class="msg" v-for="comment in comments" :key="comment.id">
            <a-row>
              <a-col :span="15" class="msg_title" v-if="comment.status == 'UNREAD'"><a-icon type="sound" style="color: red;" />&nbsp;<b>{{comment.title}}</b>点赞了你的文章点赞了你的文章点赞了你的文章点赞了你的文章点赞了你的文章点赞了你的文章</a-col>
              <a-col :span="15" class="msg_title" v-else><a-icon type="sound"/>&nbsp;<b>{{comment.title}}</b>点赞了你的文章点赞了你的文章点赞了你的文章点赞了你的文章点赞了你的文章</a-col>
              <a-col :span="6" class="msg_time">{{comment.createTime}}</a-col>
              <a-col :span="3" class="msg_operation">
                <a-button @click="handleDeleteOne(comment.id)" size="small" type="danger" title="删除消息"> 
                  <a-icon type="delete" />
                </a-button>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <div class="msg_content" @click="handleClickMsg(comment)">
                    <a @click="handleShowBlog(comment.articleId)">{{comment.msg}}</a>
                </div>
              </a-col>
            </a-row>
          </a-row>
      </div>
      <br>
      <template>
        <a-pagination class="pagination" showQuickJumper :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
      </template>
    </a-col>
    <a-col style="min-height: 600px;" :span="20" v-else>
      <template>
        <div class="msg_box">
          <a-empty />
        </div>
      </template>
    </a-col>
  </a-row>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { getNoticesByType, getUnread, changeStatus, changeAllStatus, deleteByNormal, deleteBatchByNormal } from '@/api/notices'

export default {
 name: 'Comments',
 data () {
    return {
        zh_CN,
        comments: [],
        unread: 0,
        defaultCurrent: 1,
        total: 0,
   };
 },

 components: {
 },

 computed: {},

 methods: {
   handleMarkAll() {
     console.log(`标记所有消息已读！`);
      changeAllStatus("COMMENT").then( res => {
        if(res.success === true) {
          this.unread = 0
          // this.loadNotices()
          // this.handleUnread()
          this.$router.go(0)
        }
      }).catch(ex => {
      console.log('标记所有消息已读异常',ex.message)
    })
   },
   handleDeleteAll() {
     console.log(`清除所有消息`);
     deleteBatchByNormal("COMMENT").then( res => {
        if(res.success === true) {
          // this.loadNotices()
          // this.handleUnread()
          this.$router.go(0)
        }
      }).catch(ex => {
      console.log('清除所有消息异常',ex.message)
    })
   },
   handleClickMsg(comment) {
     if(comment.status == "UNREAD") {
       console.log(`点击消息后，消息变已读${comment.id}`)
       changeStatus(comment.id).then( res => {
         if(res.success = true) {
            // this.loadNotices()
            // this.handleUnread()
            this.$router.go(0)
         }
       }).catch(ex => {
        console.log('改变消息状态异常',ex.message)
      })
       
     }
     
   },
   handleDeleteOne(id) {
     console.log(`清除单条消息${id}`);
     deleteByNormal(id).then( res => {
        if(res.success === true) {
          // this.loadNotices()
          // this.handleUnread()
          this.$router.go(0)
        }
      }).catch(ex => {
      console.log('清除单挑消息异常',ex.message)
    })
   },
   handleShowBlog(id) {
       console.log(`查看博客详情${id}`);
   },
   onChange(pageNumber) {
     console.log(`翻页: ${pageNumber}`);
     this.defaultCurrent = pageNumber
     this.loadNotices()
   },
   //分页获取所有点赞消息
   loadNotices() {
     getNoticesByType({"type": "COMMENT", "pageSize": 10, "pageNo": this.defaultCurrent }).then( res => {
       if (res.success === true) {
         this.total = res.data.totalElements
         this.comments = res.data.content
      }
     }).catch(ex => {
      console.log('获取点赞消息异常',ex.message)
    })
   },
   //加载未读消息数量
   handleUnread() {
     getUnread().then(res => {
      if (res.success === true) {
        this.unread = res.data.comment
      }
    }).catch(ex => {
      console.log('获取未读消息数量出错',ex.message)
    })
   },
 },
 created (){
   console.log("加载点赞消息")
   this.loadNotices()
   this.handleUnread()
  },
}

</script>

<style scoped>
  a{
    color: black;
  }
  .msg_box {
    width: 100%;
    background-color: white;
    padding: 10px;
    min-height: 600px;
  }
  .msg_box_top {
    height: 40px;
  }
  .unread {
    color: red;
  }
  .msg {
    padding: 15px;
  }
  .msg_title {
    color: #4d4d4d;
  }
  .msg_time {
    color: #ccc;
    padding-left: 10px;
  }
  .msg_operation {
    text-align: right;
  }
  .msg_content {
    margin: 10px;
    padding: 10px;
    font-weight: 700;
    border-bottom: 1px solid gray;
  }
  .pagination {
    float: right;
  }
</style>