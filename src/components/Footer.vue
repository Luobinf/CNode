<template>
  <footer class="footer">
    <div class="footerInner">
      <div class="footerContent">
        <div class="links">
          <a href="https://cnodejs.org/rss">RSS</a>
          <span class="seperator">|</span>
          <a href="https://github.com/cnodejs/nodeclub/">源码地址</a>
        </div>
        <p class="slogan">CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
        <p class="advertisement">
          服务器赞助商为
          <a href="https://www.ucloud.cn">
            <img src="../assets/ucloud.jpg" alt id="ucloud" />
          </a>
          ,存储赞助商为
          <a href="https://www.qiniu.com">
            <img src="../assets/qiniu.jpg" alt id="qiniu" />
          </a>
          ,由
          <a href="https://www.aliyun.com">
            <img src="../assets/alinode.jpg" alt id="alinode" />
          </a>
          提供应用性能服务
        </p>
        <p>
          新手搭建 Node.js 服务器，推荐使用无需备案的
          <a href="https://www.digitalocean.com">DigitalOcean(https://www.digitalocean.com/)</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: `Footer`
};
</script>

<style scoped>
.footer {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #e1e1e1;
}
.footer .footerInner {
  max-width: 1400px;
  /* border: 1px solid red; */
  margin: 0 auto;
  padding: 20px 0;
}
.footerInner .footerContent {
    /* border: 1px solid red; */
    font-size: 13px;
}
.footerInner .footerContent .links{
    padding: 4px 0;
}
.footerInner .footerContent .slogan{
    font-size: 14px;
    color: #ababab;
    padding: 4px 0 12px 0;
}
.footerInner .footerContent .links a,.footerInner .footerContent .links .seperator{
    color: #666666;
}
.footerInner .footerContent img {
  vertical-align: bottom;
}
.footerInner .footerContent .advertisement{
  vertical-align: bottom;
  color: #ababab;
}
.footerInner .footerContent p:last-child{
  color: #ababab;
  padding: 9px 0;
}
.footerInner .footerContent p:last-child a{
  color: #52bbed;
}
.footerInner .footerContent #ucloud {
  width: 92px;
}
.footerInner .footerContent #qiniu {
  width: 115px;
}
.footerInner .footerContent #alinode {
  width: 166px;
}
</style>