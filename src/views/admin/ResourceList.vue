<!--消息列表-->
<template>
 <a-locale-provider :locale="zh_CN">
 <a-card :bordered="false">
   <!-- 多条件查询开始 -->

  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col key="1" :span="8" >
          <a-form-item label="权限">
            <a-input allowClear v-decorator="['permission']" />
          </a-form-item>
        </a-col>
        <a-col key="2" :span="8" >
          <a-form-item label="权限描述">
            <a-input allowClear v-decorator="['description']" />
          </a-form-item>
        </a-col>
        <a-col key="3" :span="8" :style="{ textAlign: 'left' }">
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
     <a-popconfirm title="确认删除所选权限?" okText="是" cancelText="否" @confirm="handleDeleteAll" >
      <a-button type="danger" :loading="loading" :disabled="hasPerm('resource:batchDelete')">
        批量删除
      </a-button>
     </a-popconfirm>
     <a-divider type="vertical" />
     <a-button type="primary" @click="handleAdd" :disabled="hasPerm('resource:add')">
        添加权限
    </a-button>
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
        <span slot="action" slot-scope="text, record" v-show="!hasPerm('resource:delete')">
          <template>
            <a @click="handleEdit(record)" title="编辑权限"><a-icon type="edit"/></a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除权限?" okText="是" cancelText="否" @confirm="handleDelete(record.id)" >
              <a style="color: red;" title="删除权限"><a-icon type="delete" /></a>
            </a-popconfirm>
          </template>
        </span>
    </s-table>
    <!-- 使用编辑子组件 ref绑定子组件的名字 -->
    <!-- <user-add ref="addModal" @ok="handleOk" /> 
     -->
     <resource-add ref="addModal" @ok="handleOk" />
     <resource-edit ref="editModal" @ok="handleOk" />
  </a-card>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import STable from '@/components/Table'
import Ellipsis from '@/components/Ellipsis'
import { parsePage } from '@/utils/pageable'
import { isLogin } from '@/api/login'
import { loadPermissionByUserId,getResourceList,deleteResourceBatch,deleteResource } from '@/api/resource'
import ResourceAdd from './form/ResourceAdd'
import ResourceEdit from './form/ResourceEdit'


export default {
 name: 'ResourceList',
 components: {
   STable,
   Ellipsis,
   ResourceAdd,
   ResourceEdit
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
          title: '权限',
          dataIndex: 'permission',
          align: 'center',
          scopedSlots: { customRender: 'permission' }
        },
        {
          title: '权限描述',
          dataIndex: 'description',
          align: 'center',
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
          // console.log(`查询条件${this.queryParam.type}`)
        })
        return getResourceList({ ...parameter, ...this.queryParam }).then(res => {
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
      console.log(`删除权限：${id}`)
      deleteResource(id).then(res => {
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
        deleteResourceBatch(this.selectedRowKeys).then(res => {
          console.log(`批量删除权限${this.selectedRowKeys}`)
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
    handleAdd() {
      console.log(`添加权限`)
      this.$refs.addModal.add()
    },
    //编辑权限
    handleEdit(record) {
      console.log(`编辑权限：${record.id}`)
      this.$refs.editModal.edit(record)
    },
    //表单回调函数
    handleOk() {
      this.$refs.table.refresh()
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