<!--资源列表-->
<template>
 <a-locale-provider :locale="zh_CN">
 <a-card :bordered="false">
   <!-- 多条件查询开始 -->

  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col key="1" :span="8" >
          <a-form-item label="资源名称">
            <a-input allowClear v-decorator="['title']" />
          </a-form-item>
        </a-col>
        <a-col key="2" :span="8" >
          <a-form-item label="资源描述">
            <a-input allowClear v-decorator="['description']" />
          </a-form-item>
        </a-col>
        <a-col key="3" :span="8" >
          <a-form-item label="上传用户">
            <a-input allowClear v-decorator="['email']" />
          </a-form-item>
        </a-col>
        <a-col key="4" :span="8" >
          <a-form-item label="资源类型">
            <a-select v-decorator="['type']" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="CODE">代码类</a-select-option>
              <a-select-option value="TOOL">工具类</a-select-option>
              <a-select-option value="FILE">文件类</a-select-option>
              <a-select-option value="OTHER">其他</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col key="5" :span="8" >
          <a-form-item label="资源状态">
            <a-select v-decorator="['status']" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="FAIL">不通过</a-select-option>
              <a-select-option value="PASS">通过</a-select-option>
              <a-select-option value="CHECK">待审核</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col key="6" :span="8" >
          <a-form-item label="上传时间">
            <a-date-picker format="YYYY-MM-DD HH:mm:ss" v-decorator="['uploadTime']" style="width: 200px" />
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
      <a-button type="danger" :loading="loading" :disabled="hasPerm('document:batchDelete')">
        批量删除
      </a-button>
     </a-popconfirm>
     <!-- <a-divider type="vertical" />
     <a-button type="primary" :disabled="hasPerm('document:add')">
        添加评论
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
        <span slot="documentTitle" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="email" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
        </span> 
        <!-- 类型和状态 -->
        <span slot="type" slot-scope="text">
          {{ text | typeFilter }}
        </span>
        <span slot="status" slot-scope="text">
          {{ text | statusFilter}}
        </span>
        <!-- 4.格式化日期 -->
        <span slot="uploadTime" slot-scope="text">
          {{ text }}
        </span>
        <span slot="action" slot-scope="text, record" v-show="!hasPerm('document:delete')">
          <template>
            <a @click="handleDownload(record.url)" title="下载资源"><a-icon type="download"/></a>
            <a-divider type="vertical" />
            <a @click="handleCheck(record,true)" v-show="record.status == 'CHECK' ? true : record.status == 'FAIL'" title="审核通过"><a-icon type="check"/></a>
            <a-divider type="vertical" v-show="record.status == 'CHECK' ? true : record.status == 'FAIL'"/>
            <a @click="handleCheck(record,false)" v-show="record.status == 'CHECK' ? true : record.status == 'PASS'" title="审核不通过"><a-icon type="close"/></a>
            <a-divider type="vertical" v-show="record.status == 'CHECK' ? true : record.status == 'PASS'" />
            <a-popconfirm title="确认删除文件?" okText="是" cancelText="否" @confirm="handleDelete(record.id)" >
              <a style="color: red;" title="删除文件"><a-icon type="delete" /></a>
            </a-popconfirm>
          </template>
        </span>
    </s-table>
    <!-- 使用编辑子组件 ref绑定子组件的名字 -->
    <!-- <user-add ref="addModal" @ok="handleOk" /> 
    <user-edit ref="editModal" @ok="handleOk" /> -->
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
import { updateDocument,getDocumentList,deleteDocumentBatch,deleteDocument } from '@/api/document'

const documentTypeMap = {
  CODE: {
    text: '代码类'
  },
  TOOL: {
    text: '工具类'
  },
  FILE: {
    text: '文档类'
  },
  OTHER: {
    text: '其他'
  }
}

const documentStatusMap = {
  FAIL: {
    text: '不通过'
  },
  PASS: {
    text: '通过'
  },
  CHECK: {
    text: '待审核'
  },
}

export default {
 name: 'DocumentList',
 filters: {
   typeFilter (type) {
     return documentTypeMap[type].text
   },
   statusFilter (type) {
     return documentStatusMap[type].text
   }
  },
  components: {
   STable,
   Ellipsis,
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
          title: '名字',
          dataIndex: 'title',
          align: 'center',
          scopedSlots: { customRender: 'documentTitle' }
        },
        {
          title: '描述',
          dataIndex: 'description',
          align: 'center',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '积分',
          dataIndex: 'integral',
          align: 'center',
        },
        {
          title: '用户',
          dataIndex: 'user.email',
          align: 'center',
          scopedSlots: { customRender: 'email' }
        },
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '上传时间',
          dataIndex: 'uploadTime',
          align: 'center',
          scopedSlots: { customRender: 'uploadTime' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: '200px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        //console.log('loadData.parameter', parameter)
        this.form.validateFields((error, values) => {
          this.queryParam = values
          if (this.queryParam.uploadTime !== undefined && this.queryParam.uploadTime != null) {
            this.queryParam.uploadTime = moment(values.uploadTime).format('YYYY-MM-DD HH:mm:ss')
          }
          // console.log(`查询条件${this.queryParam.type}`)
        })
        return getDocumentList({ ...parameter, ...this.queryParam }).then(res => {
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
    //根据id删除评论
    handleDelete(id) {
      console.log(`删除文件：${id}`)
      deleteDocument(id).then(res => {
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
    //批量删除评论
    handleDeleteAll() {
      if(this.selectedRowKeys=="") {
        this.$message.warning('请选择要删除的数据')
      }else{
        this.loading = true
        console.log(this.selectedRowKeys)
        deleteDocumentBatch(this.selectedRowKeys).then(res => {
          console.log(`批量删除文件${this.selectedRowKeys}`)
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
    loadPermission() {
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
    handleDownload(url) {
      console.log(`下载资源${url}`)
      window.open(url, "_blank")
    },
    handleCheck(record,result) {
      console.log("审核id:"+record.id)
      console.log("是否审核通过:" + result)
      if(result) {
        record.status = 'PASS'
      }else{
        record.status = 'FAIL'
      }
      updateDocument({"id":record.id,"status": record.status}).then(res => {
        if (res.success === true) {
          this.$notification.success({message: '更新成功'})
          this.$refs.table.refresh()
          return
        }
        this.$notification.error({message: `更新失败: ${errorTipsMap[res.data]}`})
        this.$refs.table.refresh()
      })
      .catch(ex => {
        this.$notification.error({message: '请求出现错误，请稍后再试'})
        console.log('请求出现错误，请稍后再试',ex.message)
        this.$refs.table.refresh()
      })
    }

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