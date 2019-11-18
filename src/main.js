// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'github-markdown-css'
Vue.config.productionTip = false

// 在全局中注册过滤器，这样在所有组件中都可以使用
Vue.filter(`formatDate`,function(val) {
  let last_replay_time = new Date(val)
  let newTime = new Date()
  let differenceTime = newTime.getTime() - last_replay_time.getTime()     //得到的是毫秒数
  if (differenceTime < 0) {
    return ''
  } else if ((differenceTime / 1000 < 30)) {
    return '刚刚'
  } else if (differenceTime / 1000 < 60) {
    return parseInt((differenceTime / 1000)) + '秒前'
  } else if ((differenceTime / 60000) < 60) {
    return parseInt((differenceTime / 60000)) + '分钟前'
  } else if ((differenceTime / 3600000) < 24) {
    return parseInt(differenceTime / 3600000) + '小时前'
  } else if ((differenceTime / 86400000) < 31) {
    return parseInt(differenceTime / 86400000) + '天前'
  } else if ((differenceTime / 2592000000) < 12) {
    return parseInt(differenceTime / 2592000000) + '个月前'
  } else {
    return parseInt(differenceTime / 31536000000) + '年前'
  }
})

// 下面过滤函数用于帖子的分类
Vue.filter(`sortedTopic`,function (value) {
  if(value.top === true) {
    return `置顶`
  } else if(value.good === true) {
    return `精华`
  } else if(value.tab === `share`) {
    return `分享`
  } else if(value.tab === `ask`) {
    return `问答`
  } else {
    return `招聘`
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
