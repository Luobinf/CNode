# cnode

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Cnode Community项目基本结构分析

- Header 头部
- Footer 底部
- TopicLists 主题页
- Article 文章详情页
- UserInfo 用户个人信息页
- SideBar 侧边栏
- AuthorSideBar 作者侧边栏
- Pagination 分页

## Header
Header组件用于展示CNode社区的logo等内容

## TopicLists
TopicLists组件：以下数据的获取如没有特殊说明，全部是get的方式获取的。使用CNode社区提供的API来获取主题首页的数据，https://cnodejs.org/api/v1/topics 使用该API就可以获取到数据了，下列对接收参数做一些说明：
- page： Number类型 页数
- tab： String类型 主题分类。目前有 ask share job good
- limit： Number类型 每一页的主题数量

本项目使用axios来获取数据，下面举一个例子说明。
```javascript
    axios.get(`https://cnodejs.org/api/v1/topics`,{
    	params：{
    		page: 1,
    		tab: 'ask',
    		limit:40
    }
    }).then((response) => {
    	//这里获取数据
    }).catch((error) => {
    	//这里处理错误
    })
```
上例的意思是获取主题分类为ask问答，第一页，且数量为40条的数据

TopicLists组件主要展示了主题作者、点击量、评论量、文章标题、发表时间等内容
- 
对 https://cnodejs.org/api/v1/topics获取的数据做一些分析 ，分析数据，随便找到类似下面这样的一个对象进行分析
[![MrXckT.md.png](https://s2.ax1x.com/2019/11/17/MrXckT.md.png)](https://imgchr.com/i/MrXckT)


```
    {
      "id": "5dce6751ece3813ad9ba8a6a",  //文章的ID
      "author_id": "5dce6680865a9844a30223a9", //作者的ID
      "tab": "share", //用于文章的分类
      "content": "<div class=\"markdown-text\"><p><img src=\"//static.cnodejs.org/FtFL-8IksY83un3gCry6Bgnrgdpr\" alt=\"WechatIMG1.jpeg\">\n<img src=\"//static.cnodejs.org/FsT1Sh0lsuf5dTQYG3y-GX_hhq6L\" alt=\"WechatIMG2.jpeg\">\n<img src=\"//static.cnodejs.org/Fn2LDVx8CAmVIM3mv-5J4tHBzJhS\" alt=\"WechatIMG3.jpeg\">\n<img src=\"//static.cnodejs.org/FoCfZlXgw6GQaZkREiXEssVcIart\" alt=\"bizhi_code.png\"></p>\n</div>", //文章的具体内容，使用markdown语法
      "title": "QQ壁纸小程序。", //文章标题
      "last_reply_at": "2019-11-15T09:04:13.084Z", //作者最后回复时间
      "good": false, //判断文章是否是精华帖
      "top": false, //判断文章是否是置顶帖
      "reply_count": 1, //回复数量
      "visit_count": 205,//访问数量
      "create_at": "2019-11-15T08:52:33.273Z", //文章被创建的时间
      "author": {
    	"loginname": "kucy", //作者登录名
    	"avatar_url": "https://avatars3.githubusercontent.com/u/13210798?v=4&s=120" //作者头像链接
      }
    }
```


**本项目包括本组件使用了Vue的filter(过滤器),过滤器是来做一些文本的格式处理的，例如上述中last_reply_at字段得到的数据是"2019-11-15T09:04:13.084Z" ，而我们要将他处理成例如“几小时前”这样的结果，就需要用到Vue的过滤器了**

## Article

Article文章详情页，主要用于展示文章的具体内容。其中包括文章标题、发布日期、正文、评论等内容

使用 https://cnodejs.org/api/v1/topic/ + 帖子ID来获取数据

使用跳转链接连接到文章详情页，即Vue中的router-link，使用router-link从TopicLists组件跳转到Article

例如在TopicLists组件中:
```
<router-link
		class="list_title"
		:to="{
		name: `article_content`,
		params:{
		  id: list.id,
		  name: list.author.loginname
		}
	  }"
	  >
  {{list.title}}
</router-link>
```
需要将具体某一篇的文章id传入进去，传入作者登陆名字是为了后续UserInfo组件获取作者的个人信息需要使用到的

## UserInfo
UserInfo组件与Article组件类似，也是通过router-link进行跳转的
使用的API为 https://cnodejs.org/api/v1/user/ + username

## AuthorSideBar
AuthorSideBar为与作者一些相关的信息，包括用户的个人信息、最近创建的话题、最近参与的话题等。

在这里你会发现当你点击侧边栏的文章时，路由进行了跳转但是页面却不会发生变化，这是为什么呢？

提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
```
watch: {
	'$route'(to,from) {
		// 对路由变化作出响应...
	}
}
```

## Pagination
Pagination组件用于主题页中的数据分页。
