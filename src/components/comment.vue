<template>
    <div class="Comments">
        <el-card class="box-card1"><el-page-header @back="goBack" content="留言页面"></el-page-header></el-card>
        <el-card class="box-card2">
            <el-form
                ref="commFormRef"
                :rules="commFormRules"
                :model="commForm">
                <el-form-item prop="username">
                  <el-input placeholder="请输入用户名" v-model="commForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="comments">
                  <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="commForm.comments"></el-input>
                </el-form-item>
                <el-button type="primary" class="LyButton" @click="LyButton()">留言</el-button>
            </el-form>
            <!-- <div class="commdiv1">
              <div class="divmm1" v-for="(item, index) in contentList" :key="index">
                  <h3 class="name">{{ contentList[index].username }}</h3>
                  <div class="Ly">留言内容：{{ contentList[index].comments }}</div>
                  <div class="ip">留言时间: {{ contentList[index].time }}</div>
              </div>
            </div> -->
        </el-card>
        <div class="masont">
          <div v-masonry transition-duration="0.3s" item-selector=".item">
              <div v-masonry-tile class="item" v-for="(item, index) in contentList" :key="index">
                  <div>
                    <h4>{{ contentList[index].username }}</h4>
                    <p>留言内容：</p>
                    <p class="info">{{ contentList[index].comments }}</p>
                    <p>留言时间:</p>
                    <p class="Ly_time">{{ contentList[index].time }}</p>
                    <div @click="drawer = true">点击查看留言>>></div>
                  </div>
              </div>
          </div>
        </div>
        <el-drawer
          title="回复详情"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <span>我来啦!</span>
         </el-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 上拉抽屉
      drawer: false,
      direction: 'btt',
      commForm: {
        username: '',
        time: '',
        comments: '',
        ip: ''
      },
      contentList: [],
      commFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        comments: [
          { required: true, message: '留言内容不可为空', trigger: 'blur' },
          { min: 2, message: '不能少于两个字', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getComm1()
  },
  methods: {
    goBack () {
      this.$router.push('/blog')
    },
    async getComm1 () {
      const res = await this.$http.get('/comment1')
      if (res.status !== 200) {
        this.$message.error('获取留言内容失败')
      }
      this.contentList = res.data
    },
    LyButton () {
      // 时间
      const time = new Date()
      // ip
      const ip = localStorage.getItem('Ip')
      // 定义数据
      const username = this.commForm.username
      const comments = this.commForm.comments
      // 请求
      if (this.commForm.username.length === 0) {
        this.$message.error('留言失败，用户名为空')
      } else if (this.commForm.comments.length === 0) {
        this.$message.error('留言失败，留言内容为空')
      } else {
        this.$refs.commFormRef.validate(async valid => {
          const res = await this.$http.post('/commentC', { params: { time, ip, username, comments } })
          if (res.status !== 200) {
            this.$message.error('留言失败，服务器出错')
          }
          this.$message.success('留言成功')
          this.$refs.commFormRef.resetFields()
          this.getComm1()
        })
      }
    },
    handleClose (done) {
      this.drawer = false
    }
  }
}
</script>
<style lang="less" scoped>
.Comments{
    width: 1200px;
    margin: 0px auto;
    .box-card2{
        margin-top: 20px;
        .LyButton{
            float: right;
            width: 100%;
            margin-bottom: 20px;
        }
        .commdiv1 {
          .divmm1{
            margin: 12px;
            .Ly{
                font-size: 20px;
            }
            .ip{
            font-size: 10px;
            border-bottom: 1px solid #cccccc;
            padding-bottom: 10px;
            }
          }
        }
    }
}
.masont {
  .item {
      width: 300px;
      // height: 200px;
      padding: 10px;
    div {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info {
        word-wrap:break-word;
      }
      .Ly_time {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div {
        text-align: right;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  // .item:nth-child(odd) {
  //   height: 400px;
  // }
}
@media screen and (max-width:860px) {
    .Comments{
        width: 100%;
    }
    .masont {
      width: 100%;
      .item {
        width: 100%;
      }
    }
}
</style>
