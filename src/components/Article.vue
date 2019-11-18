<template>
  <section class="section">
    <!-- 添加动画 -->
    <div class="loading" v-if="isLoading">
          <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
    </div>
    <div id="content" class="clearfix" v-else>
      <div class="panel">
        <!-- 头部导航栏 -->
        <div class="header">
            <h3>{{articlesData.title}}</h3>
            <p>
               发布于<span class="separate">{{articlesData.create_at | formatDate}}</span>作者<router-link :to="{
                 name: `user_info`,
                 params: {
                   name: articlesData.author.loginname
                 }
               }" class="separate author">{{articlesData.author.loginname}}</router-link><span class="separate">{{articlesData.visit_count}}</span>次浏览<span class="separate">来自</span><span>{{articlesData | sortedTopic}}</span>
            </p>
        </div>
        <!-- 单篇文章详情部分使用markdown语法 -->
        <div class="inner-content markdown-body" v-html="articlesData.content">
    
        </div>
      </div>
      <!-- 回复部分 -->
      <div class="panel">
        <div class="reply_header">
          <span>回复</span>
        </div>
        <div class="reply_area">
          <ul>
            <li v-for="(item,index) in articlesData.replies" :key="index">
              <!-- 回复时的个人信息 -->
              <div class="about_author clearfix">
                <a href="#">
                  <img :src="item.author.avatar_url" alt="">
                </a>
                <div class="author_loginname">
                  {{item.author.loginname}}
                </div>
                <div class="floor">
                 <span>{{index+1}}楼 </span><span>{{item.create_at | formatDate}}</span>
                </div>
                <div class="admire">
                 <span v-if="item.ups.length"><span>👍 </span><span>{{item.ups.length}}</span></span>
                 <span v-else></span>
                </div>
              </div>
              <!-- 回复的具体内容 -->
              <div class="about_reply">
                <p class="markdown-body" v-html="item.content"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: `Article`,
  data() {
    return {
      articlesData: null,
      isLoading: true
    }
  },
  methods: {
    getData() {
      axios
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(response => {
          this.articlesData = response.data.data;
          this.isLoading = false;
           
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    '$route' (to,from) {
      this.getData()
    }
  }
};
</script>

<style scoped>
 /* @import url('../assets/markdown-github.css'); */
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
/* 左浮动 */
.section {
  background-color: #e1e1e1;
}
.section #content .panel {
  width: 1095px;
  background-color: white;
}
.section #content .panel:last-child{
  margin-top: 15px;
}
/* 处理markdown语法 */
.section #content .panel .markdown-body{
  box-sizing: border-box;
  max-width: 1095px;
  padding: 0 20px 20px 20px;
  margin: 0 auto;
}
.section #content .panel .header{
  padding: 15px 20px 0 20px;
  border-bottom: 1px solid rgb(229, 229, 229);
}
.section #content .panel .header h3{
  font-size: 22px;
  font-weight: 700;
  color: #333;
}
.section #content .panel .header p{
  font-size: 12px;
  color: #838383;
  padding: 10px 0;
}
.section #content .panel .header p .separate{
  padding: 0 4px;
}
.section #content .panel .header p .author{
  color: skyblue;
  font-size: 12px;
}
.section #content .panel .header p .author:hover{
  text-decoration: underline;
}
/* 回复部分内容 */
.section #content .panel .reply_header{
  background-color: #f6f6f6;
  font-size: 14px;
  padding: 10px 20px;
}
.section #content .panel .reply_area ul li{
  border-bottom: 1px solid #f0f0f0;
}
.section #content .panel .reply_area ul li{
  padding: 10px 10px 0 10px;
}
/* 关于作者部分 */
.section #content .panel .reply_area .about_author{
  color: #666;
  font-size: 12px;
}
/* 头像 */
.section #content .panel .reply_area .about_author a{
  float: left;
}
.section #content .panel .reply_area .about_author img{
  width: 30px;
  border-radius: 3px;
  vertical-align: top;
}
.section #content .panel .reply_area .about_author .author_loginname{
  float: left;
  padding: 0 10px;
  font-weight: 600;
}
.section #content .panel .reply_area .about_author .floor{
  float: left;
  color: #08c;
}
.section #content .panel .reply_area .about_author .admire{
  float: right;
  font-size: 15px;
}
/* */
.section #content .panel .reply_area .about_reply p{
  padding: 0 0 0 50px;
  font-size: 15px;
}

/* 动画animation部分 */
.loading {
  text-align: center;
  padding-top: 300px;
}
.loader {
  position: absolute;
  top: 30%;
  left: 25%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
}
.dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>