<template>
  <div class="Con_blog">
    <el-card class="box-card">
      <div class="topdiv">
        <div>个人简介</div>
        <img src="../assets/img/headportrait.jpg" alt="头像" class="headportrait" />
        <div>GuL1iiii</div>
        <p>兴趣：听歌、打游戏</p>
        <p>QQ：2820890765</p>
      </div>
      <div class="centerdiv" @click="progress()">
        <p>个人学习进度</p>
        <div>
          <div>JS</div>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="progressList.js"></el-progress>
          <div>VUE</div>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="progressList.vue" status="success"></el-progress>
          <div>CSS</div>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="progressList.css" status="warning"></el-progress>
          <div>NODEJS</div>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="progressList.nodejs" status="exception"></el-progress>
        </div>
      </div>
      <div class="bottomdiv">
        <p>关于博客</p>
        <div>博客网站：blog.konu1.cn</div>
        <div>上线时间：2020年9月1号</div>
        <div>博客内容：啥都没有瞎瘠薄乱写的博客</div>
        <div>博客源码：展示没有上传，需要的话可以联系我的QQ</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      progressList: {}
    }
  },
  created () {
    this.progress()
  },
  methods: {
    async progress () {
      const res = await this.$http.get('/progress')
      if (res.status !== 200) {
        this.$message.error('获取数据失败')
      }
      this.progressList = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.Con_blog {
  width: 1200px;
  margin: 0px auto;
  .box-card {
    padding: 30px 0px 30px 0px;
    .topdiv {
      width: 160px;
      margin: 0px auto;
      img {
        width: 160px;
        height: 160px;
        border: 2px solid slategray;
        margin: 10px 0 10px 0;
        border-radius: 50%;
      }
      div:nth-child(1) {
        border-bottom: 1px solid #cccccc;
      }
      div {
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        text-align: center;
      }
    }
    .centerdiv {
      margin: 0px auto;
      width: 300px;
      margin-top: 40px;
      p {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        border-bottom: 1px solid #cccccc;
      }
      div {
        div {
          text-align: center;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .el-progress {
          margin-bottom: 15px;
        }
      }
    }
    .bottomdiv {
      width: 250px;
      margin: 0px auto;
      p {
        font-size: 30px;
        font-weight: bold;
        margin-top: 40px;
        border-bottom: 1px solid #cccccc;
        text-align: center;
      }
    }
  }
}
@media screen and (max-width: 860px) {
  .Con_blog {
    width: 95%;
  }
}
</style>
