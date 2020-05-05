<!--文章列表-->
<template>
 <a-locale-provider :locale="zh_CN">
 <a-card :bordered="false">
   <!-- 多条件查询开始 -->

  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col key="1" :span="8" >
          <a-form-item label="文章题目">
            <a-input allowClear v-decorator="['title']" />
          </a-form-item>
        </a-col>
        <a-col key="2" :span="8" >
          <a-form-item label="文章用户">
            <a-input allowClear v-decorator="['email']" />
          </a-form-item>
        </a-col>
        <a-col key="3" :span="8" >
          <a-form-item label="文章摘要">
            <a-input allowClear v-decorator="['summary']" />
          </a-form-item>
        </a-col>
        <a-col key="4" :span="8" >
          <a-form-item label="文章标签">
            <a-input allowClear v-decorator="['label']" />
          </a-form-item>
        </a-col>
        <a-col key="5" :span="8" >
          <a-form-item label="文章状态">
            <a-select v-decorator="['status']" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="NORMAL">正常</a-select-option>
              <a-select-option value="DRAFT">草稿</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col key="6" :span="8" >
          <a-form-item label="发表时间">
            <a-date-picker format="YYYY-MM-DD HH:mm:ss" v-decorator="['createTime']" style="width: 200px" />
          </a-form-item>
        </a-col>

        <a-col key="7" :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit" :style="{ marginLeft: '8px' }">
            查询
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>

   <!-- 多条件查询结束 -->

   <div style="margin-bottom: 16px">
     <a-popconfirm title="确认删除所选数据?" okText="是" cancelText="否" @confirm="handleDeleteAll" >
      <a-button type="danger" :loading="loading" :disabled="hasPerm('article:batchDelete')">
        批量删除
      </a-button>
     </a-popconfirm>
     <!-- <a-divider type="vertical" />
     <a-button type="primary" :disabled="hasPerm('article:add')">
        添加文章
    </a-button> -->
   </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys, 
        onChange: onSelectChange, 
      }"
      showPagination="auto"
    >
        <!--较长内容使用ellipsis插件省略显示-->
        <span slot="articleTile" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="email" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="summary" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </span> 
        <!-- 文章标签 -->
        <span slot="label" slot-scope="text">
          {{ text }}
        </span>
        <!--文章状态：枚举适配显示-->
        <span slot="status" slot-scope="text">
          {{ text | statusFilter}}
        </span>
        <!-- 4.格式化日期 -->
        <span slot="createTime" slot-scope="text">
          {{ text }}
        </span>
        <span slot="action" slot-scope="text, record" v-show="!hasPerm('article:delete')">
          <template>
            <a @click="handleShow(record)" title="查看文章详情"><a-icon type="eye"/></a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除文章?" okText="是" cancelText="否" @confirm="handleDelete(record.id)" >
              <a style="color: red;" title="删除文章"><a-icon type="delete" /></a>
            </a-popconfirm>
          </template>
        </span>
    </s-table>
    <!-- 使用编辑子组件 ref绑定子组件的名字 -->
    <!-- <user-add ref="addModal" @ok="handleOk" /> 
    <user-edit ref="editModal" @ok="handleOk" /> -->
    <show-detail ref="showModal" />
  </a-card>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import STable from '@/components/Table'
import Ellipsis from '@/components/Ellipsis'
import moment from 'moment' //日期处理moment.js工具模块
import { parsePage } from '@/utils/pageable'
import { isLogin } from '@/api/login'
import { loadPermissionByUserId } from '@/api/resource'
import { getArticleList,deleteArticleBatch,deleteArticle } from '@/api/article'
import ShowDetail from './form/ShowArticleDetail'

const articleStatusMap = {
  NORMAL: {
    type: 'success',
    text: '正常',
  },
  DRAFT: {
    type: 'warning',
    text: '草稿',
  },
}

