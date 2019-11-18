<template>
  <div class="pagination">
    <button @click="changePage">首页</button>
    <button @click="changePage">上一页</button>
    <button v-if="isShow">...</button>
    <button
      v-for="(item,index) in buttons"
      :key="index"
      :class="[{active:currentPage === item}]"
      @click="changePage(item)"
    >{{item}}</button>
    <button @click="changePage">下一页</button>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: `Pagination`,
  data() {
    return {
      buttons: [1, 2, 3, 4, 5, "..."],
      currentPage: 1,
      isShow: false
    };
  },
  methods: {
    changePage(page) {
      // 当事件处理函数不传参数时，第一个参数默认为事件对象
      if (typeof page !== "number") {
        switch (page.target.innerText) {
          case "首页":
            this.buttons = [1, 2, 3, 4, 5, "..."];
            this.changePage(1);
            break;
          case "上一页":
            $("button.active").prev().click();
            console.log(123);
            break;
          case "下一页":
            $("button.active").next().click();
            break;
          default:
            break;
        }
        return;
      }

      if (page >= 5) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.currentPage = page;
      let selectdPageBig = this.buttons[this.buttons.length - 2];
      let selectdPageSmall = this.buttons[0];
      if (page === selectdPageBig) {
        this.buttons.shift();
        this.buttons.splice(this.buttons.length - 1, 0, page + 1);
      } else if (page === selectdPageSmall && page !== 1) {
        this.buttons.unshift(page - 1); //添加数字按钮
        this.buttons.splice(this.buttons.length - 2, 1); //删除最后一个数字按钮
      }

      this.$emit('getPageNumber',this.currentPage);
    }
  }
};
</script>

<style scoped>
ul,
li {
  list-style: none;
}
.pagination {
  display: flex;
  padding: 10px;
}

.pagination button {
  outline: none;
  width: 50px;
  height: 28px;
  margin: 0 4px;
  background-color: white;
  font-size: 14px;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  transition: all 0.3s;
}

.pagination button:hover {
  background-color: black;
  color: white;
}

.pagination button.active {
  background-color: black;
  color: white;
}

.pagination button:first-child {
  margin-left: 0;
}

.pagination button:last-child {
  margin-right: 0;
}
</style>