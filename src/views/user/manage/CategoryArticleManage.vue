<!--专栏文章管理页面-->
<template>
 <a-locale-provider :locale="zh_CN">
 <div class="right_body">
    <div style="padding: 16px">
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
      showPagination="auto"
    >
      <!--1.操作以及事件绑定-->
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleShow(record)">查看</a>
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
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

const data = [];
for(let i = 0; i < 7; i++) {
    data.push({
      id: i+1,
      title: `springboot项目部署到服务器后无法发送邮件的问题 ${i}`,
    });
}

export default {
 name: 'CategoryArticleManage',
 data () {
    return {
      zh_CN,
      columns: [
        {
          title: '文章title',
          dataIndex: 'title',
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
      selectedRowKeys: [],
      loading: false,
   };
 },

 components: {},

 computed: {},

 methods: {
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
        
      }
    },
    //查看文章详情
    handleShow(record) {
      console.log(`查看文章详情${record.id}`);
      let routeData = this.$router.resolve({
        name: 'ArticleDetail',
        query: {id : record.id}
      });
      window.open(routeData.href, '_blank');
    },
    //删除单个文章函数
    handleDelete(record) {
      console.log(`删除文章${record.id}`);
    }
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