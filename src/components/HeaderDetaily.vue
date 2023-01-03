

<template>
  <header class="simple-header">
    <i class="nbicon nbfanhui" @click="goBack"></i>
    <div class="simple-header-name">{{ name }}</div>
<!--    <i @click="goCopyUrl">-->
<!--      <van-icon name="ellipsis" />-->
<!--    </i>-->
    <van-image
      class="logo"
      @click="goCopyUrl"
      fit="contain"
      :src="require('../../static-files/link.png')"
    />

  </header>
</template>

<script>
import { Toast } from 'vant'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      if (!this.back) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.back })
      }
      this.$emit('callback')
    },
    goCopyUrl() {
      var oInput = document.createElement("input"); //创建隐形input
      oInput.value = window.location.href; // window.location.href 浏览器URL
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.remove();
      Toast.success('Successful Replication')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .fj();
  .wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  .boxSizing();
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;

  .simple-header-name {
    font-size: 14px;
  }

  .logo{
    margin-top: 11px;
    height: 20px;
    width: 20px;
  }
}
</style>
