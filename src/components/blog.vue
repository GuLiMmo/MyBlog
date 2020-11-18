<template>
    <div class="Con_blog">
        <div class="blog_info_wrap">
            <div class="blog_info">
                    <div v-for="(item, index) in articleList" :key="index" class="divBlog">
                    <img v-lazy="articleList[index].briefimg" alt="图片">
                    <div class="divText">
                        <div class="title_info">
                            <h2>{{ articleList[index].header }}</h2>
                            <p>{{ articleList[index].brief }}</p>
                        </div>
                        <router-link :to="'/articleCont/'+ (index+1)" class="routerLin"><span @click="jiajia">阅读全文>>></span></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      articleList: [],
      searchText: ''
    }
  },
  created () {
    this.getarticle()
  },
  methods: {
    async getarticle () {
      const res = await this.$http.get('blog')
      if (res.status !== 200) {
        return this.$message.error('数据请求失败')
      }
      this.articleList = res.data
      // 文章数量统计
      this.$store.state.BlogNum = res.data.length
    },
    // 搜索
    async  Search () {
      const Search = this.searchText
      const res = await this.$http.post('/Search', { params: Search })
      if (res.status !== 200) {
        return this.$message.error('数据请求失败')
      }
      if (res.data.length === 0) {
        this.$message.error('没有此文章，请重新搜索')
      } else {
        this.articleList = res.data
      }
    },
    // 浏览量
    jiajia () {
      this.$store.commit('addBrowse')
    //   console.log(this.$store.state.Browse)
    }
  }
}
</script>
<style lang="less" scoped>
.blog_info_wrap {
    width: 1200px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .blog_info {
        width: 100%;
        .divBlog {
            width: 100%;
            display: flex;
            padding: 20px;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            border-bottom: 2px solid #cccccc;
            img {
                width: 300px;
                // height: 300px;
                border-radius: 5px;
            }
            .divText {
                width: 800px;
                position: relative;
                display: flex;
                flex-flow: column;
                .title_info {
                    text-align: center;
                    flex: 1;
                    h2 {
                        color: #007bff;
                        margin-bottom: 30px;
                        display: -webkit-box;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }
                    p {
                        display: -webkit-box;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                    }
                }
                .routerLin {
                    text-align: right;
                }
            }
        }
        .divBlog:first-child{
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .divBlog:last-child{
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            border: 0;
        }
    }
}
@media screen and (max-width:860px) {
    .Con_blog {
        width: 100%;
        margin-bottom: 15px;
        .blog_info_wrap {
            width: 100%;
            .divBlog {
                border-radius: 5px;
                margin-top: 15px;
                border-bottom: 0;
                img {
                    width: 100%;
                }
                .divText {
                    margin-top: 15px;
                    text-align: center;
                    .title_info {
                        text-align: center;
                        flex: 1;
                        h2 {
                            margin-bottom: 20px;
                            display: -webkit-box;
                            overflow: hidden;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                        }
                        p {
                            display: -webkit-box;
                            overflow: hidden;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 4;
                        }
                    }
                }
            }
        }
    }
}
</style>
