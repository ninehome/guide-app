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
  <div class="order-detail-box">
    <s-header :name="'訂單詳情'" @callback="close"></s-header>
    <div class="order-status">
      <div class="status-item">
        <label>訂單狀態 ：</label>
        <span  style="margin-bottom: 10px"    :style={color:bindcolor}      >{{ detail.orderStatusString }}</span>
      </div>
      <div class="status-item">
        <label>訂單號 ：</label>
        <span>{{ detail.orderNo }}</span>
      </div>
      <div class="status-item">
        <label>訂單時間 ：</label>
        <span>{{ detail.createTime }}</span>
      </div>
      <van-button v-if="[1, 2, 3].includes(detail.orderStatus)" style="margin-bottom: 10px"  :style={color:bindcolor} block
        @click="handleConfirmOrder(detail.orderNo)">確認回購</van-button>
      <van-button v-if="detail.orderStatus == 0" style="margin-bottom: 10px"  :style={color:bindcolor} block
        @click="showPayFn(detail.orderNo)">繼續支付</van-button>
      <!-- <van-button v-if="!(detail.orderStatus < 0 || detail.orderStatus == 4)" block
        @click="cancelOrder(detail.orderNo)">取消订单</van-button> -->
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>數量 ：</label>
        <span :style={color:bindcolor}> {{ formatNum(detail.totalPrice) }} {{symbol}}</span>
      </div>
      <div class="price-item">
        <label>物流方式：</label>
        <span>DHL Express</span>
      </div>
    </div>

    <van-card v-for="item in detail.newBeeMallOrderItemVOS" :key="item.goodsId" style="background: #fff"
      :num="item.goodsCount"  desc="免費送貨" :title="item.goodsName"
      :thumb="prefix(item.goodsCoverImg)" >

      <template #footer>
        <span :style={color:bindcolor}>{{ formatNum(item.sellingPrice) }} {{symbol}} </span>
      </template>

   </van-card>



  </div>
</template>

<script>
import sHeader from '@/components/HeaderDetaily'
import { getOrderDetail, cancelOrder, confirmOrder, payOrder } from '../service/order'
import { Dialog, Toast } from 'vant'
import {formatNum} from '../service/number'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      formatNum:formatNum,
      detail: {},
      showPay: false,
      symbol:'',
      bindcolor:"#ff7337",
    }
  },
  mounted() {
    this.init()
    this.symbol = this.$store.state.Symbols
  },
  methods: {
    async init() {
      Toast.loading({
        message: 'Загрузка...',
        forbidClick: true
      });
      const { id } = this.$route.query
      const { data } = await getOrderDetail(id)
      this.detail = data
      Toast.clear()
    },
    cancelOrder(id) {
      Dialog.confirm({
        title: 'Подтвердить отмену заказов？',
      }).then(() => {
        cancelOrder(id).then(res => {
          if (res.resultCode == 200) {
            Toast('Удалено успешно')
            this.init()
          }
        })
      }).catch(() => {
        // on cancel
      });
    },
    handleConfirmOrder(id) {
      Dialog.confirm({
        title: 'Подтверждать ли выкуп？',
        confirmButtonText:"Подтверждение",
        cancelButtonText:"Аннулирование"

      }).then(() => {
        confirmOrder(id).then(res => {
          if (res.resultCode == 200) {
            Toast('Успех')
            this.init()
          }
        })
      }).catch(() => {
        // on cancel
      });
    },
    async showPayFn(id) {
      // console.log(id)
      Toast.loading
      const { data, resultCode } = await payOrder({ orderNo: id, payType: 2 })

      if (resultCode == 200) {
        // console.log('++++++++++++++++++++++')
        this.showPay = false
        // this.init()
        Toast('SUCCESS')
        this.$router.push({ path: 'order' })
      }



    },
    async payOrder(id, type) {
      Toast.loading
      await payOrder({ orderNo: id, payType: type })
      this.showPay = false
      // this.init()
    },
    close() {
      Dialog.close()
    }
  }
}
</script>

<style lang="less" scoped>
.order-detail-box {
  background: #f7f7f7;

  .order-status {
    background: #fff;
    margin-top: 44px;
    padding: 20px;
    font-size: 15px;

    .status-item {
      margin-bottom: 10px;

      label {
        color: #999;
      }

      span {}
    }
  }

  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 15px;

    .price-item {
      margin-bottom: 10px;

      label {
        color: #999;
      }

      span {}
    }
  }

  .van-card {
    margin-top: 0;
  }

  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
