<template>
  <div class="userInfoWrapper">
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
    <div v-else class="allSectionsWrapper">
      <div class="section">
        <div class="header">
          <router-link to="/" class="mainPage">主页</router-link>
        </div>
        <div class="innerContent">
          <ul class="main_page_content">
            <li class="user_big_avatar">
              <img :src="userData.avatar_url" alt />
              <span class="author_loginname">{{userData.loginname}}</span>
            </li>
            <li class="score_wrapper">
              <span class="score">{{userData.score}} 积分</span>
            </li>
            <li class="register_time">注册时间 {{userData.create_at | formatDate}}</li>
          </ul>
        </div>
      </div>
      <!-- 最近创建的话题部分 -->
      <div class="section">
        <div class="header recent_topics">最近创建的话题</div>
        <div class="innerContent">
          <ul class="recent_topics_main_content">
            <li v-for="(item,index) in userData.recent_topics" :key="index">
              <div class="cell clearfix">
                <a href="#" class="small_avatar">
                  <img :src="userData.avatar_url" alt />
                </a>
                <router-link
                  :to="{
                  name: `article_content`,
                  params: {
                      id: item.id,
                      name: item.author.loginname
                  }
                }"
                  class="topic_title"
                >{{item.title}}</router-link>
                <div class="last_reply">{{item.last_reply_at | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 最近参与的话题部分：这一部分与前面创建的话题部分几乎一模一样-->
      <div class="section">
        <div class="header recent_topics">最近参与的话题</div>
        <div class="innerContent">
          <ul class="recent_topics_main_content">
            <li v-for="(item,index) in userData.recent_replies" :key="index">
              <div class="cell clearfix">
                <a href="#" class="small_avatar">
                  <img :src="item.author.avatar_url" alt />
                </a>
                <router-link
                  :to="{name: `article_content`,params:{id:item.id,name:item.author.loginname}}"
                  class="topic_title"
                >{{item.title}}</router-link>
                <div class="last_reply">{{item.last_reply_at | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: `UserInfo`,
  data() {
    return {
      userData: {},
      authorName: this.$route.params.name,
      isLoading: true
    };
  },
  methods: {
    getData() {
      axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(response => {
          this.isLoading = false;
          this.userData = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.userInfoWrapper {
  width: 1095px;
}
.userInfoWrapper .section {
  max-width: 1095px;
  background-color: white;
  color: #778087;
  font-size: 14px;
  margin-top: 15px;
}
.userInfoWrapper .section:first-child {
  margin-top: 0;
}
.userInfoWrapper .section .header {
  padding: 12px 10px;
  background-color: #f6f6f6;
  border-bottom: 1px solid rgb(229, 229, 229);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.userInfoWrapper .section .header .mainPage {
  display: block;
  color: #80bd01;
}
.userInfoWrapper .section .header .mainPage:hover {
  text-decoration: underline;
}
.userInfoWrapper .section .innerContent .main_page_content li {
  padding: 10px;
}
.userInfoWrapper
  .section
  .innerContent
  .main_page_content
  .user_big_avatar
  img {
  width: 40px;
  vertical-align: top;
}
.userInfoWrapper
  .section
  .innerContent
  .main_page_content
  .user_big_avatar
  .author_loginname {
  padding: 0 10px;
}
.userInfoWrapper .section .innerContent .main_page_content .score_wrapper {
  color: #333;
}

/* 最近创建的话题部分和最近参与的话题部分 */
.userInfoWrapper .section .header.recent_topics {
  color: #333;
}
/* .userInfoWrapper .section .innerContent .recent_topics_main_content li{
    padding: 8px 10px;
} */
.userInfoWrapper .section .innerContent .recent_topics_main_content a {
  display: inline-block;
}
.userInfoWrapper .section .innerContent .recent_topics_main_content .cell {
  height: 34px;
  line-height: 34px;
  padding: 8px 10px;
  border-bottom: 1px solid rgb(229, 229, 229);
}
.userInfoWrapper
  .section
  .innerContent
  .recent_topics_main_content
  .small_avatar
  img {
  width: 30px;
  vertical-align: middle;
}
.userInfoWrapper
  .section
  .innerContent
  .recent_topics_main_content
  .topic_title {
  color: #0088cc;
  font-size: 14px;
  padding-left: 8px;
}
.userInfoWrapper
  .section
  .innerContent
  .recent_topics_main_content
  .topic_title:hover {
  text-decoration: underline;
}
.userInfoWrapper
  .section
  .innerContent
  .recent_topics_main_content
  .last_reply {
  float: right;
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
  width: 30px;
  height: 30px;
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