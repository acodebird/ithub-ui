<!--用户文章专栏管理页面-->
<template>
<a-locale-provider :locale="zh_CN">
 <div class="right_body">
     <a-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data-source="data"
      showPagination="auto"
    >
        <!--1.专栏名称添加样式-->
      <span slot="name" slot-scope="text">
        <span style="font-weight: 600;">{{text}}</span>
      </span>
      <!--2.操作以及事件绑定-->
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleManage(record)">管理</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除该专栏？删除专栏的同时将把专栏文章删除" @confirm="handleDelete(record)">
            <a style="color: red">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>
    <!-- 编辑专栏表单组件 -->
    <edit-tag ref="editModal" @ok="handleOk"></edit-tag>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import EditTag from '../form/EditCategory'
import { loadAllByUser,deleteColumn } from '@/api/column'
import { isLogin } from '@/api/login'

// const data = [];
// for(let i = 0; i < 16; i++) {
//     data.push({
//       id: i+1,
//       cname: 'Spring',
//       articleCount: 7,
//     });
// }

export default {
 name: 'CategoryManage',
 data () {
    return {
      zh_CN,
      columns: [
        {
          title: '专栏名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          align: 'center'
        },
        {
          title: '文章数量',
          dataIndex: 'count',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        },
      ],
      data: [],
   };
 },

 components: {
    EditTag,
 },

 computed: {},

 methods: {
     //编辑专栏操作后返回上一级路由
    handleOk() {
        this.handleLoadColumnByUser()
    },
    handleEdit(record) {
        console.log(`编辑专栏${record.id}`);
        this.$refs.editModal.edit(record.id);
    },
    handleManage(record) {
        console.log(`管理专栏：${record.id}`);
        this.$router.push({path: `/manage/category/${record.id}`,query: {"userId": this.$route.query.userId}});
        //this.$router.push(`/manage/category/${record.id},query: {"userId": this.$route.query.userId}`)
    },
    handleDelete(record) {
        console.log(`删除专栏：${record.id}`)
        deleteColumn(record.id).then( res => {
            if(res.success === true) {
                this.$message.success(`删除专栏成功`)
                this.handleLoadColumnByUser()
            }else {
                this.$message.error(`删除专栏失败`)
            }
        }).catch( err => {
            console.log("删除专栏异常" + err.message)
        })
    },
    //加载用户所有专栏
    handleLoadColumnByUser() {
      loadAllByUser(this.$route.query.userId).then( res => {
          if (res.success === true) {
            this.data = res.data
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
            }else {
                
            }
        }).catch(ex => {
            console.log('isLogin error',ex.message)
        })
    },
 },
 created() {
   this.handleIsLogin()
   this.handleLoadColumnByUser() //加载用户专栏
 }
}

</script>

<style scoped>
    .right_body {
        width: 90%;
        background-color: white;
        min-height: 550px;
    }
</style>