<template>
    <div class="Welcome_container">
        <div class="card">
            <input type="radio" name="select" id="slide_1" checked>
            <input type="radio" name="select" id="slide_2">
            <input type="radio" name="select" id="slide_3">
            <input type="radio" name="select" id="slide_4">
            <!-- 点击按钮 -->
            <div class="slide">
                <label for="slide_1" class="slide_btn_1"></label>
                <label for="slide_2" class="slide_btn_2"></label>
                <label for="slide_3" class="slide_btn_3"></label>
                <label for="slide_4" class="slide_btn_4"></label>
            </div>
            <!-- 主题内容 -->
            <!-- 博客文章 -->
            <div class="content">
                <label for="" class="pic">
                    <img src="../assets/Headpicture/文章内容.png" class="img_1" alt="">
                </label>
                <div class="text text_1">
                    <h2 class="tit">博客文章</h2>
                    <p class="info">分享平常遇到的一些问题和平常遇到的一些BUG的解决办法还有一些有趣的、有用的前端文章</p>
                    <router-link :to="{ path: '/blog' }"><button class="btn">Read More</button></router-link>
                </div>
            </div>
            <!-- 资源分享 -->
            <div class="content">
                <label for="" class="pic">
                    <img src="../assets/Headpicture/资源分享.png" class="img_2" alt="">
                </label>
                <div class="text text_2">
                    <h2 class="tit">资源分享</h2>
                    <p class="info">平常找到的一些小工具，好文章的分享</p>
                    <router-link :to="{ path: '/Sourcecode' }"><button class="btn">Read More</button></router-link>
                </div>
            </div>
            <!-- 与我交流 -->
            <div class="content">
                <label for="" class="pic">
                    <img src="../assets/Headpicture/与我交流.png" class="img_3" alt="">
                </label>
                <div class="text text_3">
                    <h2 class="tit">与我交流</h2>
                    <p class="info">没事可以和我聊聊天</p>
                    <router-link :to="{ path: '/Comment' }"><button class="btn">Read More</button></router-link>
                </div>
            </div>
            <!-- 后台控制中心 -->
            <div class="content">
                <label for="" class="pic">
                    <img src="../assets/Headpicture/个人中心.png" class="img_4" alt="">
                </label>
                <div class="text text_4">
                    <h2 class="tit">控制中心</h2>
                    <p class="info">后台控制中心</p>
                    <router-link :to="{ path: '/Login' }"><button class="btn">Read More</button></router-link>
                </div>
            </div>
        </div>
        <div class="agov"><a href="http://www.beian.miit.gov.cn/" class="BeiAn">Copyright © 2020 网站备案号： 赣公网安备 36080302000116号</a></div>
    </div>
</template>
<script>
export default {
  methods: {
    pushLogin () {
      this.$router.push('/Login')
    }
  }
}
</script>
<style lang="less" scoped>
    .Welcome_container {
        width: 100vw;
        height: 100vh;
        background-image: url('../assets/img/background.jpg');
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        .card {
            width: 550px;
            height: 320px;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, .3);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
                display: none;
            }
            .slide {
                position: absolute;
                bottom: 20px;
                width: 100%;
                text-align: center;
                label {
                    display: inline-block;
                    width: 50px;
                    height: 10px;
                    background-color: #d9d9d9;
                    border-radius: 10px;
                    margin: 0 3px;
                    position: relative;
                    z-index: 2;
                }
                label::before {
                    content: "";
                    width: -100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: rgba(0, 0, 0, .3);
                    border-radius: 10px;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform .6s;
                }
            }
            .content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                margin: 10px;
                position: absolute;
                .pic {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 180px;
                    height: 180px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
                    overflow: hidden;
                    margin-right: 15px;
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .text {
                    width: 300px;
                    text-align: center;
                    .tit {
                        font-weight: bold;
                    }
                    .info {
                        display: -webkit-box;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        margin-bottom: 30px;
                    }
                    .btn {
                        border: 0;
                        outline: 0;
                        padding: 10px 15px;
                        border-radius: 50px;
                        letter-spacing: 1px;
                        font-size: 14px;
                        color: #fff;
                        font-weight: 600;
                        cursor: pointer;
                        background-color: black;
                        float: right;
                    }
                    .btn:hover {
                        background-color: #cecece;
                        color: black;
                    }
                }
            }
        }
        .agov {
            position: absolute;
            bottom: 0;
            font-size: 10px;
            a {
                text-decoration: none;
                color: #ffffff;
            }
        }
    }
    .pic img,.text {
        opacity: 0;
        transition: .6s;
    }
    #slide_1:checked~.slide .slide_btn_1::before,
    #slide_2:checked~.slide .slide_btn_2::before,
    #slide_3:checked~.slide .slide_btn_3::before,
    #slide_4:checked~.slide .slide_btn_4::before {
        width: 100%;
        transform: scaleX(1);
    }
    #slide_1:checked~.content .img_1,
    #slide_2:checked~.content .img_2,
    #slide_3:checked~.content .img_3,
    #slide_4:checked~.content .img_4 {
        opacity: 1;
        transition-delay: .2s;
    }
    #slide_1:checked~.content .text_1,
    #slide_2:checked~.content .text_2,
    #slide_3:checked~.content .text_3,
    #slide_4:checked~.content .text_4 {
        opacity: 1;
        margin-left: 0;
        z-index: 100;
        transition-delay: .3s;
    }
    @media screen and (max-width:860px) {
        .Welcome_container{
            .card {
                width: 90%;
                height: 90vh;
                // height: auto;
                .content {
                    width: 100%;
                    .pic {
                        width: 100%;
                        height: 80px;
                        margin: 0;
                        box-shadow: none;
                        img {
                            width: 80px;
                            height: 80px;
                        }
                    }
                    .text{
                        margin-top: 20px;
                        padding: 20px;
                        width: 100%;
                        margin-bottom: 35px;
                    }
                }
            }
        }
    }
</style>
