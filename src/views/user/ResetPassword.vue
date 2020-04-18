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
        @submit="handleReset"
       >
        <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '邮箱不能为空!' },{validator: handleCheckEmail}],
            },
          ]"
          placeholder="请输入注册或绑定的邮箱"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
        </a-form-item>
        <a-form-item>
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '密码不能为空!' }],
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
            'comfirmPwd',
            {
              rules: [{ required: true, message: '确认密码不一致!' },{validator: handleValidConfirm}],
            },
          ]"
          placeholder="用请确认新密码"
          style="height:42px;"
        >
        <a-icon slot="prefix" type="safety" style="color: rgba(0,0,0,.25)" />
        </a-input-password>
        </a-form-item>
        <a-form-item>
        <a-input
          v-decorator="[
            'code',
            {
              rules: [{ required: true, message: '请填写验证码' },{validator: handleCheckCode}],
            },
          ]"
          placeholder="验证码"
          style="width:50%;height:42px;"
        >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <a-divider type="vertical" />
        <a-button type="primary" @click="getCode" :disabled="isGet">
          {{this.codeTips}}
        </a-button>
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
import { sendEmail, resetPwd } from '@/api/user'
import { logout } from '@/api/login'

export default {
 name: 'ResetPassword',
 data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      isGet: false,
      timer: null,
      codeTips: '获取验证码',
      checkBox: false,
   };
 },

 components: {},

 computed: {},

 methods: {
    handleCheckEmail(rule, value, callback) {
      //验证邮箱格式
      if (value != undefined && (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)))) {
        callback('请输入正确的邮箱')
      }
      callback();
    },
    handleCheckCode(rule, value, callback) {
      //检查验证码是否正确
      if(value != undefined && !(/^\d{6}$/.test(value))) {
        callback('验证码要求6位数字')
      }else {
        callback()
      }
      callback();
    },
    handleValidConfirm(rule, value, callback) {
      //验证确认密码是否一致
      if (value && value !== this.form.getFieldValue('password')) {
        callback('确认密码不一致!');
      }
      callback();
    },
    //获取验证码
    getCode() {
      this.form.validateFields(['email'], (errors, values) => {
        if(!errors) {
          let email = this.form.getFieldValue('email')
          console.log("可以获取验证码")
          sendEmail( email ).then(res => {
            if(res.success === true) {
              if (!this.timer) {
                  this.isGet = true
                  this.codeTips = 60;
                  this.show = false;
                  this.timer = setInterval(() => {
                  if (this.codeTips > 0 && this.codeTips <= 60) {
                    this.codeTips--;
                  } else {
                    this.isGet = false;
                    this.codeTips = '获取验证码'
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
              this.$notification.success({message: res.data})
            }else{
              this.$message.error(`${res.data}`)
            }
          }).catch(err => {
            this.$message.error(`获取验证码失败：请求异常，请稍后再试`)
          })
        }
      });
    },
    handleReset(e){
      console.log(`重置密码`)
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          resetPwd( {...values} ).then(res => {
            if(res.success === true) {
              this.$notification.success({message: res.data})
              this.handleLogout() //加入用户已经登录，则需要注销用户
              this.$router.push({path:'/login'})
            }else{
              this.$message.error(`${res.data}`)
            }
          }).catch(err => {
            this.$message.error(`重置密码失败：请求异常，请稍后再试`)
          })
        }
      });
    },
    //注销登录
   handleLogout() {
     console.log(`注销登录`);
     logout().then(res => {
       if(res.success === true) {
         console.log("重置密码后需要注销当前账户")
       }
     }).catch(ex => {
       this.$message.error(`退出登录失败`)
     })
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