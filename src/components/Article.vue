<template>
  <div class="con">
    <div class="con_head">
      <div class="logo_img" @click="ZY()">
        <img src="../assets/img/mogu.png" alt="log_img" />
        <div class="BlogName">GuL1iiii</div>
      </div>
      <ul class="ul_left">
        <li><router-link :to="{ path: '/about' }">关于本站</router-link></li>
        <li><router-link :to="{ path: '/blog' }">博客文章</router-link></li>
        <li><router-link :to="{ path: '/Sourcecode' }">资源分享</router-link></li>
        <li><router-link :to="{ path: '/Comment' }">与我交流</router-link></li>
      </ul>
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <img src="../assets/img/Menu.png" alt="下拉菜单">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link :to="{ path: '/about' }">关于本站</router-link></el-dropdown-item>
          <el-dropdown-item><router-link :to="{ path: '/Sourcecode' }">资源分享</router-link></el-dropdown-item>
          <el-dropdown-item><router-link :to="{ path: '/Comment' }">与我交流</router-link></el-dropdown-item>
          <el-dropdown-item><router-link :to="{ path: '/' }">代刷课程</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="overflow-button">
        <a>
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </a>
      </div>
    </div>
    <div class="info_content">
      <div class="card_left">
        <transition>
            <router-view></router-view>
        </transition>
      </div>
      <div class="card_right">
        <div class="self_info">
          <div class="head_logo">
            <img src="../assets/img/bginfo.jpg" alt="bflogo" class="bglogo">
          </div>
          <div class="blog_wrap">
            <ul>
              <li>点赞</li>
              <li>浏览</li>
              <li>文章数</li>
            </ul>
            <ul>
              <li>{{$store.state.Fabulous}}</li>
              <li>{{$store.state.Browse}}</li>
              <li>{{$store.state.BlogNum}}</li>
            </ul>
          </div>
        </div>
        <el-card style="margin-top: 15px;">
          <!-- 搜索框 v-model="searchText"-->
          <el-input placeholder="请输入内容" class="input-with-select" @keyup.enter.native="Search">
          <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
          </el-input>
        </el-card>
        <div class="music_wrap">
          <iframe frameborder="0" border="1"
            marginwidth="0" marginheight="0"
            width="100%" height="450"
            src="//music.163.com/outchain/player?type=0&id=2903805702&amp;auto=1&amp;height=80">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    ZY () {
      this.$router.push('/')
    },
    Search () {
      this.$message.error('功能没写时间不够了下次写')
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition-delay: .6s;
}
.v-enter,
.v-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: .6s;
}
.con {
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: auto;
  height: 100vh;
  background-image: url('../assets/img/background.jpg');
  background-repeat: no-repeat;
    // 头部导航栏
    .con_head {
      width: 100%px;
      height: 60px;
      // margin: 0px auto;
      background-color: rgba(255, 255, 255, 0);
      position: sticky;
      top: 0px;
      z-index: 999;
      .logo_img {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          float: left;
          margin-left: 25px;
          margin-right: 5px;
        }
        .BlogName {
          height: 50px;
          line-height: 50px;
          font-size: 40px;
          float: left;
          color: #1989fa;
          font-weight: lighter;
        }
      }
      .ul_left {
        position: absolute;
        top: 50%;
        right: 25px;
        transform: translate(-0%, -50%);
        li {
          list-style: none;
          float: left;
          margin-left: 30px;
          color: #1989fa;
          a {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }

        .el-dropdown {
          float: right;
          display: none;
        }
        .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
          img {
            width: 40px;
            height: 40px;
          }
        }
    }
    // 博客文章区域
    .info_content {
      width: 85%;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      .card_right {
        width: 400px;
        margin-left: 10px;
        .self_info {
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          border: 1px solid #EBEEF5;
          border-radius: 4px;
          background-color: #fff;
          overflow: hidden;
          .head_logo {
            padding: 0;
            .bglogo {
              margin: 0;
              width: 100%;
              // border-radius: 5px;
              // -webkit-filter: blur(5px);
              // filter: blur(5px);
            }
          }
          .blog_wrap {
            margin: 10px 0;
            ul {
              display: flex;
              align-items: center;
              text-align: center;
              list-style: none;
              li {
                flex: 1;
                font-weight: bold;
              }
            }
          }
        }
        .music_wrap {
            width: 100%;
            min-width: 400px;
            margin: 15px 0px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            background-color: #fff;
        }
      }
    }
}

@media screen and (max-width: 860px) {
  .con {
    .con_head {
    width: 100%;
    .logo_img {
      margin-left: 20px;
      position: relative;
      width: 50px;
      img {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        margin-left:10px;
      }
      .BlogName {
        display: none;
      }
    }
    .ul_left {
      position: absolute;
      top: 165px;
      left: 30px;
      background-color: white;
      margin-right: 30px;
      box-shadow: 0px 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      overflow: hidden;
      display: none;
       li{
         width: 100%;
         height: 50px;
         text-align: center;
         line-height: 50px;
         margin-left: 0;
         clear: both;
         border-bottom: 1px solid #ccc ;
      }
    }
    .el-dropdown {
      display: block;
      position: absolute;
      top: 50%;
      right: 25px;
      transform: translate(-0%, -50%);
    }
    }
    .info_content {
      width: 95%;
      flex-wrap: wrap;
      .card_right {
        width: 100%;
        margin-left: 0;
      }
      .card_left {
        width: 100%;
      }
    }
  }
}
</style>
