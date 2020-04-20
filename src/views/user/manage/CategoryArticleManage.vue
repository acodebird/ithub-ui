<!--专栏文章管理页面-->
<template>
 <a-locale-provider :locale="zh_CN">
 <div class="right_body">
    <div style="padding: 16px">
      <a-icon type="rollback" @click="handleBack" title="返回专栏管理" style="cursor: pointer;padding-left: 20px;padding-right: 20px;" />
      <!-- <a-button type="primary" title="返回专栏管理">
          <a-icon type="rollback" />专栏管理
      </a-button> -->
      <a-popconfirm title="确认删除所选数据?" okText="是" cancelText="否" @confirm="handleDeleteAll" >
        <a-button type="danger" :loading="loading">
          批量删除
        </a-button>
      </a-popconfirm>
    </div>
     <a-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :showHeader=true
      :pagination="pagination"
      @change="handleTableChange"
      showPagination="auto"
    >
      <!--较长内容使用ellipsis插件省略显示-->
        <span slot="articleTitle" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </span>
      <!--操作以及事件绑定-->
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleShow(record.id)">查看</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除该专栏？" @confirm="handleDelete(record)">
            <a style="color: red">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Ellipsis from '@/components/Ellipsis'
import { isLogin } from '@/api/login'
import { loadByUser, deleteByNormal, deleteArticleBatchByNormal } from '@/api/article'

// const data = [];
// for(let i = 0; i < 2; i++) {
//     data.push({
//       id: i+1,
//       title: `springboot项目部署到服务器后无法发送邮件的问题 ${i}`,
//     });
// }

export default {
 name: 'CategoryArticleManage',
 data () {
    return {
      zh_CN,
      columns: [
        {
          title: '文章title',
          dataIndex: 'title',
          scopedSlots: { customRender: 'articleTitle' },
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        },
      ],
      defaultCurrent: 1,
      pagination: {
          pageSize: 1,
      },
      data: [],
      selectedRowKeys: [],
      loading: false,
   };
 },

 components: {
   Ellipsis,
 },

 computed: {},

 methods: {
   //返回专栏管理
   handleBack() {
     this.$router.push({path: '/manage/category',query: {"userId": this.$route.query.userId}})
   },
   //多选框列改变函数
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    //批量删除函数
    handleDeleteAll() {
      if(this.selectedRowKeys=="") {
        this.$message.warning('请选择要删除的数据')
      }else{
        this.loading = true;
        console.log(`批量删除数据：${this.selectedRowKeys}`)
        deleteArticleBatchByNormal(this.selectedRowKeys).then(res => {
          console.log(`批量删除文章${this.selectedRowKeys}`)
          if(res.success === true) {
            this.$message.success("批量删除成功！")
            this.loading = false
          }
          this.selectedRowKeys = []
          this.handleLoadAllArticle()
        }).catch(err => {
          this.loading = false
          this.$message.error(`批量删除失败: ${err.message}`)
        })
        
      }
    },
    //翻页函数
    handleTableChange(pagination,) {
      console.log(pagination.current);
      this.defaultCurrent = pagination.current
      this.handleLoadAllArticle()
    },
    //查看文章详情
    handleShow(id) {
      console.log(`查看文章详情${id}`);
      let routeData = this.$router.resolve({
          path: `/article/detail`,
          query: {"id": id},
          //params:{catId:params.catId}
      });
      window.open(routeData.href, '_blank');
    },
    //删除单个文章函数
    handleDelete(record) {
      console.log(`删除文章${record.id}`)
      deleteByNormal(record.id).then(res => {
        if (res.success === true) {
          this.$message.success("删除成功！")
          this.handleLoadAllArticle()
          return
        }
      }).catch(ex => {
        this.$message.error(`删除失败: ${ex.message}`)
        console.log('请求出现错误，请稍后再试',ex.message)
      })
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
    //加载专栏文章
    handleLoadAllArticle() {
      let parameter=  {
        "pageSize": this.pagination.pageSize, 
        "pageNo": this.defaultCurrent,
        "userId": this.$route.query.userId,
        "columnId": this.$route.params.categoryId
      }
      loadByUser(parameter).then( res => {
        if(res.success === true) {
          this.data = res.data.content
          const pagination = { ...this.pagination }
          pagination.total = res.data.totalElements
          this.pagination = pagination
        }
      }).catch(err => {
         console.log('加载专栏文章异常',err.message)
      })
    },
 },
 created() {
   console.log("获取专栏id:" + this.$route.params.categoryId)
   this.handleIsLogin()
   this.handleLoadAllArticle() //加载专栏文章
 },
}

</script>

<style scoped>
    .right_body {
        width: 90%;
        background-color: white;
        min-height: 550px;
    }
</style>