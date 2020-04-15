<!--用户登录页面-->
<template>
 <div class="body-bg">
   <div class="logo">
     <router-link to="/"><img src="../../assets/ITHub.svg" height="100" alt="网站logo" title="点击回首页"></router-link>
   </div>
   <div class="main">
     <h4 class="title">登录</h4>
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
            'account',
            {
              rules: [{ required: true, message: '用户ID或邮箱不能为空!' }],
            },
          ]"
          placeholder="用户ID或邮箱"
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
        <a-form-item style="margin-bottom: 8px;">
          <a-checkbox>
            <span style="color: gray;">记住我</span>
          </a-checkbox>
          <router-link style="color: red;float: right;" to="/reset">找回密码</router-link>
        </a-form-item>
        <a-form-item style="text-align: center;margin-bottom: 8px;">
          没有账号？去
          <router-link style="color: blue;" to="/register">注册</router-link>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="sign_in_button">
            登录
          </a-button>
        </a-form-item>
       </a-form>
     </div>
     <div class="third_part_login">
       <a-divider style="color: gray;font-size: 12px;"><b>第三方账号登录</b></a-divider>
       <a @click="handleGithub"><a-icon type="github" style="fontSize: 22px" /></a>
       <a-divider type="vertical" />
       <a @click="handleQQ"><a-icon type="qq" style="fontSize: 22px" /></a>
     </div>
   </div>
 </div>
</template>

<script>
export default {
 name: 'Login',
 data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
   };
 },

 components: {},

 computed: {},

 methods: {
    handleLogin(e){
      e.preventDefault();
      console.log(`登陆`)
    },
    handleGithub: function() {
      console.log(`GitHub第三方登录`)
    },
    handleQQ: function() {
      console.log(`QQ第三方登录`)
    }
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
    width: 70px;
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
  /* 第三方登录样式 */
  .third_part_login{
    width: 300px;
    margin: 80px auto 0;
    text-align: center;
  }

</style>