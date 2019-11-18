<template>
  <header class="navbar">
      <div class="navbar-inner">
          <div class="container clearfix">
              <router-link :to="{name: `root`}" class="brand">
                  <img src="../assets/cnodejs_light.svg" alt="">
              </router-link>
              <form class="search">
                  <i class="iconfont icon-sousuo"></i>
                  <input type="text">
              </form>
              <ul class="nav">
                  <li>
                      <a href="#">首页</a>
                  </li>
                  <li>
                      <a href="#">新手入门</a>
                  </li>
                  <li>
                      <a href="#">API</a>
                  </li>
                  <li>
                      <a href="#">关于</a>
                  </li>
                  <li>
                      <a href="#">注册</a>
                  </li>
                  <li>
                      <a href="#">登录</a>
                  </li>
              </ul>
          </div>
      </div>
  </header>
</template>

<script>
export default {
    name: `Header`
}
</script>

<style>
/* 引入字体图标样式 */
@import url(../icons/icons.css);
*{
    margin: 0;
    padding: 0;
}
ul,li{
    list-style: none;
}
a{
    text-decoration: none;
}
.clearfix::after{
    content: '';
    display: block;
    clear: both;
}
.navbar {
    background-color: #444444;
}
.navbar-inner{
    max-width: 1714.5px;
    margin: 0 auto;
    padding: 5px;
    /* border: 1px solid red; */
}
.navbar-inner .container{
    width: 1400px;
    margin: 0 auto;
    /* border: 1px solid red; */
}
.container .brand{
    float: left;
    height: 34px;
    padding: 3px 20px 3px 0;
}
.container .brand img {
    width: 120px;
    /* line-height: 34px;
    vertical-align: middle; */
}
.container .search{
    float: left;
    position: relative;
    margin: 7px 0;
}

.container .search .icon-sousuo{
    position: absolute;
    left: 4px;
    top: 5px;
    color: #585958;
}
.container .search input{
    border: none;
    outline: none;
    width: 206px;
    height: 20px;
    padding: 3px 5px 3px 22px;
    display: block;
    background-color: #888888;
    border-radius: 20px; 
}
.container .search input:hover{
background-color: white;
}
.container .search input:focus{
background-color: white;
}
.container .nav{
    float: right;
}
.container .nav li{
    display: inline-block;
}
.container .nav li a{
    display: inline-block;
    padding: 9.5px 14px;
    font-size: 14px;
    color: #cccccc;
}
.container .nav li a:hover{
    color: white;
}
</style>