<template>
  <div class="sideBar" v-if="isLoading">
      <!-- 用户头像部分 -->
    <div class="panel user_card">
      <div class="header">
        <h5>个人信息</h5>
      </div>
      <div class="inner">
        <ul>
          <li class="user_big_avatar">
            <img :src="authorData.avatar_url" alt />
            <span class="author_loginname">{{authorData.loginname}}</span>
          </li>
          <li class="score_wrapper">
            <span class="score">积分: {{authorData.score}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 广告部分 -->
    <div class="panel advertise">
      <div class="inner">
        <a href="https://www.qiniu.com">
          <img src="../assets/advertiseQiniu.png" alt="" class="qiniu">
        </a>
        <div class="empty"></div>
        <a href="https://www.aliyun.com">
          <img src="../assets/advertiseAlinode.png" alt="" class="aliyun">
        </a>
        <div class="empty"></div>
        <a href="https://www.ucloud.cn">
          <img src="../assets/advertiseUcloud.png" alt="" class="ucloud">
        </a>
      </div>
    </div>
    <!-- 最近参与话题部分 -->
    <div class="panel recent_topics">
      <div class="header">
        <h5>作者最近创建的话题</h5>
      </div>
      <div class="inner" v-if="recentFiveTopics.length">
        <ul>
          <li v-for="(item,index) in recentFiveTopics" :key="index">
              <!-- 点击可以跳转到具体的文章详情页面 -->
              <router-link :to="{
                  name: `article_content`,
                  params: {
                      id: item.id,
                      name:  item.author.loginname
                  }
                }">
                  {{item.title}}
              </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 最近回复部分 -->
    <div class="panel recent_replies">
      <div class="header">
        <h5>作者最近参与的话题</h5>
      </div>
      <div class="inner" v-if="recentFiveReplies.length">
        <ul>
            <li v-for="(item,index) in recentFiveReplies" :key="index">
                <!-- 点击可以跳转到具体的文章详情页面 -->
              <router-link :to="{
                  name: `article_content`,
                  params: {
                      id: item.id,
                      name:  item.author.loginname
                  }
                }">
                  {{item.title}}
              </router-link>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: `AuthorSideBar`,
    data(){
        return {
            authorData:{},
            recentFiveTopics: [],
            recentFiveReplies: [],
            isLoading: false
        }
    },
    methods: {
        getData() {
            axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then((response) => {
                  this.isLoading = true
                    this.authorData = response.data.data
                    this.recentFiveTopics = response.data.data.recent_topics.slice(0,5)
                    this.recentFiveReplies = response.data.data.recent_replies.slice(0,5)
                }).catch((error) => {
                    console.log(error)
                })
        }
    },
    mounted() {
      this.getData()
    },
    watch: {
        '$route' (to,from) {
            this.getData()
        }
    }
}
</script>

<style scoped>
.panel{
  /* border: 1px solid red; */
  background-color: white;
  margin-bottom: 15px;
  border-radius: 4px;
}
.panel .inner{
  width: 270px;
  padding: 10px;
  font-size: 14px;
  color: #778087;
}
.panel .header{
  background-color: #f6f6f6;
}
.panel .header h5,.panel .header h5,.panel .header h5{
  font-size: 14px;
  color: #333;
  padding: 12px 0 12px 10px;
  font-weight: 400;
}
.panel .inner a,.panel .inner a{
  display: block;
  padding: 8px 0;
  color: #778087;
}

/* 用户个人信息部分 */
.panel .inner .user_big_avatar img{
  width: 40px;
  vertical-align: top;
}
.panel .inner .user_big_avatar .author_loginname{
  padding: 0 10px;
}
.panel .inner .score_wrapper{
  color: #333;
  padding: 10px 0;
}

/* 广告部分 */
.advertise .inner a{
  padding: 0;
}
.advertise .inner a img{
  width: 270px;
  vertical-align: top;
}
.advertise .inner .empty{
  height: 10px;
}
</style>