export default {
 name: 'ArticleList',
 filters: {
   statusFilter (status) {
      return articleStatusMap[status].text
    },
  },
  components: {
   STable,
   Ellipsis,
   ShowDetail,
 },
 data () {
    return {
      zh_CN,
      user:{},
      visible: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: [
        {
          title: '主键',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '文章名',
          dataIndex: 'title',
          align: 'center',
          scopedSlots: { customRender: 'articleTile' }
        },
        {
          title: '文章用户',
          dataIndex: 'user.email',
          align: 'center',
          scopedSlots: { customRender: 'email' }
        },
        {
          title: '摘要',
          dataIndex: 'summary',
          align: 'center',
          scopedSlots: { customRender: 'summary' }
        },
        {
          title: '标签',
          dataIndex: 'label',
          align: 'center',
          scopedSlots: { customRender: 'label' }
        },
        {
          title: '点击量',
          dataIndex: 'click',
          align: 'center'
        },
        {
          title: '回复量',
          dataIndex: 'reply',
          align: 'center'
        },
        {
          title: '点赞量',
          dataIndex: 'approval',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '发表时间',
          dataIndex: 'createTime',
          align: 'center',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        //console.log('loadData.parameter', parameter)
        this.form.validateFields((error, values) => {
          this.queryParam = values
          if (this.queryParam.createTime !== undefined && this.queryParam.createTime != null) {
            this.queryParam.createTime = moment(values.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
          // console.log(`查询条件${this.queryParam.type}`)
        })
        return getArticleList({ ...parameter, ...this.queryParam }).then(res => {
            if (res.success === true) {
              //加载用户权限用于屏蔽按钮
              this.loadPermission()
              return { ...parsePage(res) }
            } else if(res.data === '403') {
              //没有权限访问，跳转带提示页面
              //this.$router.push('/403')
              this.$notification.error({message: `权限不足`})
              return parsePage()
            } else if(res.data === '用户未登录') {
              this.$router.push('/admin/login')
            } else {
              return parsePage()
            }
        }).catch(ex => {
          return parsePage()
        });
      },
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      permissions: [],
   };
 },

 computed: {
 },

 methods: {
   //多选操作监听函数
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    //表单回调函数
    handleOk() {
      this.$refs.table.refresh()
    },
    //根据id删除用户
    handleDelete(id) {
      console.log(`删除用户：${id}`)
      deleteArticle(id).then(res => {
        if (res.success === true) {
          this.$notification.success({message: '删除成功'})
          this.$refs.table.refresh(true)
          return
        }
        this.$notification.error({message: `删除失败: ${errorTipsMap[res.data]}`})
      }).catch(ex => {
        this.$notification.error({message: '请求出现错误，请稍后再试'})
        console.log('请求出现错误，请稍后再试',ex.message)
      })
    },
    //批量删除文章
    handleDeleteAll() {
      if(this.selectedRowKeys=="") {
        this.$message.warning('请选择要删除的数据')
      }else{
        this.loading = true
        console.log(this.selectedRowKeys)
        deleteArticleBatch(this.selectedRowKeys).then(res => {
          console.log(`批量删除文章${this.selectedRowKeys}`)
          if(res.success === true) {
            this.$notification.success({
              message: "批量删除成功！"
            })
            this.loading = false
          }
          this.selectedRowKeys = []
          this.$refs.table.refresh(true)
        }).catch(err => {
          this.loading = false
          this.$message.error(`批量删除失败: ${err.message}`)
        })
      }
    },
    handleShow(record) {
      //查看文章详情
      console.log(record.html)
      this.$refs.showModal.show(record)
    },
    loadPermission() {
      this.handleIsLogin()
      loadPermissionByUserId({"id": this.user.id}).then(res => {
        if(res.success === true) {
          this.permissions = res.data
        }
      }).catch(err => {
        this.$message.error(`加载用户权限出错啦`)
      })
    },
    //判断是否有权限，没有权限返回false,用于隐藏按钮
    hasPerm(perm) {
      for(var i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i] === perm) {
          return false;
        }
      }
      return true;
    },
    handleSearch(e) {
      console.log("多条件查询")
      e.preventDefault();
      this.$refs.table.refresh(true)
    },
    handleReset() {
      console.log("重置查询内容")
      this.form.resetFields();
      this.$refs.table.refresh(true)
    },
    handleIsLogin() {
       //判断用户是否登录
        isLogin().then(res => {
          if (res.success === true) {
            this.user = res.data
          }
          //this.$router.push('/admin/login')
        }).catch(ex => {
          console.log('isLogin error',ex.message)
        })
    },

 },

 created (){
    //判断用户是否登录
    isLogin().then(res => {
      if (res.success === true) {
        this.user = res.data
        return
      }
      //this.$router.push('/admin/login')
    }).catch(ex => {
      console.log('isLogin error',ex.message)
    })
  }
}

</script>

<style scoped>
.ant-advanced-search-form {
  padding: 10px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search {
  margin-bottom: 15px;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

</style>