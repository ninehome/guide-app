<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
<template>
  <div class="about">
    <s-header :name="'聯繫客服'"></s-header>

    <div class="about-body">請選擇一個方式與客服取得聯繫</div>



    <ul class="user-list">
      <li @click="linkDownload(1)"  v-show = "tgShow">
        <van-image
          class="logo"
          fit="contain"
          :src="require('../../static-files/icon_telegram.png')"
        />
        <a class="a-style">Telegram</a>
        <van-icon name="arrow" />
      </li>

      <li @click="linkDownload(2)"  v-show = "wsShow">
        <van-image
          class="logo"
          fit="contain"
          :src="require('../../static-files/icon_whatsapp.png')"
        />

        <a class="a-style">WhatApp</a>
        <van-icon name="arrow" />
      </li>

      <li @click="linkDownload(3)"  v-show = "vbShow">
        <van-image
          class="logo"
          fit="contain"
          :src="require('../../static-files/viber.png')"
        />

        <a class="a-style">Viber</a>
        <van-icon name="arrow" />
      </li>

    </ul>



  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { Image } from 'vant';
import {getChatList} from "@/service/withdrawl";

export default {

  data() {
    return {
      tg :"https://t.me/nine183183",
      ws :"https://t.me/nine183183",
      vb :"https://t.me/nine183183",
      tgShow :false,
      wsShow:false,
      vbShow:false
    }
  },
  async mounted() {
    //请求数据

    const { data } = await getChatList()

    for (var v of data) {
      this.TgInit(v)
    }



  },
  components: {
    sHeader,

  },
  methods: {

    linkDownload(type) {
      if (type ===1){
        window.open(this.tg, '_blank') // 新窗口打开外链接
      }else  if (type ===2){
        window.open(this.ws, '_blank') // 新窗口打开外链接
      }else if (type === 3) {
        window.open(this.vb, '_blank') // 新窗口打开外链接

      }

    },



    TgInit(v){
      if (v.Type === 1){
        this.tg = v.ChatValue
        this.tgShow = true
      }else if (v.Type === 2){
        this.ws = v.ChatValue
        this.wsShow = true
      }else if (v.Type === 3){
        this.vb = v.ChatValue
        this.vbShow = true
      }

    },




  }

}
</script>

<style lang="less" scoped>
.about {
  box-sizing: border-box;
  padding: 10px;

  .about-body {
    margin-top: 68px;
    font-size: 13px;
    color: #e03b3b;
  }

  .user-list {
    padding: 0 10px;
    margin-top: 40px;
    .logo{
      margin-top: 8px;
      height: 30px;
      width: 30px;
    }

    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>
