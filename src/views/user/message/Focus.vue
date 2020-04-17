<!--用户关注消息页面-->
<!--评论消息页面-->
<template>
<a-locale-provider :locale="zh_CN">
  <a-row type="flex" justify="start">
    <a-col :span="20" style="min-height: 600px;" v-if="total > 0">
      <div class="msg_box">
          <a-row type="flex" align="middle" class="msg_box_top">
            <a-col :span="18" class="unread">未读消息：{{unread}}</a-col>
            <a-col :span="3" v-show="unread > 0"><a @click="handleMarkAll" >标记所有消息已读</a></a-col>
            <a-col :span="3" v-show="total > 0"><a-divider type="vertical" v-show="unread > 0" /><a @click="handleDeleteAll" >清空所有消息</a></a-col>
          </a-row>
          <a-row class="msg" v-for="focus in focuses" :key="focus.id">
              <div @click="handleClickMsg(focus)">
                  <a-row>
                      <a-col :span="15" class="msg_title" v-if="focus.status == 'UNREAD'"><a-icon type="sound" style="color: red;" />&nbsp;粉丝&nbsp;<b>{{focus.title}}</b>&nbsp;关注了你</a-col>
                      <a-col :span="15" class="msg_title" v-else><a-icon type="sound"/>&nbsp;粉丝&nbsp;<b>{{focus.title}}</b>&nbsp;关注了你</a-col>
                      <a-col :span="6" class="msg_time">{{focus.createTime}}</a-col>
                      <a-col :span="3" class="msg_operation">
                      <a-button @click="handleDeleteOne(focus.id)" size="small" type="danger" title="删除消息"> 
                          <a-icon type="delete" />
                      </a-button>
                      </a-col>
                  </a-row>
              </div>
          </a-row>
      </div>
      <br>
      <template>
        <a-pagination class="pagination" showQuickJumper :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
      </template>
    </a-col>
    <a-col style="min-height: 600px;" :span="20" v-else>
      <template>
        <a-empty />
      </template>
    </a-col>
  </a-row>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { getNoticesByType, getUnread, changeStatus, changeAllStatus, deleteByNormal, deleteBatchByNormal } from '@/api/notices'

export default {
 name: 'Focus',
 data () {
    return {
        zh_CN,
        focuses: [],
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
      changeAllStatus("FOCUS").then( res => {
        if(res.success === true) {
          this.unread = 0
          this.$router.go(0)
        }
      }).catch(ex => {
      console.log('标记所有消息已读异常',ex.message)
    })
   },
   handleDeleteAll() {
     console.log(`清除所有消息`);
     deleteBatchByNormal("FOCUS").then( res => {
        if(res.success === true) {
          this.$router.go(0)
        }
      }).catch(ex => {
      console.log('清除所有消息异常',ex.message)
    })
   },
   handleClickMsg(focus) {
     if(focus.status == "UNREAD") {
       console.log(`点击消息后，消息变已读${focus.id}`)
       changeStatus(focus.id).then( res => {
         if(res.success = true) {
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
          this.$router.go(0)
        }
      }).catch(ex => {
      console.log('清除单挑消息异常',ex.message)
    })
   },
   onChange(pageNumber) {
     console.log(`翻页: ${pageNumber}`);
     this.defaultCurrent = pageNumber
     this.loadNotices()
   },
   //分页获取所有点赞消息
   loadNotices() {
     getNoticesByType({"type": "FOCUS", "pageSize": 10, "pageNo": this.defaultCurrent }).then( res => {
       if (res.success === true) {
         this.total = res.data.totalElements
         this.focuses = res.data.content
      }
     }).catch(ex => {
      console.log('获取点赞消息异常',ex.message)
    })
   },
   //加载未读消息数量
   handleUnread() {
     getUnread().then(res => {
      if (res.success === true) {
        this.unread = res.data.focus
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
  .pagination {
    float: right;
  }
</style>