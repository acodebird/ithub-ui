<!--用户消息页面-->
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
              <a-col :span="18" class="msg_title" v-if="msg.state == 0"><a-icon type="sound" style="color: red;" />&nbsp;{{msg.title}}</a-col>
              <a-col :span="18" class="msg_title" v-else><a-icon type="sound"/>&nbsp;{{msg.title}}</a-col>
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
                  {{msg.content}}
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
 name: 'Notices',
 data () {
    return {
        zh_CN,
        messages: [
          {
            id: 1,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
          },
          {
            id: 2,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
          },
          {
            id: 3,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
          },
          {
            id: 4,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
          },
          {
            id: 5,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
          },
          {
            id: 6,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
          },
          {
            id: 7,
            title: '您关注的博主“天元浪子”开通了专栏！《0基础学Python》',
            time: '2019-12-06',
            state: 0,
            content: '亲爱的CSDN用户，你有多久没有认真学习了？时代抛弃你，从不和你打招呼。改变，从学习开始。每周二/四晚8点，教学+实战，大咖讲师带你走进技术的殿堂 。本期剧透：腾讯云迪B哥，论数据库在AI时代的进化。保持终身学习的能力，才是一个人的核心竞争力！来这里，和志同道合的小伙伴共同打卡学习。免费报名链接： https://edu.csdn.net/huiyiCourse/detail/1094',
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
    font-weight: 700;
  }
  .msg_time {
    color: #ccc;
  }
  .msg_operation {
    text-align: right;
  }
  .msg_content {
    background-color: #f5f6f7;
    margin: 10px;
    padding: 10px;
    border-bottom: 1px solid gray;
  }
  .pagination {
    float: right;
  }
</style>