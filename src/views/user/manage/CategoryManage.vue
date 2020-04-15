<!--用户文章专栏管理页面-->
<template>
<a-locale-provider :locale="zh_CN">
 <div class="right_body">
     <a-table
      ref="table"
      size="default"
      rowKey="cid"
      :columns="columns"
      :data-source="data"
      showPagination="auto"
    >
        <!--1.专栏名称添加样式-->
      <span slot="cname" slot-scope="text">
        <span style="font-weight: 500;">{{text}}</span>
      </span>
      <!--2.操作以及事件绑定-->
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleManage(record)">管理</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除该专栏？" @confirm="handleDelete(record)">
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
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import EditTag from '../form/EditCategory'

const data = [];
for(let i = 0; i < 16; i++) {
    data.push({
      cid: i+1,
      cname: 'Spring',
      articleCount: 7,
    });
}

export default {
 name: 'CategoryManage',
 data () {
    return {
      zh_CN,
      columns: [
        {
          title: '专栏名称',
          dataIndex: 'cname',
          scopedSlots: { customRender: 'cname' },
          align: 'center'
        },
        {
          title: '文章数量',
          dataIndex: 'articleCount',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        },
      ],
      data,
   };
 },

 components: {
    EditTag,
 },

 computed: {},

 methods: {
     //编辑专栏操作后返回上一级路由
    handleOk() {
        this.$router.go(0)
    },
    handleEdit(record) {
        console.log(`编辑专栏${record.cid}`);
        this.$refs.editModal.edit(record.cid);
    },
    handleManage(record) {
        console.log(`管理专栏${record.cid}`);
        this.$router.push(`/manage/category/${record.cid}`)
    },
    handleDelete(record) {
        console.log(`删除专栏${record.cid}`)
    },
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