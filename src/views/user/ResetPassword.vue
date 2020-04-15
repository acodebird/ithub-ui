<!--用户注册页面-->
<template>
 <div class="body-bg">
   <div class="logo">
     <router-link to="/"><img src="../../assets/ITHub.svg" height="100" alt="网站logo" title="点击回首页"></router-link>
   </div>
   <div class="main">
     <h4 class="title">找回密码</h4>
     <div class="reset">
       <a-form
        ref="reset_form"
        id="reset_form"
        :form="form"
       >
        <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '邮箱不能为空!' }],
            },
          ]"
          placeholder="请输入注册或绑定的邮箱"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
        </a-form-item>
        <a-form-item>
        <a-input
          v-decorator="[
            'code',
            {
              rules: [{ required: true, message: '验证码!' }],
            },
          ]"
          placeholder="验证码"
          style="width:50%;height:42px;"
        >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <a-divider type="vertical" />
        <a-button type="primary" html-type="submit">
          获取验证码
        </a-button>
        </a-form-item>
        <a-form-item>
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '用户密码不能为空!' }],
            },
          ]"
          placeholder="请输入新密码"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="safety" style="color: rgba(0,0,0,.25)" />
        </a-input-password>
        </a-form-item>
        <a-form-item>
        <a-input-password
          v-decorator="[
            'repassword',
            {
              rules: [{ required: true, message: '用户密码不能为空!' }],
            },
          ]"
          placeholder="用请确认新密码"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="safety" style="color: rgba(0,0,0,.25)" />
        </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="reset_button">
            重置密码
          </a-button>
        </a-form-item>
        <a-form-item style="text-align: center;">
          <router-link style="color: gray;" to="/login"><a-icon type="rollback"  style="fontSize: 18px;"/>&nbsp;返回登录页面</router-link>
        </a-form-item>
       </a-form>
     </div>
   </div>
 </div>
</template>

<script>
export default {
 name: 'ResetPassword',
 data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
   };
 },

 components: {},

 computed: {},

 methods: {
    handleLogin: function(){
      console.log(`登陆`)
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
  .reset{
    width: 300px;
    height: auto;
    margin: auto;
  }
  .reset_input{
    background-color: #f5f6f7;
  }
  .reset_button{
    width: 100%;
    height: 42px;
  }

</style>