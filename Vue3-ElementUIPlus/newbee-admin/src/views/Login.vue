<template>
  <div class="login-body">
    <!--登录框div-->
    <div class="login-container">
      <!--登录框头部logo部分-->
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="title">新蜂商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form label-position="right" label-width="60px" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号 :" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="password" >
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color:#333">登录表示您已同意<a href='javascript:;'>《服务条款》</a></div>
          <el-button class="el_button" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" class="el_checkbox" @change="!checked">自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios"
import md5 from 'js-md5'
import {reactive,toRefs,ref} from "vue"
import {localSet} from '@/utils/index'
// 安装前端加密 js-md5，密码需要md5加密，服务端是解密的md5的形式
export default{
  name: "Login",
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: '', // 账号
        password: '' // 密码
      },
      checked:true,
      // 表单验证判断
      rules:{
        username:[
          { required: 'true',message:'账号不能为空',trigger:'blur'}
        ],
        password:[
          { required: 'true',message:'密码不能为空',trigger:'blur'}
        ]
      }
    })
     // 表单提交方法
  const submitForm = async () => {
      loginForm.value.validate((valid) => {
        // valid 是一个布尔值，表示表单是否通过了上面 rules 的规则。
        if (valid) {
          // /adminUser/login 登录接口路径
          axios.post('/adminUser/login', {
            userName: state.ruleForm.username || '',
            passwordMd5: md5(state.ruleForm.password), // 密码需要 md5 加密
          }).then(res => {
            // 返回的时候会有一个 token，这个令牌就是我们后续去请求别的接口时要带上的，否则会报错，非管理员。
            // 这里我们将其存储到 localStorage 里面。
            localSet('token', res)
            // 此处登录完成之后，需要刷新页面
            window.location.href = '/'
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
      // 重置方法
      const resetForm = () => {
        // loginForm 能拿到el-form 的重置方法
        loginForm.value.resetFields()
      }
    return {
      ...toRefs(state),
      loginForm, // 注意，一定要返回 loginForm
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .login-body{
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  background-color: #fff;
} 
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form{
    width: 70%;
    margin: 0 auto;
  }
  .login-form >>> .login-form--label-top .el-form-item_babel {
    padding:0;
  }
  .login-form >>> .el-form-item {
    /* margin-bottom: 0px; */
  }
  .el_button{
    width: 100%;
  }
  .el-form-item .el-input{
    width: 200px;
  }
</style>
