<!--个人信息-->
<template>
<a-locale-provider :locale="zh_CN">
 <div>
   <!-- 头部公共组件 -->
   <header-tag></header-tag>
   <!-- 用户信息页面body -->
   <a-row type="flex" justify="center" class="profile_body">
     <a-col :span="24" style="width: 800px;padding: 20px;background-color: white">
       <a-row type="flex" align="middle" style="border-bottom: solid 1px gray;height: 100px;font-size: 20px;color: #3d3d3d;font-weight: 700">
         个人信息
       </a-row>
       <a-row>
         <a-col :span="4" style="height: 100px;padding: 10px">
           <a-row type="flex" align="middle" justify="center"><a-avatar :src="this.user.avatar" :size="64" icon="user" /></a-row>
           <a-row type="flex" align="middle" justify="center">
             <a-upload
              action="/api/qiniu/uploadImg"
              accept="image/*"
              :data="handleData"
              @change="handleChange"
              :showUploadList="false"
              >
               <a-button> <a-icon type="upload" /> 修改头像</a-button>
             </a-upload>
           </a-row>
          </a-col>
         <a-col :span="20">
           <a-row>
             <a-col :span="12">
               <a-row type="flex" align="middle" style="height: 50px;">
                 <a-col>用户昵称: {{this.user.username}}</a-col>
               </a-row>
               <a-row type="flex" align="middle" style="height: 50px;">
                 <a-col>用户邮箱: {{this.user.email}}</a-col>
               </a-row>
               <a-row type="flex" align="middle" style="height: 50px;">
                 <a-col>用户积分: {{this.user.integral}}</a-col>
               </a-row>
             </a-col>
             <a-col :span="12">
               <a-row type="flex" align="middle" style="height: 50px;">
                 <a-col :span="12"><a @click="handleChangeUsername">修改昵称</a></a-col>
                 <a-col :span="12"><a @click="handleChangePwd">修改密码</a></a-col>
               </a-row>
             </a-col>
           </a-row>
         </a-col>
       </a-row>
     </a-col>
   <!-- 回到顶部 -->
   <a-back-top />
   <!-- 脚部公共组件 -->
   </a-row>
   <footer-tag></footer-tag>
   <change-username ref="changeModal" @ok="handleOk" />
 </div>
</a-locale-provider>
</template>

<script>
import { isLogin } from '@/api/login'

import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import HeaderTag from '../../Header'
import FooterTag from '../../Footer'
import ChangeUsername from '../form/ChangeUsername'

export default {
 name: 'Profile',
 data () {
    return {
      zh_CN,
      user: {},
   };
 },

 components: {
   HeaderTag,
   FooterTag,
   ChangeUsername,
 },

 computed: {},

 methods: {
   //修改密码
   handleChangePwd() {
     this.$router.push({path: '/reset'});
   },
   //修改昵称
   handleChangeUsername() {
     console.log(`修改昵称`)
     this.$refs.changeModal.change(this.user)
   },
   //表单回调函数
    handleOk() {
      //this.$router.push({path: '/uc/profile'});
      this.handleReload() //重新加载数据
      this.$router.go(0)
    },
    // 文件上传相关函数
     handleData() {
        //console.log(`设置文件上传参数`)
        return {
            id: this.user.id,
        }
    },
    handleChange(info) {
      if (info.file.status === 'done') {
        this.handleReload() //重新加载数据
        this.$router.go(0)
        this.$message.success(`头像上传成功`);
      } else if (info.file.status === 'error') {
        this.$message.error(`头像上传失败`);
      }
    },
    handleReload() {
      isLogin().then(res => {
        if (res.success === true) {
          console.log("重新加载数据")
          this.user = res.data
        }
      }).catch(ex => {
        console.log('重新加载数据出错',ex.message)
      })
    }
 },

 created (){
    //判断用户是否登录
    isLogin().then(res => {
      if (res.success === true) {
        this.user = res.data
      }else {
        this.$router.push({path: '/'});
      }
    }).catch(ex => {
      console.log('isLogin error',ex.message)
    })
  }
}

</script>

<style scoped>
/* 用户信息页面body样式 */
  .profile_body{
    background-color: #f5f6f7;
    border-top: 2px solid white;
    height: 500px;
    padding: 20px;
    margin-bottom: 100px;
  }
</style>