<template>
    <div class="bigdiv">
        <!-- 后台管理 -->
        <el-card class="box-card box-font">后台管理</el-card>
        <!-- 返回前台页面 -->
        <el-card class="box-card"><el-page-header @back="goBack" content="返回前台页面"></el-page-header></el-card>
        <!-- 文章管理 -->
        <div class="article_list">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>文章管理</span>
                </div>
                <!-- 文章列表 -->
                <div v-for="(item, index) in ArticleList" :key="index" class="text item">
                    <el-card class="UserCard">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="DeleteB(index+1)"></el-button>
                        <div>
                            <span>文章：{{ ArticleList[index].header }}</span>
                        </div>
                    </el-card>
                </div>
            </el-card>
        </div>
        <!-- 留言IP查看 -->
        <!-- 添加分享 -->
        <div class="article_list">
            <el-card class="box-card">
                <div slot="header" class="clearfix"><span>留言IP查看</span></div>
                    <div v-for="(item, index) in CommList" :key="index">
                        <el-card>
                            <div>昵称：{{ CommList[index].username }}</div>
                            <div>IP：{{ CommList[index].ip }}</div>
                        </el-card>
                    </div>
            </el-card>
        </div>
        <!-- 添加文章 -->
        <div class="article_list">
            <el-card class="box-card">
                <div slot="header" class="clearfix"><span>添加文章</span></div>
                <!-- 表单 -->
                    <el-form
                        ref="ArticleFormRef"
                        :model="ArticleForm"
                        :rules="ArticleFormRules">
                        <!-- 文章id -->
                        <el-form-item prop="id">
                          <el-input placeholder="请输入文章id" v-model="ArticleForm.id"></el-input>
                        </el-form-item>
                        <!-- 文章标题 -->
                        <el-form-item prop="header">
                          <el-input placeholder="请输入文章标题" v-model="ArticleForm.header"></el-input>
                        </el-form-item>
                        <!-- 文章介绍 -->
                        <el-form-item prop="brief">
                          <el-input type="textarea" placeholder="请输入文章简介" v-model="ArticleForm.brief"></el-input>
                        </el-form-item>
                        <!-- 封面图片 -->
                        <el-form-item prop="briefimg">
                          <el-input placeholder="请输入封面图片链接" v-model="ArticleForm.briefimg"></el-input>
                        </el-form-item>
                        <!-- 文章1 -->
                        <el-form-item prop="article1">
                          <el-input type="textarea" placeholder="文章内容" v-model="ArticleForm.article1"></el-input>
                        </el-form-item>
                        <!-- 按钮 -->
                        <el-form-item>
                          <el-button type="primary" class="btns" @click="addArticle()">添加</el-button>
                        </el-form-item>
                    </el-form>
            </el-card>
        </div>
        <!-- 添加分享 -->
        <div class="article_list">
            <el-card class="box-card">
                <div slot="header" class="clearfix"><span>添加分享</span></div>
                    <!-- 表单 -->
                        <el-form
                            ref="ScodeFormRef"
                            :model="ScodeForm"
                            :rules="ScodeFormRules">
                            <!-- 选择 -->
                            <el-select v-model="value" placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                            <!-- 分享标题 -->
                            <el-form-item prop="CodeText">
                              <el-input placeholder="请输入分享标题" v-model="ScodeForm.CodeText"></el-input>
                            </el-form-item>
                            <!-- 分享链接 -->
                            <el-form-item prop="CodeLink">
                              <el-input placeholder="请输入分享链接" v-model="ScodeForm.CodeLink"></el-input>
                            </el-form-item>
                            <!-- 按钮 -->
                            <el-form-item>
                            <el-button type="primary" class="btns" @click="addScode()">添加</el-button>
                            </el-form-item>
                        </el-form>
            </el-card>
        </div>
        <!-- 图片上传 -->
        <div class="article_list">
          <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>图片上传</span>
                </div>
                <el-upload
                  action="http://api.konu1.cn/API/uploader"
                  method="post"
                  list-type="picture-card"
                  enctype="multipart/form-data"
                  ref="upload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="successImg"
                  :auto-upload="false"
                  :multiple = "false">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <!-- 图片预览 -->
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <!-- 上传图片 -->
                <el-button type="primary" class="btnUp" @click="submit()">上传</el-button>
          </el-card>
        </div>
        <!-- 图片预览 -->
        <div class="article_list">
          <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>图片预览</span>
                </div>
                <div class="btn-Item">
                  <div>
                    <el-button @click="Tx()">头像</el-button>
                    <el-button @click="Gx()">搞笑图片</el-button>
                    <el-button @click="Wz()">文章图片</el-button>
                    <el-button @click="Bz()">壁纸</el-button>
                    <el-button @click="Qt()">其他</el-button>
                  </div>
                </div>
                <div class="imgFileUrl">
                  <div v-for="(item, index) in readImgUrl" :key="index" class="imgFileUrl2">
                      <!-- <div>{{ readImgUrl[index].FileUrl }}</div> -->
                      <!-- <img :src="readImgUrl[index].FileUrl" alt="图片"/> -->
                      <div>
                        <img width="100%" :src="readImgUrl[index].FileUrl" alt="预览图片">
                        <el-input v-model="readImgUrl[index].FileUrl" size="mini"/>
                      </div>
                  </div>
                </div>
          </el-card>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    // 验证是否是链接正则表达式
    var checkLink = (rule, value, cb) => {
      const regLink1 = /((?:https:\/\/)(?:.[\w]+)+)/g
      const regLink2 = /((?:http:\/\/)(?:.[\w]+)+)/g
      if (regLink1.test(value)) {
        // 合法链接
        return cb()
      } else if (regLink2.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的链接'))
    }
    return {
      // 文章数据
      ArticleList: [],
      // 留言数据
      CommList: [],
      // 分享的标题和链接
      ScodeForm: {
        CodeText: '',
        CodeLink: ''
      },
      // 文章分享的表单
      ArticleForm: {
        id: '',
        header: '',
        brief: '',
        briefimg: '',
        article1: ''
      },
      // 图片预览窗口控制
      dialogVisible: false,
      // 图片地址
      dialogImageUrl: '',
      // 图片目录
      imgUrlD: '',
      // 图片名字
      imgFilename: '',
      // 图片地址
      imgURL: '',
      // 读取出来的图片地址
      readImgUrl: [],
      // 分类下拉菜单选项
      options: [{
        value: 'Js',
        label: 'Js'
      },
      {
        value: 'Vue',
        label: 'Vue'
      },
      {
        value: 'Node',
        label: 'Node'
      },
      {
        value: 'Html',
        label: 'Html'
      },
      {
        value: 'Css',
        label: 'Css'
      }],
      value: '',
      // 填写分享规则
      ScodeFormRules: {
        // 限制分享标题的长度
        CodeText: [
          { required: true, message: '请输入分享标题', trigger: 'blur' },
          { min: 2, message: '长度不得小于2', trigger: 'blur' }
        ],
        // 规范链接
        CodeLink: [
          { required: true, message: '请输入分享链接', trigger: 'blur' },
          { validator: checkLink, trigger: 'blur' }
        ]
      },
      ArticleFormRules: {
        id: [
          { required: true, message: '请输入文章id', trigger: 'blur' }
        ],
        // 现在文章标题的长度
        header: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 2, message: '长度不得小于2', trigger: 'blur' }
        ],
        // 限制介绍最短长度
        brief: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 6, message: '长度不得小于6', trigger: 'blur' }
        ],
        // 规范链接
        briefimg: [
          { required: true, message: '请输入图片链接', trigger: 'blur' },
          { validator: checkLink, trigger: 'blur' }
        ],
        // 限制内容
        article1: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          { min: 2, message: '长度不得小于2', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.articleL()
    this.CommListS()
    this.readImg()
  },
  methods: {
    // 返回前台页面
    goBack () {
      this.$router.push('/Article')
    },
    // 获取文章页面
    async articleL () {
      const res = await this.$http.get('blog')
      if (res.status !== 200) {
        return this.$message.error('数据请求失败')
      }
      this.ArticleList = res.data
    },
    // 留言IP查看
    async CommListS () {
      const res = await this.$http.get('/comment1')
      if (res.status !== 200) {
        return this.$message.error('数据请求失败')
      }
      this.CommList = res.data
    },
    // 删除文章
    async DeleteB (index) {
      const res = await this.$http.get(`/DeleteB/${index}`)
      if (res.status !== 200) {
        this.$message.error('删除文章失败')
      }
      this.$$message.success('删除文章成功')
      this.articleL()
    },
    // 添加分享
    addScode () {
      const CodeText = this.ScodeForm.CodeText
      const CodeLink = this.ScodeForm.CodeLink
      const Sort = this.value
      if (this.ScodeForm.CodeText.length === 0) {
        this.$message.error('添加失败，标题为空')
      } else if (this.ScodeForm.CodeLink.length === 0) {
        this.$message.error('添加失败，链接为空')
      } else {
        this.$refs.ScodeFormRef.validate(async valid => {
          const res = await this.$http.post('/addScod', { params: { CodeText, CodeLink, Sort } })
          if (res.status !== 200) {
            this.$message.error('添加失败')
          }
          this.$refs.ScodeFormRef.resetFields()
          this.$message.success('添加成功')
        })
      }
    },
    // 添加文章
    addArticle () {
      const { id, header, brief, briefimg, article1 } = this.ArticleForm
      if (this.ArticleForm.id === 0) {
        this.$message.error('添加失败，id为空')
      } else if (this.ArticleForm.header.length === 0) {
        this.$message.error('添加失败，标题为空')
      } else if (this.ArticleForm.brief.length === 0) {
        this.$message.error('添加失败，文章介绍为空')
      } else if (this.ArticleForm.briefimg.length === 0) {
        this.$message.error('添加失败，简介图片链接为空')
      } else if (this.ArticleForm.article1.length === 0) {
        this.$message.error('添加失败，文章内容一为空')
      } else {
        this.$refs.ArticleFormRef.validate(async valid => {
          const res = await this.$http.post('/addAricle', { params: { id, header, brief, briefimg, article1 } })
          if (res.status !== 200) {
            this.$message.error('添加失败')
          }
          this.$refs.ArticleFormRef.resetFields()
          this.$message.success('添加成功')
        })
      }
    },
    // 添加图片
    // 预览图片
    handlePictureCardPreview (file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    // 移除图片
    handleRemove (file) {
      this.dialogImageUrl = ''
    },
    // 成功上传图片
    successImg (res, file) {
      this.$message.success('上传图片成功')
      this.$refs.upload.clearFiles()
      // console.log(res)
      this.imgUrlD = res.destination
      this.imgFilename = res.originalname
      const http = 'http://'
      // 字符串截取和地址拼接
      this.imgURL = http + this.imgUrlD.slice(3) + this.imgFilename
      // console.log(this.imgURL)
      this.SaveFile()
    },
    // 上传图片
    submit () {
      this.$refs.upload.submit()
    },
    // 保存图片地址
    async SaveFile () {
      const FileSave = this.imgURL
      const res = await this.$http.post('/FileSave', { params: FileSave })
      if (res.status !== 200) {
        this.$message.error('保存图片地址失败')
      }
      this.$message.success('保存图片地址成功')
      this.readImg()
    },
    // 读取图片
    async readImg () {
      const res = await this.$http.post('/readImg')
      if (res.status !== 200) {
        this.$message.error('读取图片地址失败')
      }
      this.readImgUrl = res.data
    },
    // 图片分类
    async Tx () {
      const Tx = '头像'
      const res = await this.$http.post('/imgSort', { params: Tx })
      if (res.status !== 200) {
        this.$message.error('读取图片地址失败')
      }
      this.readImgUrl = res.data
    },
    async Gx () {
      const Gx = '搞笑图片'
      const res = await this.$http.post('/imgSort', { params: Gx })
      if (res.status !== 200) {
        this.$message.error('读取图片地址失败')
      }
      this.readImgUrl = res.data
    },
    async Wz () {
      const Wz = '文章图片'
      const res = await this.$http.post('/imgSort', { params: Wz })
      if (res.status !== 200) {
        this.$message.error('读取图片地址失败')
      }
      this.readImgUrl = res.data
    },
    async Bz () {
      const Bz = '壁纸'
      const res = await this.$http.post('/imgSort', { params: Bz })
      if (res.status !== 200) {
        this.$message.error('读取图片地址失败')
      }
      this.readImgUrl = res.data
    },
    async Qt () {
      const Qt = '其他'
      const res = await this.$http.post('/imgSort', { params: Qt })
      if (res.status !== 200) {
        this.$message.error('读取图片地址失败')
      }
      this.readImgUrl = res.data
    }
  }
}
</script>
<style lang="less" scoped>
    .bigdiv{
        width: 100%;
    }
    // 卡片设置
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        width: 1040px;
        margin: 20px auto;
    }
    .box-font{
        text-align: center;
    }
    .btn-Item{
      border-bottom: 1px solid #cccccc;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 10px;
      .el-button{
        margin-bottom: 15px;
      }
    }
    .imgFileUrl {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .imgFileUrl2 {
        width: 300px;
        margin: 10px;
        display: inline-block;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, .2);
        overflow: hidden;
        border-radius: 5px;
        img {
          width: 300px;
          height: 300px;
        }
        .el-input {
          border-radius: 0px 0px 5px 5px;
        }
      }
    }
    .UserCard{
        div{
            span{
                margin-left: 20px ;
            }
        }
        .el-button{
            float: right;
        }
    }
    .btns,
    .btnUp {
        width: 100%;
    }
    .btnUp {
      margin-top: 20px;
    }
    @media screen and (max-width:860px) {
        .UserCard {
          span{
            display: inline-block;
            width: 200px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }
        .box-card {
            width: 90%;
        }
        .btn-Item {
          margin: 5px 0 5px 0;
        .el-button {
            width:46.6%;
            background-color: rgba(255, 255, 255, 0.33);
            margin: 5px 5px 10px 5px;
        }
      }
      .imgFileUrl {
          .imgFileUrl2 {
          width: 135px;
          margin: 10px;
          img {
            width: 135px;
            height: 135px;
          }
        }
      }
    }
</style>
