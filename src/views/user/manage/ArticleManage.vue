<!--用户文章管理页面-->
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
                <a-menu-item key="1">已发布（{{publish}}）</a-menu-item>
                <a-menu-item key="2">草稿箱（{{draft}}）</a-menu-item>
            </a-menu>
         </a-col>
     </a-row>
     <a-row v-show="showSearch" type="flex" align="middle" justify="center" style="height: 80px;">
        <template>
            <a-form :form="form" layout="inline" @submit="handleSearch">
                <a-col :span="5">
                    <a-form-item>
                        <a-date-picker v-decorator="['startTime']" placeholder="开始时间"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item>
                        <a-date-picker v-decorator="['endTime']" placeholder="结束时间"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <a-select style="width: 150px;"
                        v-decorator="[
                            'type',
                        ]"
                        placeholder="文章专栏"
                        >
                            <a-select-option value="0">全部</a-select-option>
                            <a-select-option value="1">Java</a-select-option>
                            <a-select-option value="2">C/C++</a-select-option>
                            <a-select-option value="3">Python</a-select-option>
                            <a-select-option value="4">面试</a-select-option>
                            <a-select-option value="5">小记</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item>
                        <a-input style="width: 150px;" placeholder="关键字" v-decorator="['keyword']"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="2">
                    <a-form-item>
                        <a-button type="primary" html-type="submit">查询</a-button>
                    </a-form-item>
                </a-col>
                <a-col :span="2">
                    <a-form-item>
                        <a-button @click="handleReset">重置</a-button>
                    </a-form-item>
                </a-col>
            </a-form>
        </template>
     </a-row>
     <a-row style="background-color: white;">
         <a-col>
             <template>
                <a-list itemLayout="horizontal" size="large" :pagination="pagination" :dataSource="listData" :bordered="true">
                    <a-list-item slot="renderItem" slot-scope="item" key="item.id">
                        <a slot="actions" @click="handleEdit(item)">编辑</a>
                        <a slot="actions" @click="handleDelete(item.id)">删除</a>
                        <a-list-item-meta :description="item.summary">
                            <a slot="title" @click="handleShow(item)" title="查看" style="font-size: 20px;"><b>{{item.title}}</b></a>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </template>
         </a-col>
     </a-row>
 </div>
</a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        id: i+1,
        title: `springboot项目部署到服务器后无法发送邮件的问题 ${i}`,
        summary:
        ' To help people create their product prototypes beautifully and efficiently.',
        content: '# Hello World!',
    });
}

export default {
 name: 'ArticleManage',
 data () {
    return {
      zh_CN,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      publish: 78,
      draft: 2,
      showSearch: true,
      queryValues: {},
      listData,
      pagination: {
        onChange: page => {
            console.log(`翻页：${page}`);
        },
        pageSize: 13,
      },
   };
 },

 components: {},

 computed: {},

 methods: {
     //选择查看已发布文章/草稿
    handleSelect( {key} ) {
        console.log(`1代表已发布；2代表草稿:${key}`);
        if(key == 2) {
            this.showSearch = false;
        }else {
            this.showSearch = true;
        }
    },
    //条件查询
    handleSearch(e) {
        e.preventDefault();
        console.log(`多条件查询`)
    },
    //重置条件查询表单
    handleReset() {
        console.log(`重置多条件查询表单`)
        this.form.resetFields();
    },
    //编辑文章
    handleEdit(e) {
        console.log(`编辑文章${e.content}`);
        //this.$router.push({name:'Writing',params:{blog : e}});   
        let routeData = this.$router.resolve({
            name: 'Writing',
            query: {bid : e.id},
            //params: {blog : e},
        });
        window.open(routeData.href, '_blank');
    },
    //删除文章
    handleDelete(id) {
        console.log(`删除文章${id}`)
    },
    //查看文章
    handleShow(e) {
        console.log(`查看文章${e.id}`)
        let routeData = this.$router.resolve({
            name: 'ArticleDetail',
            query: {bid : e.id},
            //params: {blog : e},
        });
        window.open(routeData.href, '_blank');
    },
 }
}

</script>

<style scoped>
    .right_body {
        width: 90%;
        min-height: 550px;
    }
</style>