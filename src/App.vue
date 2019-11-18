<template>
  <div id="app">
    <Header></Header>
    <div class="wrapper">
      <div id="main" class="clearfix">
        <router-view name="main" class="left"></router-view>
        <router-view name="sidebar" class="right"></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
.wrapper{
  background-color: #e1e1e1;
}
.wrapper #main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px;
}
.wrapper #main .left{
  float: left;
}
.wrapper #main .right{
  float: right;
}
</style>
