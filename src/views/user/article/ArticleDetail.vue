<!--文章详情页面-->
<template>
<a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户文章页面body -->
   <a-row type="flex" justify="start" :gutter="16" class="article_body">
     <!-- 左边公共组件 -->
     <left-tag></left-tag>
     <!-- 右边文章详情 -->
     <a-col :span="14">
      <div class="article_detail">
        <a-row type="flex">
            <a-col :span="24">
              <h2 class="article_titile">ssm整合时报错java.lang.ClassNotFoundException:org.springframework.web.bind.MissingMatrixVariableException</h2>
            </a-col>
        </a-row>
        <a-row type="flex">
          <p class="info_box">
            <a-col :span="24">
              <span class="time">发布时间：2019-09-01 15:20:50</span> 
              <span>作者：<router-link style="color: blue;" to="/article">ACodeBird</router-link></span>
              <span>专栏：<a href="#">ssm</a></span>
							<span>阅读（200）</span>
            </a-col>
          </p>
        </a-row>
        <a-row type="flex">
          <div class="content">
            <div id="content_views" class="markdown_views prism-atom-one-light">
            <h1><a name="t0"></a><a name="t0"></a><a id="1aopadvisoradvice_0"></a>1.aop:advisor配置的通知类必须实现advice接口</h1>
            <p>常用的有下面几个接口：</p>
            <h3><a name="t1"></a><a name="t1"></a><a id="1MethodBeforeAdvice___2"></a>1.MethodBeforeAdvice  前置通知</h3>
            <h3><a name="t2"></a><a name="t2"></a><a id="2AfterReturningAdvice___3"></a>2.AfterReturningAdvice  成功通知</h3>
            <h3><a name="t3"></a><a name="t3"></a><a id="3ThrowsAdvice__4"></a>3.ThrowsAdvice 异常通知</h3>
            <h3><a name="t4"></a><a name="t4"></a><a id="4AfterAdvice_23_5"></a>4.AfterAdvice 是一个空接口，被2和3继承</h3>
            <h5><a id="advice_6"></a>advice是一个空接口，定义方法还是跟平时一样</h5>
            <h1><a name="t5"></a><a name="t5"></a>2.aop:aspect配置的通知类不用实现advice接口，普通类即可</h1>
            </div>
          </div>
        </a-row>
        <a-row type="flex">
          <p class="info_box">
            <a-col :span="24">
              <div>
                <span>标签：</span>
                <span v-for="(tag, index) in tags"  :key="index">
                  <a-icon type="tag" theme="filled"/>{{tag.content}}
                </span>
              </div>
            </a-col>
          </p>
        </a-row>
      </div>
       <!-- 评论区 -->
      <div class="comment_box">
                <div class="comment_title">
                  <a href=""><strong>评论区</strong></a>
                </div>
                <div>
                  <a-comment>
                    <div slot="content" class="comment_content">
                      <a-form-item>
                        <a-textarea ref="content" :rows="4" @change="handleChange" :value="value" :placeholder="placeholder"></a-textarea>
                      </a-form-item>
                      <a-form-item>
                        <a-button style="float: right;margin: 10px;" htmlType="submit" :loading="submitting" @click="handleSubmit" type="primary">
                          发表评论
                        </a-button>
                        <a-button v-show="showCancel" style="float: right;margin: 10px;" htmlType="reset" @click="handleCancel" type="danger">
                          取消回复
                        </a-button>
                        <span style="float:right;margin: 10px;">还能输入{{length}}字</span>
                      </a-form-item>
                    </div>
                  </a-comment>
                  <a-list
                    v-if="comments.length"
                    :dataSource="comments"
                    itemLayout="horizontal"
                  >
                    <a-list-item slot="renderItem" slot-scope="item">
                      <a-comment
                        :author="item.author"
                        :avatar="item.avatar"
                        :content="item.content"
                        :datetime="item.datetime"
                      >
                        <span slot="actions">
                          <button @click="handleReply(item.author)">回复Ta</button>
                        </span>
                        
                        <div class="reply_content">
                          <a-list
                            v-if="item.replies.length"
                            :dataSource="item.replies"
                            itemLayout="horizontal"
                          >
                            <a-list-item slot="renderItem" slot-scope="item">
                              <a-comment
                                :author="item.author"
                                :avatar="item.avatar"
                                :content="item.content"
                                :datetime="item.datetime"
                              >
                                <span slot="actions">
                                  <button @click="handleReply(item.author)">回复Ta</button>
                                </span>
                              </a-comment>
                            </a-list-item>
                          </a-list>
                        </div>
                      </a-comment>
                    </a-list-item>
                  </a-list>
                    <template>
                      <a-pagination class="pagination" showQuickJumper :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
                    </template>
                </div>
      </div>
     </a-col>
     <!-- 右边功能栏 -->
     <a-col>
       <a-row type="flex" justify="start">
         <a-col>
           <template>
            <a-anchor class="fixedRightBar">
              <a-row type="flex" align="middle" justify="center">
                <a-col>
                  <a-row type="flex" align="middle" justify="center" class="func">
                    <a-col>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          <a href="javascript:void(0);" @click="handleLike()" title="点赞/取消点赞">
                            <a-icon type="heart" style="fontSize: 16px;" />
                          </a>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          {{likes}}
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-row type="flex" align="middle" justify="center" class="func">
                    <a-col>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          <a href="javascript:void(0);" title="收藏" @click="handleCollect()">
                            <a-icon type="star" style="fontSize: 16px;" />
                          </a>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          {{collects}}
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-row type="flex" align="middle" justify="center" class="func">
                    <a-col>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          <a href="javascript:void(0);" title="去评论" @click="handleToReply">
                            <a-icon type="message" style="fontSize: 16px;" />
                          </a>
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-row type="flex" align="middle" justify="center" class="func">
                    <a-col>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          <a href="javascript:void(0);" title="上一篇" @click="handleLast()">
                            <a-icon type="left" style="fontSize: 16px;" />
                          </a>
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-row type="flex" align="middle" justify="center" class="func">
                    <a-col>
                      <a-row type="flex" align="middle" justify="center">
                        <a-col>
                          <a href="javascript:void(0);" title="下一篇" @click="handleNext()">
                            <a-icon type="right" style="fontSize: 16px;" />
                          </a>
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-anchor>
          </template>
         </a-col>
       </a-row>
     </a-col>
     
   <!-- 回到顶部 -->
   <a-back-top />
   <!-- 脚部公共组件 -->
   <footer-tag></footer-tag>
   </a-row>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import HeaderTag from '../../Header';
