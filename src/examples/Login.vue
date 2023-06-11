<script setup>
import { reactive } from 'vue'
// 用户登录时输入的数据
const userInfo = reactive({
  email: '',
  password: '',
})
// 配置校验规则
const rules = reactive({
  email: [
    { validator: validateEmail, trigger: 'blur' },
  ],
  password: [
    { validator: validatePassword, trigger: 'blur' },
  ],
})
// 匹配邮箱的正则函数
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const onSubmit = () => {
  // TODO: 用户登录操作
}
// 验证邮箱是否符合规范的函数
function validateEmail(rule, value, callback) {
  if (value === '') {
    callback(new Error('邮箱不能为空'))
  } else if (!emailReg.test(value)) {
    callback(new Error('邮箱格式不匹配'))
  } else {
    callback()
  }
}
// 验证密码是否符合规范的函数
function validatePassword(rule, value, callback) {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
</script>

<template>
  <div class="container">
    <el-form :rules="rules" :model="userInfo" label-width="120px">
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="userInfo.email" clearable />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="userInfo.password" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
}
.el-form {
  margin: auto;
}
</style>
