<template>
  <div class="section">
    <!-- 动画animation -->
    <div v-if="isLoading" class="loadWrapper">
      <div class="load">
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    </div>
    <div id="content" class="clearfix" v-else>
      <div class="panel">
        <!-- 头部导航栏部分 -->
        <div class="header" v-if="isHeaderLoading">
          <ul>
            <li>
              <a href="#" :class="{active:currentActive === ''}" @click.prevent="getAllTopics">全部</a>
            </li>
            <li>
              <a
                href="#"
                :class="{active:currentActive === 'good'}"
                @click.prevent="getGoodTopics"
              >精华</a>
            </li>
            <li>
              <a
                href="#"
                :class="{active:currentActive === 'share'}"
                @click.prevent="getShareTopics"
              >分享</a>
            </li>
            <li>
              <a href="#" :class="{active:currentActive === 'ask'}" @click.prevent="getAskTopics">问答</a>
            </li>
            <li>
              <a href="#" :class="{active:currentActive === 'job'}" @click.prevent="getJobTopics">招聘</a>
            </li>
            <!-- <li>
              <a href="#">客户端测试</a>
            </li>-->
          </ul>
        </div>
        <!-- 主题列表内容部分 -->
        <div class="inner-content">
          <ul class="topic_lists">
            <li v-for="(list,index) in topicListsData" :key="index" class="cell_wrapper">
              <div class="cell clearfix">
                <!-- 这里点击用户头像可以跳转到用户个人详情页 -->
                <router-link :to="{name: `user_info`,params:{name: list.author.loginname}}">
                  <img :src="list.author.avatar_url" alt />
                </router-link>
                <div class="reply_wrapper">
                  <span class="reply_count">{{list.reply_count}}</span>
                  <span class="seperator">/</span>
                  <span class="visit_count">{{list.visit_count}}</span>
                </div>
                <div class="sortedTopicWrapper">
                  <span
                    class="sortedTopic"
                    :class="{active: list.top===true || list.good === true}"
                  >{{list | sortedTopic}}</span>
                </div>
                <div class="listTitleWrapper">
                  <!--  这里是连接，当点击链接时跳转到文章详情页,动态参数传入name的目的是为了，让侧边栏可以获取到 -->
                  <!--对应作者名字的个人信息。  -->
                  <router-link
                    class="list_title"
                    :to="{
                    name: `article_content`,
                    params:{
                      id: list.id,
                      name: list.author.loginname
                    }
                  }"
                  >{{list.title}}</router-link>
                </div>
                <div class="last-replay-wrapper">
                  <span class="last_reply_at">{{list.last_reply_at | formatDate}}</span>
                </div>
              </div>
            </li>
            <!-- 分页组件 -->
            <li>
              <Pagination @getPageNumber="renderList"></Pagination>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "./Pagination";
export default {
  name: `TopicLists`,
  data() {
    return {
      topicListsData: null,
      listPage: 1,
      sortedTopic: "",
      currentActive: "",
      isLoading: true,
      isHeaderLoading: false
    };
  },
  components: {
    Pagination
  },
  methods: {
    getData() {
      axios
        .get(`https://cnodejs.org/api/v1/topics`, {
          params: {
            page: this.listPage,
            limit: 40,
            tab: this.sortedTopic
          }
        })
        .then(response => {
          this.isLoading = false;
          this.isHeaderLoading = true;
          this.topicListsData = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    renderList(value) {
      this.listPage = value;
      this.getData();
    },
    getAllTopics() {
      this.currentActive = "";
      this.sortedTopic = "";
      this.getData();
    },
    getGoodTopics() {
      this.currentActive = "good";
      this.sortedTopic = "good";
      this.getData();
    },
    getShareTopics() {
      this.currentActive = "share";
      this.sortedTopic = "share";
      this.getData();
    },
    getAskTopics() {
      this.currentActive = "ask";
      this.sortedTopic = "ask";
      this.getData();
    },
    getJobTopics() {
      this.currentActive = "job";
      this.sortedTopic = "job";
      this.getData();
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

.section #content .panel {
  width: 1095px;
  background-color: white;
}

.header {
  background-color: #f6f6f6;
}
.header ul {
  padding: 8px 0;
  margin: 0 15px;
}
.header ul li {
  display: inline-block;
  margin: 0 5px;
}
.header ul li a {
  display: inline-block;
  font-size: 14px;
  color: #80bd01;
  padding: 3px 6px;
}
.header ul li a.active {
  background-color: #80bd01;
  color: white;
}
.inner-content .topic_lists {
  /* border: 1px solid white; */
  border-top: none;
}
.inner-content .topic_lists .cell_wrapper {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
  transition: all 0.5s;
}
.inner-content .topic_lists .cell_wrapper:hover {
  background-color: #f6f6f6;
}
.inner-content .topic_lists .cell_wrapper .cell {
  /* display: flex;
  align-items: center; */
  height: 30px;
  line-height: 30px;
}
.inner-content .topic_lists .cell_wrapper .cell a {
  display: block;
  float: left;
}
.inner-content .topic_lists .cell_wrapper .cell a img {
  width: 30px;
  vertical-align: top;
}
.inner-content .topic_lists .cell_wrapper .cell .reply_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  width: 70px;
}
.inner-content .topic_lists .cell_wrapper .cell .reply_wrapper .reply_count {
  font-size: 14px;
  color: #9e78c0;
}

.inner-content .topic_lists .cell_wrapper .cell .reply_wrapper .seperator {
  font-size: 14px;
  color: #abbde9;
}
.inner-content .topic_lists .cell_wrapper .cell .reply_wrapper .visit_count {
  font-size: 12px;
  color: #b4b4c5;
}
.inner-content .topic_lists .cell_wrapper .cell .sortedTopicWrapper {
  float: left;
}
.inner-content
  .topic_lists
  .cell_wrapper
  .cell
  .sortedTopicWrapper
  .sortedTopic {
  font-size: 12px;
  color: #b4b4c5;
  background-color: #e5e5e5;
  border-radius: 3px;
  padding: 0 4px;
}
.inner-content
  .topic_lists
  .cell_wrapper
  .cell
  .sortedTopicWrapper
  .sortedTopic.active {
  color: #ffffff;
  background-color: #80bd01;
}
.inner-content .topic_lists .cell_wrapper .cell .listTitleWrapper {
  float: left;
  margin: 0 4px;
}
.inner-content .topic_lists .cell_wrapper .cell .listTitleWrapper .list_title {
  font-size: 14px;
  color: #888888;
}
.inner-content
  .topic_lists
  .cell_wrapper
  .cell
  .listTitleWrapper
  .list_title:hover {
  text-decoration: underline;
}
.inner-content .topic_lists .cell_wrapper .cell .last-replay-wrapper {
  float: right;
}
.inner-content
  .topic_lists
  .cell_wrapper
  .cell
  .last-replay-wrapper
  .last_reply_at {
  font-size: 12px;
  color: #888888;
}

/* 动画animation部分 */
.loadWrapper {
  width: 1095px;
  padding: 250px 0;
  position: relative;
}
.load {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
}
.load hr {
  border: 0;
  margin: 0;
  width: 40%;
  height: 40%;
  position: absolute;
  border-radius: 50%;
  animation: spin 2s ease infinite;
}

.load :first-child {
  background: #19a68c;
  animation-delay: -1.5s;
}
.load :nth-child(2) {
  background: #f63d3a;
  animation-delay: -1s;
}
.load :nth-child(3) {
  background: #fda543;
  animation-delay: -0.5s;
}
.load :last-child {
  background: #193b48;
}

@keyframes spin {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
</style>