<template>
  <div class="big_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="../assets/img/headportrait.jpg" alt="头像" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="user">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="Tz">前台</el-button>
          <el-button type="primary" @click="login">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 这是数据表单的绑定对象
      loginForm: {
        user: '',
        password: ''
      },
      loginFormRules: {
        // 验证用户名是否合法
        user: [
          { required: true, message: '请输入登入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      const user = this.loginForm.user
      const password = this.loginForm.password
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        const res = await this.$http.post('login', { params: { user, password } })
        if (res.status !== 200) {
          return this.$message.error('登录失败')
        } else {
          if (res.data.data.length === 0) {
            this.$refs.loginFormRef.resetFields()
            return this.$message.error('账号或者密码错误')
          } else {
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/Console')
            return this.$message.success('登录成功')
          }
        }
      })
    },
    Tz () {
      this.$router.push('/blog')
    }
  }
}
</script>
<style lang="less" scoped>
  .big_container {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/img/background.jpg');
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #dddddd;
    .avater_box {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #eee;
      padding: 5px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      top: -25%;
      left: 50%;
      transform: translate(-50%);
      background-color: white;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  }
  .login_form {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
.btns {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width:860px) {
  .login_box{
    width: 90%;
  }
}
</style>
