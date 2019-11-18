import Vue from 'vue'
import Router from 'vue-router'
import TopicLists from '../components/TopicLists'
import Article from '../components/Article'
import SideBar from '../components/SideBar'
import UserInfo from '../components/UserInfo'
import AuthorSideBar from '../components/AuthorSideBar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: `root`,
      components: {
        main: TopicLists,
        sidebar: SideBar
      }
    },
    {
      // 这里传入作者名字的目的是为了当进入文章详情页时，侧边栏的用户个人信息可以被渲染
      path: '/topic/:id&:name',
      name: `article_content`,
      components: {
        main: Article,
        sidebar: AuthorSideBar
      }
    },
    // 用户个人详情部分
    {
      path: '/userinfo/:name',
      name: `user_info`,
      components: {
        main: UserInfo,
        sidebar: AuthorSideBar
      }
    }
  ]
})

