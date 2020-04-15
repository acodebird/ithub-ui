<!--用户列表-->
<template>
 <a-locale-provider :locale="zh_CN">
 <a-card :bordered="false">
   <!-- 多条件查询开始 -->

  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col key="1" :span="8" >
          <a-form-item label="用户姓名">
            <a-input allowClear v-decorator="['username']" />
          </a-form-item>
        </a-col>
        <a-col key="2" :span="8" >
          <a-form-item label="用户邮箱">
            <a-input allowClear v-decorator="['email']" />
          </a-form-item>
        </a-col>
        <a-col key="3" :span="8" >
          <a-form-item label="用户角色">
            <a-select v-decorator="['roleId']" 
            placeholder="请选择" style="width:200px">
              <a-select-option v-for="role in roleList" :key="role.id" :value="role.id">
                  {{role.description}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col key="4" :span="8" >
          <a-form-item label="用户状态">
            <a-select v-decorator="['status']" 
            placeholder="请选择" style="width:200px">
              <a-select-option value="NORMAL">正常</a-select-option>
              <a-select-option value="DISABLE">禁用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col key="5" :span="8" :style="{ textAlign: 'left' }">
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
      <a-button type="danger" :loading="loading" :disabled="hasPerm('user:batchDelete')">
        批量删除
      </a-button>
     </a-popconfirm>
     <a-divider type="vertical" />
     <a-button type="primary" @click="handleAdd" :disabled="hasPerm('user:add')">
        添加用户
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
        getCheckboxProps: getCheckboxProps
      }"
      showPagination="auto"
    >
        <!--较长内容使用ellipsis插件省略显示-->
        <span slot="name" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <!--用户状态：枚举适配显示-->
        <span slot="status" slot-scope="text,record">
          <a-switch :disabled="hasPerm('user:edit') ? hasPerm('user:edit') : record.id === user.id" checkedChildren="启用" unCheckedChildren="禁用" :checked="text | userStatusFilter" @change="changeStatus(record)"/>
        </span>
        <span slot="action" slot-scope="text, record" v-show="!hasPerm('user:edit')">
          <template>
            <a @click="handleEdit(record)" title="编辑用户"><a-icon type="edit"/></a>
            <a-divider type="vertical" v-show="record.id !== user.id" />
            <a-popconfirm title="确认删除用户?" v-show="record.id !== user.id" okText="是" cancelText="否" @confirm="handleDelete(record.id)" >
              <a style="color: red;" title="删除用户"><a-icon type="delete" /></a>
            </a-popconfirm>
          </template>
        </span>
    </s-table>
    <!-- 使用编辑子组件 ref绑定子组件的名字 -->
    <user-add ref="addModal" @ok="handleOk" /> 
    <user-edit ref="editModal" @ok="handleOk" />
  </a-card>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import STable from '@/components/Table'
import Ellipsis from '@/components/Ellipsis'
import { parsePage } from '@/utils/pageable'
import { isLogin } from '@/api/login'
import { getRoleList } from '@/api/role'
import { loadPermissionByUserId } from '@/api/resource'
import { getUserList,deleteUserBatch,deleteUser,updateUser } from '@/api/user'
import UserAdd from './form/UserAdd'
import UserEdit from './form/UserEdit'

const userStatusMap = {
  NORMAL: {
    checked: true,
  },
  DISABLE: {
    checked: false,
  },
}

export default {
 name: 'UserManage',
 filters: {
    userStatusFilter (type) {
      return userStatusMap[type].checked
    },
  },
 data () {
    return {
      zh_CN,
      user:{},
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: [
        {
          title: '主键',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '名字',
          dataIndex: 'username',
          align: 'center',
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          align: 'center'
        },
        {
          title: '类型',
          dataIndex: 'role.description',
          align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' }
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
        this.handleRoleList() //加载用户角色
        //console.log('loadData.parameter', parameter)
        this.form.validateFields((error, values) => {
          this.queryParam = values
          console.log(`查询条件${this.queryParam.type}`)
        })
        return getUserList({ ...parameter, ...this.queryParam }).then(res => {
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
      roleList: [],
   };
 },

 components: {
   STable,
   Ellipsis,
   UserAdd,
   UserEdit,
 },

 computed: {
 },

 methods: {
   /**
     * 选择框的默认属性配置,禁用当前用户的多选框
     */
    getCheckboxProps(record) {
      return ({
        props: {
              disabled: record.id === this.user.id
          }
      })
    },

   //多选操作监听函数
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    //表单回调函数
    handleOk() {
      this.$refs.table.refresh()
    },
    handleRoleList() {
      //加载角色列表
      getRoleList().then(res => {
          if (res.success === true) {
              console.log(res.data.content)
              this.roleList = res.data.content
          } else if(res.data == '403') {
              //没有权限访问，跳转带提示页面
              this.$notification.warning({message: '没有权限加载角色列表'})
          } else {
              this.$notification.error({message: '请求角色列表出现错误，请稍后再试'})
          }
      }).catch(ex => {
          this.$notification.error({message: '请求角色列表出现错误，请稍后再试'})
      });
    },
    //改变用户状态
    changeStatus (record) {
      console.log(`修改用户状态，旧状态：${record.status}`);
      record.status = record.status != 'NORMAL' ? 'NORMAL' : 'DISABLE';
      updateUser({"id":record.id,"status": record.status}).then(res => {
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
    },
    //根据id删除用户
    handleDelete(id) {
      console.log(`删除用户：${id}`)
      deleteUser(id).then(res => {
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
    //编辑用户
    handleEdit(record) {
      console.log(`编辑用户：${record.id}`)
      this.$refs.editModal.edit(record)
    },
    //批量删除用户
    handleDeleteAll() {
      if(this.selectedRowKeys=="") {
        this.$message.warning('请选择要删除的数据')
      }else{
        this.loading = true
        console.log(this.selectedRowKeys)
        deleteUserBatch(this.selectedRowKeys).then(res => {
          console.log(`批量删除用户${this.selectedRowKeys}`)
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
      console.log(`添加用户`)
      //打开添加用户表单
      this.$refs.addModal.add()
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
    }

 },

 created (){
    //判断用户是否登录
    isLogin().then(res => {
      if (res.success === true) {
        this.user=res.data
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