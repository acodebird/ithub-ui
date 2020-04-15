<!--用户资源管理页面-->
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
                <a-menu-item key="1">已审核</a-menu-item>
                <a-menu-item key="2">审核中</a-menu-item>
                <a-menu-item key="3">审核不通过</a-menu-item>
            </a-menu>
         </a-col>
     </a-row>
     <a-row type="flex">
        <a-col :span="24">
        <template>
            <div class="resourceList" v-for="(resource, index) in resources" :key="index">
            <a-row class="resource">
                <a-col>
                <h4 class="title">
                    {{resource.title}}
                </h4>
                <div class="info">
                    <div style="float: left">
                    <span>
                        上传作者：{{resource.author}}
                    </span>
                    <span>上传时间：{{resource.time}}</span>
                    <span>所需积分：{{resource.integral}}</span>
                    </div>
                </div>
                <div style="float: right">
                    <a-button type="primary" @click="handleEdit(resource)" v-if="isPass==1">编辑</a-button>
                    <a-button type="danger" @click="handleCancle(resource)" v-if="isPass==2">取消</a-button>
                </div>
                <br><br>
                <div class="description" :title="resource.description">
                    {{resource.description}}
                </div>
                </a-col>
            </a-row>
            </div>
        </template>
        <template>
            <a-pagination class="pagination" showQuickJumper :defaultCurrent="defaultCurrent" :total="total" @change="onChange" />
        </template>
        </a-col>
    </a-row>
    <!-- 编辑资源表单组件 -->
    <edit-tag ref="editModal" @ok="handleOk"></edit-tag>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import EditTag from '../form/EditResource'

const resources = [];
for(let i = 0; i<20; i++) {
  resources.push({
      id: i,
      status: 1,
      title: `json复杂数据解析demo${i}`,
      description: "一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。一个解析较为复杂json数据的完整demo！其中添加了解析过程的思维导图。",
      integral: 5+i,
      time: '2020-03-01',
      author: 'C_K',
  });
}

export default {
 name: 'ResourceManage',
 data () {
    return {
      zh_CN,
      resources,
      isPass: 1,
      defaultCurrent: 1,
      total: 100,
   };
 },

 components: {
    EditTag,
 },

 computed: {},

 methods: {
     //选择查看已审核/审核中/审核不通过
    handleSelect( {key} ) {
        console.log(`1代表已审核；2代表审核中；3代表审核不通过:${key}`);
        if(key == 1) {
            this.isPass = 1;
        }else if(key == 2) {
            this.isPass = 2;
        }else {
            this.isPass = 0;
        }
    },
    //编辑专栏操作后返回上一级路由
    handleOk() {
        this.$router.go(0)
    },
    //编辑资源
    handleEdit(record) {
        console.log(`编辑资源${record.id}`);
        this.$refs.editModal.edit(record.id);
    },
    //取消资源上传
    handleCancle(record) {
        console.log(`取消资源${record.id}`);
    },
    onChange(pageNumber) {
      console.log(`翻页: ${pageNumber}`);
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
    .resourceList {
    width: 100%;
    background-color: white;
  }
  .resource {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
  .title {
    color: #333;
    font-size: 20px;
  }
  .info span{
    margin: 5px;
  }
  .description {
    color: #8a8a8a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pagination {
    float: right;
    margin-bottom: 30px;
  }
</style>