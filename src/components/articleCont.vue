<template>
    <div class="Con_article">
        <div>
            <el-card class="box-card1">
              <h2>{{ articleMList.header }}</h2>
            </el-card>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/blog' }">文章列表</el-breadcrumb-item>
              <el-breadcrumb-item>文章详情</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card class="box-card2">
              <div class="Dianz" @click="DianzA"><img src="../assets/img/点赞.png" alt="点赞"></div>
              <div v-html="articleMList.article1"></div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      articleMList: {}
    }
  },
  created () {
    this.articleC()
  },
  methods: {
    async articleC () {
      const id = this.$route.params.id
      const res = await this.$http.get('comm/' + id)
      if (res.status !== 200) {
        this.$message.error('获取数据失败')
      }
      this.articleMList = res.data
    },
    DianzA () {
      this.$store.commit('addFabulous')
    }
  }
}
</script>
<style lang="less" scoped>
.Con_article{
    width: 1200px;
    max-width: 1200px;
}
.box-card1{
    margin-bottom: 10px;
    text-align: center;
}
.box-card2 {
  position: relative;
  .Dianz {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
.el-breadcrumb{
    margin-bottom: 10px;
}
@media screen and (max-width:860px) {
    .Con_article{
        width: 100%;
        min-width: 0px;
    }
    .box-card2 {
      .Dianz {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
}
</style>
