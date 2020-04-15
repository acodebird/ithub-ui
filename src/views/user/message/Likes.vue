<!--用户博文被点赞消息页面-->
<template>
<a-locale-provider :locale="zh_CN">
  <a-row type="flex" justify="start">
    <a-col :span="20">
      <div class="msg_box">
          <a-row type="flex" align="middle" class="msg_box_top">
            <a-col :span="18" class="unread">未读消息：{{unread}}</a-col>
            <a-col :span="3"><a @click="handleMarkAll">标记所有消息已读</a></a-col>
            <a-col :span="3"><a-divider type="vertical" /><a @click="handleDeleteAll">清空所有消息</a></a-col>
          </a-row>
          <a-row class="msg" v-for="msg in messages" :key="msg.id">
            <a-row>
              <a-col :span="18" class="msg_title" v-if="msg.state == 0"><a-icon type="sound" style="color: red;" />&nbsp;<b>{{msg.operator}}</b>点赞了你的文章</a-col>
              <a-col :span="18" class="msg_title" v-else><a-icon type="sound"/>&nbsp;<b>{{msg.operator}}</b>点赞了你的文章</a-col>
              <a-col :span="3" class="msg_time">{{msg.time}}</a-col>
              <a-col :span="3" class="msg_operation">
                <a-button @click="handleDeleteOne(msg.id)" size="small" type="danger" title="删除消息"> 
                  <a-icon type="delete" />
                </a-button>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <div class="msg_content" @click="handleClickMsg(msg.id)">
                    <a @click="handleShowBlog(msg.blogId)">{{msg.content}}</a>
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
  </a-row>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
 name: 'Comments',
 data () {
    return {
        zh_CN,
        messages: [
            {
                id: 1,
                operator: 'Janson',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 2,
            },
            {
                id: 2,
                operator: '*q*q',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 21,
            },
            {
                id: 3,
                operator: 'qwer',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 23,
            },
            {
                id: 4,
                operator: '导航123456789',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 25,
            },
            {
                id: 5,
                operator: '测试',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 12,
            },
            {
                id: 6,
                operator: '在座的各位都是垃圾',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 32,
            },
            {
                id: 7,
                operator: '老K',
                time: '2020-03-27',
                state: 0,
                content: 'Mysql 1067系统错误终极解决方案全集',
                blogId: 332,
            },
        ],
        unread: 7,
        defaultCurrent: 1,
        total: 100,
   };
 },

 components: {
 },

 computed: {},

 methods: {
   handleMarkAll() {
     console.log(`标记所有消息已读！`);
     this.messages.map((msg) => {
       if(msg.state !== 1) msg.state = 1;
     });
     this.unread = 0;
   },
   handleDeleteAll() {
     console.log(`清除所有消息`);
   },
   handleClickMsg(id) {
     console.log(`点击消息后，消息变已读${id}`);
     this.messages.map((msg) => {
       if(msg.id === id) msg.state = 1;
     });
     this.unread--;
   },
   handleDeleteOne(id) {
     console.log(`清除单条消息${id}`);
   },
   handleShowBlog(id) {
       console.log(`查看博客详情${id}`);
   },
   onChange(pageNumber) {
     console.log(`翻页: ${pageNumber}`);
   },
 }
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