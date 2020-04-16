<!--用户注册页面-->
<template>
 <div class="body-bg">
   <div class="logo">
     <img src="../../assets/ITHub.svg" height="100" alt="网站logo">
   </div>
   <div class="main">
     <h4 class="title">登录管理系统</h4>
     <div class="sign_in">
       <a-form
        ref="sign_in_form"
        id="sign_in_form"
        :form="form"
        @submit="handleLogin"
       >
        <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '用户ID或邮箱不能为空!' }],
            },
          ]"
          placeholder="用户邮箱"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
        </a-form-item>
        <a-form-item>
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '用户密码不能为空!' }],
            },
          ]"
          placeholder="用户密码"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="safety" style="color: rgba(0,0,0,.25)" />
        </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="sign_in_button">
            登录
          </a-button>
        </a-form-item>
       </a-form>
     </div>
   </div>
 </div>
</template>

<script>
import {login } from '@/api/login'

export default {
 name: 'Login',
 data () {
    return {
      form: this.$form.createForm(this),
      user:{
        email:'',
        password:''
      },
      
   };
 },

 components: {},

 computed: {},

 methods: {
    handleLogin(e) {
      e.preventDefault();
      console.log(`登陆管理系统`)
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.user.email=values.email;
          // this.user.password=values.password;
          // console.log(this.user.email)
          // console.log(this.user.password)
          login( {...values} ).then(res => {
            if(res.success === true) {
              this.$notification.success({message: res.data})
              this.$router.push({path:'/admin'})
            }else{
              this.$message.error(`${res.data}`)
            }
          }).catch(err => {
            this.$message.error(`登录失败：请求异常，请稍后再试`)
          })
        }
      });
    },
 }
}

</script>

<style scoped>
/* body样式，主要设置背景颜色 */
  .body-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    background-color: #f5f6f7;
    padding-top: 60px;
  }
  /* logo样式 */
  .logo{
    width: 200px;
    height: 200px;
    position: relative;
    left: 50px;
    top: -20px;
    float: left;
  }
  /* 注册表单样式 */
  .main{
    width: 400px;
    height: auto;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    margin: auto;
    padding: 50px 30px 50px 30px;
  }
  .title{
    width: 170px;
    height: 52px;
    margin: 0 auto 50px;
    padding: 10px;
    font-size: 22px;
    font-weight: 700;
    color: #1890ff;
    text-align: center;
    border-bottom: 2px solid #1890ff;
  }
  .sign_in{
    width: 300px;
    height: auto;
    margin: auto;
  }
  .sign_in_input{
    background-color: #f5f6f7;
  }
  .sign_in_button{
    width: 100%;
    height: 42px;
  }

</style>