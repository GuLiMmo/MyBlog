<template>
  <div>
    <el-card class="box-card">
      <el-page-header @back="goBack" content="资料分享"></el-page-header>
    </el-card>
    <el-card class="FenLei">
        <div @click="WJs(0)">Js</div>
        <div @click="WJs(1)">Vue</div>
        <div @click="WJs(2)">Node</div>
        <div @click="WJs(3)">Html</div>
        <div @click="WJs(4)">Css</div>
        <div @click="WJs(5)">All</div>
    </el-card>
    <div v-if="ScodeList.length!==0">
      <el-card class="Scode" v-for="( item, index ) in ScodeList" :key="index">
        <div>{{ ScodeList[index].CodeText }}</div>
        <a :href="ScodeList[index].CodeLink" target="_blank">
            <el-button icon="el-icon-share" circle type="primary" class="button" @click="addBorw"></el-button>
        </a>
      </el-card>
    </div>
    <div v-else><el-card class="no_thing">没有该资源</el-card></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      ScodeList: [],
      Jsss: 'Js',
      Vueee: 'Vue',
      Nodee: 'Node',
      Htmlll: 'Html',
      Cssss: 'Css',
      Alll: '',
      resData: []
    }
  },
  created () {
    this.httpall()
  },
  methods: {
    goBack () {
      this.$router.push('/blog')
    },
    // 浏览量
    addBorw () {
      this.$store.commit('addBrowse')
    },
    async httpall () {
      const res = await this.$http.all([
        this.$http.post('/Scode', { params: this.Jsss }),
        this.$http.post('/Scode', { params: this.Vueee }),
        this.$http.post('/Scode', { params: this.Nodee }),
        this.$http.post('/Scode', { params: this.Htmlll }),
        this.$http.post('/Scode', { params: this.Cssss }),
        this.$http.post('/Scode', { params: this.Alll })
      ])
      this.resData = res
      this.WJs(5)
    },
    async WJs (parmas) {
      this.ScodeList = await this.resData[parmas].data
    }
  }
}
</script>
<style lang="less" scoped>
.box-card {
  width: 1200px;
}
.FenLei {
  width: 1200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
    div {
      flex: 1;
      flex-wrap: nowrap;
      background-color: #007BFF;
      width: 365px;
      height: 50px;
      display: inline-block;
      margin:10px;
      color: white;
      line-height: 50px;
      text-align: center;
      border-radius: 5px;
      cursor:pointer;
    }
}
.Scode{
    width: 1200px;
    margin: 10px auto;
    position: relative;
    div{
        width:700px;
        overflow:hidden;
         //文本溢出显示省略号
        text-overflow:ellipsis;
        //文本不会换行
        white-space:nowrap;
        font-weight: bold;
    }
    .button{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(0,-50%);
    }
}
.no_thing {
  width: 100%;
  height: 200px;
  font-size: 40px;
  text-align: center;
  line-height: 190px;
  font-weight: bold;
}
@media screen and (max-width:860px) {
    .box-card,
    .FenLei,
    .Scode{
        width: 100%;
    }
    .FenLei {
      div {
        width: 42.5%;
        height: 30px;
        line-height: 30px;
      }
    }
    .Scode{
        div{
            width: 240px;
        }
    }
}
</style>
