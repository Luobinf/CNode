<template>
  <div class="sideBar">
    <div class="panel login">
      <div class="inner">
        <h4>CNode：Node.js专业中文社区</h4>
        <p>
          您可以<a href="#">登录</a>或<a href="#">注册</a>,也可以
        </p>
        <button>
          <a href="#">通过 GitHub 登录</a>
        </button>
      </div>
    </div>
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
    <div class="panel topic">
      <div class="header">
        <h5>无人回复的话题</h5>
      </div>
      <div class="inner">
        <ul>
          <li>
            <a href="">
              libuv之文件监听---fs-poll.c
            </a>
          </li>
          <li>
            <a href="">
              啊啊啊啊啊啊啊啊啊啊啊啊啊
            </a>
          </li>
          <li>
            <a href="">
              asdfaskdjfaljfla
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel score">
      <div class="header">
        <h5>积分榜</h5>
      </div>
      <div class="inner">
        <ul>
          <li>
            <a href="">
              libuv之文件监听---fs-poll.c
            </a>
          </li>
          <li>
            <a href="">
              啊啊啊啊啊啊啊啊啊啊啊啊啊
            </a>
          </li>
          <li>
            <a href="">
              asdfaskdjfaljfla
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel community">
      <div class="header">
        <h5>友情社区</h5>
      </div>
      <div class="inner">
        <a href="https://ruby-china.org">
          <img src="../assets/ruby-china.png" alt="" class="qiniu">
        </a>
        <div class="empty"></div>
        <a href="http://golangtc.com">
          <img src="../assets/golang.png" alt="" class="aliyun">
        </a>
        <div class="empty"></div>
        <a href="http://phphub.org">
          <img src="../assets/phphub.png" alt="" class="ucloud">
        </a>
        <div class="empty"></div>
        <a href="https://testerhome.com">
          <img src="../assets/TesterHome.png" alt="" class="ucloud">
        </a>
      </div>
    </div>
    <div class="panel QrCode">
      <div class="header">
        <h5>客户端二维码</h5>
      </div>
      <div class="inner">
        <ul>
          <li>
            <img src="../assets/QrCode.png" alt="">
          </li>
          <li>
            <a href="#">客户端源码地址</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `SideBar`
};
</script>

<style scoped>
.panel{
  /* border: 1px solid red; */
  background-color: white;
  margin-bottom: 15px;
  border-radius: 4px;
}
.inner{
  width: 270px;
  padding: 10px;
}
/* 登录部分 */
.login .inner h4{
  font-size: 14px;
  color: #333;
  font-weight: 400;
  padding: 6px 0 14px 0;
}
.login .inner p{
  font-size: 13px;
  padding: 6px 0;
}
.login .inner p a{
  color: #778087;
  margin: 0 6px;
}
.login .inner button{
  background-color: #5bc0de;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
}
.login button a{
  color: white;
  font-size: 14px;
}
/* 广告部分 */
.advertise .inner a{
  display: block;
}
.advertise .inner a img{
  width: 270px;
  vertical-align: top;
}
.advertise .inner .empty{
  height: 10px;
}
/* 话题部分 */
.topic .header,.score .header,.community .header,.QrCode .header{
  background-color: #f6f6f6;
}
.topic .header h5,.score .header h5,.community .header h5,.QrCode .header h5{
  font-size: 14px;
  color: #333;
  padding: 12px 0 12px 10px;
  font-weight: 400;
}
.topic .inner a,.score .inner a,.community .inner a,.QrCode .inner a{
  display: block;
  padding: 8px 0;
  color: #778087;
  font-size: 14px;
}
.community .inner img{
  width: 150px;
  vertical-align: top;
}
/* 二维码部分 */
.QrCode .inner li{
  text-align: center;
}
.QrCode .inner li img{
  width: 200px;
  vertical-align: top;
}
</style>