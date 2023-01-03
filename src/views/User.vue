<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="user-box">
    <!-- <s-header :name="'我的'"></s-header> -->
    <div class="header_title">個人中心</div>
    <div class="user-info">
      <div class="info">
        <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png" />
        <div class="user-desc">
          <span>賬戶：{{ user.loginName }}</span>
          <span>餘額：{{ user.userMoney }} {{symbol}}</span>
          <span>等級: VIP{{ user.userLevel }}</span>
          <!-- <span class="name">个性签名：{{ user.introduceSign }}</span> -->
        </div>
      </div>
    </div>
    <ul class="user-list">
<!--      <li @click="goTo('recharge')">-->
<!--        <span>聯繫客服</span>-->
<!--        <van-icon name="arrow" />-->
<!--      </li>-->
      <li @click="goTo('order')">
        <span>我的訂單</span>
        <van-icon name="arrow" />
      </li>

      <li @click="goTo('withdrawal')">
        <span>提現</span>
        <van-icon name="arrow" />
      </li>

      <li @click="goTo('bank')">
        <span>管理提現賬戶</span>
        <van-icon name="arrow" />
      </li>


      <!-- <li @click="goTo('setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li> -->
      <li @click="goTo('address?from=mine')">
        <span>收貨地址管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('about')">
        <span>關於我們</span>
        <van-icon name="arrow" />
      </li>


      <li @click="goTo('recharge')">
        <span>聯繫我們</span>
        <van-icon name="arrow" />
      </li>

      <van-button class="save-btn" color="#ff7337" type="primary" @click="logout" block>退出登錄</van-button>

    </ul>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import navBar from '@/components/NavBar'
import sHeader from '@/components/SimpleHeader'
import { getUserInfo, EditUserInfo, logout } from '../service/user'  //需要注册网络请求的方法
import { setLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import {getBankList} from "@/service/withdrawl";
export default {
  components: {
    navBar,
    // sHeader
  },
  data() {
    return {
      nickName: '',
      introduceSign: '',
      password: '',
      bankcard: false,
      symbol:'',
      user: {
        loginName:'',
        userMoney:0,
        userLevel:0
      }
    }
  },
  async mounted() {
    // console.log("我的token" )
    // console.log(localStorage.getItem("token") )
    this.symbol = this.$store.state.Symbols
    const { data } = await getUserInfo()
    this.user = data
    await this.initBanks()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goTo(r) {
      this.$router.push({ path: r })
      if (r === 'withdrawal'){ //先判断 如果没有卡 需要跳转添加卡页面
        if ( this.bankcard){
        this.$router.push({ path: r })
        }else {
          this.$router.push({path: `add-bank?type=add&from=mine`})
        }
      }else {

      this.$router.push({ path: r })
      }

    },
    linkDownload(url) {
      window.open(url, '_blank') // 新窗口打开外链接
    },
    async logout() {
      const { resultCode } = await logout()
      if (resultCode == 200) {
        setLocal('token', '')
        window.location.href = '/'
      }
    },

    async initBanks(){
      const { data,resultCode } = await  getBankList({ pageNumber: 1 })

      if (resultCode === 200){
        if(data.size === 0){
          this.bankcard  = false
        }else {
          this.bankcard  = true
        }

      }

    },
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.user-box {
  .header_title {

    text-align: center;

    // z-index: 10000;
    // .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    font-size: 14px;
  }



  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary_start,@primary);
    box-shadow: 0 2px 5px @primary;
    border-radius: 6px;
    margin-top: 10px;

    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();

      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }

      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        line-height: 20px;
        font-size: 16px;
        color: #fff;

        span {
          color: #fff;
          font-size: 16px;
          padding: 2px 0;
        }
      }

      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;

        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }

  .user-list {
    padding: 0 20px;
    margin-top: 20px;

    .save-btn {
      width: 70%;
      margin: 40px auto;
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
