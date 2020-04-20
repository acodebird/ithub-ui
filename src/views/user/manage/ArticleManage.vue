<!--用户文章管理页面-->
<template>
<a-locale-provider :locale="zh_CN">
 <div class="right_body">
     <a-row>
         <a-col>
            <a-menu 
            mode="horizontal" 
            @select="handleSelect"
            :defaultSelectedKeys="['1']"
            >
                <a-menu-item key="1">已发布（{{publish}}）</a-menu-item>
                <a-menu-item key="2">草稿箱（{{draft}}）</a-menu-item>
            </a-menu>
         </a-col>
     </a-row>
     <a-row v-show="showSearch" type="flex" align="middle" justify="center" style="height: 80px;">
        <template>
            <a-form :form="form" layout="inline" @submit="handleSearch">
                <a-col :span="5">
                    <a-form-item>
                        <a-date-picker v-decorator="['startTime']" placeholder="开始时间"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item>
                        <a-date-picker v-decorator="['endTime']" placeholder="结束时间"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <a-select style="width: 150px;"
                        v-decorator="[
                            'section',
                        ]"
                        placeholder="文章专栏"
                        >
                            <a-select-option value="">全部</a-select-option>
                            <a-select-option v-for="s in sections" :key="s.id">
                                {{s.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item>
                        <a-input style="width: 150px;" placeholder="关键字" v-decorator="['keyword']"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="2">
                    <a-form-item>
                        <a-button type="primary" html-type="submit">查询</a-button>
                    </a-form-item>
                </a-col>
                <a-col :span="2">
                    <a-form-item>
                        <a-button @click="handleReset">重置</a-button>
                    </a-form-item>
                </a-col>
            </a-form>
        </template>
     </a-row>
     <a-row style="background-color: white;">
         <a-col>
             <template>
                <a-list itemLayout="horizontal" size="large" :pagination="pagination" :dataSource="listData" :bordered="true">
                    <a-list-item slot="renderItem" slot-scope="item" key="item.id">
                        <a slot="actions" @click="handleEdit(item.id)">编辑</a>
                        <a slot="actions">
                            <a-popconfirm title="确认删除文章?" okText="是" cancelText="否" @confirm="handleDelete(item.id)" >
                            删除
                            </a-popconfirm>
                        </a>
                        <a-list-item-meta :description="item.summary">
                            <a slot="title" @click="handleShow(item.id)" title="查看文章" style="font-size: 20px;"><b>{{item.title}}</b></a>
                        </a-list-item-meta>
                        <div>{{item.createTime}}</div>
                    </a-list-item>
                </a-list>
            </template>
         </a-col>
     </a-row>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import { loadCount, loadByUser } from '@/api/article'
import { loadAll } from '@/api/column'
import { deleteByNormal } from '@/api/article'
import { isLogin } from '@/api/login'

// const listData = [];
// for (let i = 0; i < 23; i++) {
//     listData.push({
//         id: i+1,
//         title: `springboot项目部署到服务器后无法发送邮件的问题 ${i}`,
//         summary:
//         ' To help people create their product prototypes beautifully and efficiently.',
//         content: '# Hello World!',
//     });
// }

export default {
 name: 'ArticleManage',
 data () {
    return {
      zh_CN,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      sections: [], //用户专利
      publish: 0,
      draft: 0,
      showSearch: true,
      status: 'NORMAL',
      queryParam: {},
      listData: [],
      defaultCurrent: 1,
      pagination: {
        onChange: page => {
            this.defaultCurrent = page
            console.log(`翻页：${this.defaultCurrent}`);
        },
        pageSize: 10,
      },
   };
 },

 components: {},

 computed: {},

 methods: {
     //选择查看已发布文章/草稿
    handleSelect( {key} ) {
        console.log(`1代表已发布；2代表草稿:${key}`);
        if(key == 2) {
            this.showSearch = false;
            this.status = 'DRAFT'
            this.listData = []
            this.handleLoadByUser()
        }else {
            this.showSearch = true;
            this.status = 'NORMAL'
            this.listData = []
            this.handleLoadByUser()
        }
    },
    //条件查询
    handleSearch(e) {
        e.preventDefault();
        console.log(`多条件查询`)
        this.handleLoadByUser()
    },
    //重置条件查询表单
    handleReset() {
        console.log(`重置多条件查询表单`)
        this.form.resetFields()
        this.handleLoadByUser()
    },
    //编辑文章
    handleEdit(id) {
        //this.$router.push({name:'Writing',params:{blog : e}});   
        let routeData = this.$router.resolve({
            path: '/article/write',
            query: {"id" : id},
            //params: {blog : e},
        });
        window.open(routeData.href, '_blank');
    },
    //删除文章
    handleDelete(id) {
        console.log(`删除文章${id}`)
        deleteByNormal(id).then( res => {
            if(res.success === true) {
                this.$message.success(`删除成功`)
                this.handleLoadCount()
                this.handleLoadByUser()
            }else {
                this.$message.error(`删除失败`)
            }
        }).catch( err => {
            console.log("删除文章异常" + err.message)
        })
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
    //获取用户已发布文章和草稿的数量
    handleLoadCount() {
        loadCount().then( res => {
            if(res.success === true) {
                this.publish = res.data.publish
                this.draft = res.data.draft
            }else {
                console.log("用户未登录")
                this.$router.push({path:'/login'})
            }
        }).catch( err => {
            console.log("加载用户已发布文章和草稿数量异常" + err.message)
        })
    },
    //加载用户所有专栏
    loadAllColumn() {
      loadAll().then( res => {
          if (res.success === true) {
            this.sections = res.data
          }else {
            console.log("用户未登录")
            this.$router.push({path:'/login'})
          }
      }).catch(err => {
          console.log('加载用户专栏出错',err.message)
      })
    },
    //判断是否登录函数
    handleIsLogin() {
         //判断用户是否登录
        isLogin().then(res => {
            if (res.success === false) {
                this.$router.push({path: '/login'})
                return
            }
        }).catch(ex => {
            console.log('isLogin error',ex.message)
        })
    },
    //加载用户文章
    handleLoadByUser() {
        this.form.validateFields((error, values) => {
            this.queryParam = values
            if (this.queryParam.startTime !== undefined && this.queryParam.startTime != null) {
                this.queryParam.startTime = moment(values.startTime).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.queryParam.endTime !== undefined && this.queryParam.endTime != null) {
                this.queryParam.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')
            }
            console.log(`startTime:${this.queryParam.startTime};endTime:${this.queryParam.endTime};section:${this.queryParam.section};keyword:${this.queryParam.keyword}`)
            // console.log(`查询条件${this.queryParam.type}`)
        })
        let parameter=  {
            "pageSize": this.pagination.pageSize, 
            "pageNo": this.defaultCurrent,
            "userId": this.$route.query.userId,
            "param": this.queryParam.keyword,
            "columnId": this.queryParam.section,
            "startTime": this.queryParam.startTime,
            "endTime": this.queryParam.endTime,
            "status": this.status,
        }
        loadByUser(parameter).then( res => {
            if(res.success === true) {
                this.listData = res.data.content
                //this.total = res.data.totalElements
            }
        }).catch(err => {
            console.log('加载用户所有文章异常',err.message)
        })
    },
 },
 created() {
    console.log("获取到用户id:" + this.$route.query.userId)
    this.handleIsLogin()
    this.handleLoadCount()
    this.loadAllColumn()
    this.handleLoadByUser()
 }
}

</script>

<style scoped>
    .right_body {
        width: 90%;
        min-height: 550px;
    }
</style>