import FooterTag from '../../Footer';
import LeftTag from './ArticleLeft';

export default {
 name: 'ArticleDetail',
 data () {
    return {
      zh_CN,
      tags: [
        {
          id: 1,
          content: "java"
        },
        {
          id: 2,
          content: "ssm"
        },
        {
          id: 3,
          content: "spring"
        },
      ],
      likes: 0,
      collects: 1,
      value: '',
      length: 100,
      comments: [
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'ssasas',
          datetime: moment().fromNow(),
          replies: [
            {
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: 'ssasas',
              datetime: moment().fromNow(),
            },
            {
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: 'ssasa安第斯山杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀s',
              datetime: moment().fromNow(),
            },
          ]
        },
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'ssasas',
          datetime: moment().fromNow(),
          replies: [
            {
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: 'ssasas',
              datetime: moment().fromNow(),
            },
            {
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: 'ssasa安第斯山杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀安第斯山杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀s安第斯山杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀杀ss',
              datetime: moment().fromNow(),
            },
          ]
        },
      ],
      submitting: false,
      showCancel: false,
      placeholder: "说点什么吧",
      defaultCurrent: 1,
      total: 100,
   };
 },

 components: {
   HeaderTag,
   FooterTag,
   LeftTag,
 },

 methods: {
   handleLike() {
     console.log(`点赞函数${this.likes++}`);
   },
   handleCollect() {
     console.log(`收藏函数${this.collects++}`);
   },
   handleLast(){
     console.log(`上一篇函数${this.collects++}`);
   },
   handleNext(){
     console.log(`下一篇函数${this.collects++}`);
   },
   handleToReply() {
     console.log(`去评论函数`);
     this.$refs.content.focus();
   },
   handleChange(e) {
     /* 评论输入框的变化函数 */

     /* 将用户输入内容赋值给本地变量 */
     if(e.target.value.length > 100 ) {
       this.value = e.target.value.substring(0,100);
     } else {
       this.value = e.target.value;
     }
     /* 计算评论可输入字数 */
     this.length = 100 - this.value.length;
     /* 显示取消回复按钮 */
     if(this.value) {
       this.showCancel = true;
     } else {
       this.showCancel = false;
     }
   },
   handleSubmit() {
     /* 提交评论函数 */
     if(!this.value) {
       return;
     }
     this.submitting = true;
     setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: 'Han Solo33',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow(),
            replies: [],
          },
          ...this.comments,
        ];
        this.value = '';
        this.length = 100;
        this.showCancel = false;
        this.placeholder = "说点什么吧！";
      }, 1000);
   },
   handleCancel() {
     /* 取消评论 */
     this.value = '';
     this.showCancel = false;
     this.length = 100;
     this.placeholder = "说点什么吧！";
   },
   handleReply(author) {
     console.log(`回复评论`);
     this.$refs.content.focus();
     this.placeholder = `回复：${author}`;
     this.showCancel = true;
   },
   onChange(pageNumber) {
     console.log(`翻页: ${pageNumber}`);
   },
 }
}

</script>

<style scoped>
  a:hover {
    color: red;
  }
  /* 用户文章页面body样式 */
  .article_body{
    background-color: #f5f6f7;
    border-top: 2px solid white;
    padding-top: 50px;
  }
  .article_detail {
    background-color: white;
    padding: 15px;
  }
  .article_titile {
    font-size: 28px;
    word-wrap: break-word;
    text-align: left;
    color: #000;
    font: bold;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .info_box {
    width: 100%;
    border: #ccc 1px dashed;
    text-align: left;
    padding: 5px 0;
    margin-right: 0px;
    color: #999;
  }
  .info_box span {
    margin: 0 10px;
  }
  .content {
    overflow: hidden;
    margin: 20px 30px 20px 0;
    font-size: 18px;
    color: #4f4f4f;
    word-wrap: break-word;
  }
  /* 最右边动态功能栏 */
  .fixedRightBar {
    background-color: white;
    width: 44px;
  }
  .func {
    height: 50px;
  }
  /* 评论区样式 */
  .comment_box {
    background-color: white; 
    margin-top: 15px;
    margin-bottom: 50px;
    padding: 10px;
  }
  .comment_title a {
    display: inline-block;
    border-bottom: 3px solid #9E9E9E;
    margin: 0 5px;
    pointer-events: none;
  }
  .comment_title strong{
    color: #fff;
    background-color: #555555;
    margin: -1px 0 5px 0;
    display: inline-block;
    padding: 4px 15px;
    font-size: 14px;
  }
  .comment_content {
    border-bottom: 1px solid #ddd;
  }
  .reply_content {
    width:816px;
  }
  .pagination {
    text-align: right;
  }
</style>