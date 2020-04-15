<!--分配权限表单-->
<template>
 <a-locale-provider :locale="zh_CN">
<a-modal
title="分配权限"
:width="640"
:visible="visible"
@ok="handleCancel"
@cancel="handleCancel"
>
 <a-card :bordered="false">
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record.id)" title="分配权限" v-show="!isUpdate(record.id)"><a-icon type="edit"/></a>
            <a-popconfirm title="确认移除权限?" okText="是" v-show="isUpdate(record.id)" cancelText="否" @confirm="handleRemove(record.id)" >
              <a style="color: red;" title="移除权限"><a-icon type="delete" /></a>
            </a-popconfirm>
          </template>
        </span>
    </s-table>
    <!-- 使用编辑子组件 ref绑定子组件的名字 -->
    <!-- <user-add ref="addModal" @ok="handleOk" /> 
     -->
  </a-card>
  </a-modal>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import STable from '@/components/Table'
import Ellipsis from '@/components/Ellipsis'
import { parsePage } from '@/utils/pageable'
import { updateRole,deleteRole,deleteRoleBatch } from '@/api/role'
import { getResourceList, loadPermission } from '@/api/resource'
import { removePermission, distributePermission } from '@/api/role'


export default {
 name: 'UpdateResource',
 filters: {
  },
  components: {
   STable,
   Ellipsis,
 },
 data () {
    return {
      zh_CN,
      visible: false,
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
        },
        {
          title: '角色描述',
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
        this.loadPermission() //加载角色权限
        return getResourceList({ ...parameter}).then(res => {
            if (res.success === true) {
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
      roleId: '',
      roleResourceList: [],
   };
 },

 computed: {
 },

 methods: {
    update(record) {
        this.roleId = record.id
        console.log("当前角色id：" + this.roleId)
        this.visible = true
        this.loadPermission() //加载角色权限
        this.$refs.table.refresh(true)
    },
    handleCancel() {
      //关闭权限分配表单
      this.visible = false
      this.$emit('ok')
    },
    //根据权限id和角色id移除权限
    handleRemove(id) {
      console.log(`移除权限：${id}`)
      let parameter = {
          "roleId": this.roleId,
          "resourceId": id
      }
      removePermission(parameter).then(res => {
        if (res.success === true) {
          this.$notification.success({message: '移除权限成功'})
          this.$refs.table.refresh(true)
          return
        }
        this.$notification.error({message: `移除失败: ${errorTipsMap[res.data]}`})
      }).catch(ex => {
        this.$notification.error({message: '请求出现错误，请稍后再试'})
        console.log('请求出现错误，请稍后再试',ex.message)
      })
    },
    handleEdit(id) {
      console.log(`分配权限：${id}`)
      let parameter = {
          "roleId": this.roleId,
          "resourceId": id
      }
      distributePermission(parameter).then(res => {
        if (res.success === true) {
          this.$notification.success({message: '分配权限成功'})
          this.$refs.table.refresh(true)
          return
        }
        this.$notification.error({message: `分配失败: ${errorTipsMap[res.data]}`})
      }).catch(ex => {
        this.$notification.error({message: '请求出现错误，请稍后再试'})
        console.log('请求出现错误，请稍后再试',ex.message)
      })
    },
    loadPermission() {
        let parameter = {
            "id": this.roleId
        }
        loadPermission(parameter).then(res => {
            if (res.success === true) {
                this.roleResourceList = res.data
            } else if(res.data === '403') {
              //没有权限访问，跳转带提示页面
              //this.$router.push('/403')
              this.$notification.error({message: `权限不足`})
            } else if(res.data === '用户未登录') {
              this.$router.push('/admin/login')
            } else {
              this.$notification.error({message: `加载角色权限请求异常，请稍后再试`})
            }
        }).catch(ex => {
            this.$message.error(`加载角色权限请求出错: ${err.message}`)
        });
    },
    isUpdate(id) {
        for(var i = 0; i < this.roleResourceList.length; i++) {
            if(id === this.roleResourceList[i].id) {
                return true;
            }
        }
        return false;
    },

 },

}

</script>

<style scoped>

</style>