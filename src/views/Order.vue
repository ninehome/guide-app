

<template>
  <div >
    <div>
      <header class="simple-header">
        <img style=";height: 30px" :src="this.imglogo">
        <div class="simple-header-name"></div>
        <img style="width:30px ;height: 30px" :src="this.seriveLogo">
      </header>
    </div>

    <swiper :list="swiperList"></swiper>

    <van-tabs @change="onChangeTab"    :color="'#ee4d2d'" :title-active-color="'#ff7337'" class="order-tab">
      <van-tab title="WEB推荐" name='0'></van-tab>
      <van-tab title="APP推荐" name="1"></van-tab>
      <van-tab title="VPN工具" name="2"></van-tab>
      <van-tab title="男男资源" name="3"></van-tab>
      <van-tab title="Twitter名人" name="4"></van-tab>
      <van-tab title="Tumblr名人" name="5"></van-tab>
      <van-tab title="Instagram名人" name="6"></van-tab>
    </van-tabs>
    

      <van-list>
        <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.redirectUrl)">
          <div class="card-item">
            <van-image class="img_card" :src="item.goodsCoverImg"  alt="" @click="goTo(item.redirectUrl)" radius ="5px"/>
            <div class="img-right-txt">
              <span style="color: #232326">{{ item.goodsName }}</span>
              <span>{{ item.goodDsc }}</span>
            </div>
          </div>


        </div>

      </van-list>





  </div>
</template>

<script>
import axios from "axios";

import swiper from '@/components/Swiper'
export default {
  data() {
    return {

      loading: false,
      finished: false,
      refreshing: false,
      list:[],
      imglogo:require("../assets/left_logo.png"),
      seriveLogo:require("../assets/service.png"),
      list0: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],




      list1: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],



      list2: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner2.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner2.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner2.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner2.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],

      list3: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner3.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner3.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner3.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner3.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],

      list4: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],

      list5: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],
      list6: [
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 1,
          "orderNo": "1",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"


        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 2,
          "orderNo": "2",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 3,
          "orderNo": "3",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        },
        {

          "goodsId": 1,
          "goodsName": "我是标题",
          "goodsCoverImg": require("../assets/img/banner1.jpg"),
          "orderId": 4,
          "orderNo": "4",
          "goodDsc": "我是副标题",
          "redirectUrl":"https://google.com"

        }
      ],


      swiperList: [],
      page: 1,
      symbol:''
    }
  },
  components: {
    swiper, //列表
  },
  async mounted() {
    // this.onLoad()
    this.onChangeTab("0","")
    // this.getListData()
  },
  methods: {

     // getListData(){
     //   axios.get('/tab1.json').then(data =>{
     //     for (let v of data.data) {
     //          v.goodsCoverImg = require(v.goodsCoverImg)
     //       this.list.push(v)
     //     }
     //
     //      console.log(this.list)
     //     // this.list = data.data
     //   }).catch(error =>{
     //      console.log(error)
     //   })
     // },

    goTo(url) {
      window.open(url)
    },


    onChangeTab(name, title) {
      this.list = []
      this.list.push(this.list0)


      switch(name)
      {
        case "0":
          this.list = this.list0
          break;
        case "1":
          this.list = this.list1
          break;
        case "2":
          this.list = this.list2
          break;
        case "3":
          this.list = this.list3
          break;
        case "4":
          this.list = this.list4
          break;
        case "5":
          this.list = this.list5
          break;
        case "6":
          this.list = this.list6
          break;
      }


    },

  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

  .simple-header {
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #333333;
    background: #333333;

    //.simple-header-name {
    //  font-size: 14px;
    //}
  }


  .order-item-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 120px;
    background-color: #fbfbfb;

    .card-item{
      display: flex;
      align-items: center;
      height: 80px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 2px;
      margin-right: 15px;
      margin-left: 15px;
      .img_card{
        margin-left: 10px;
        width: 60px;
        height: 60px;
        border-radius: 3px;
      }
      .img-right-txt{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
      }
    }

  }


  //.order-header {
  //  position: fixed;
  //  top: 0;
  //  left: 0;
  //  z-index: 10000;
  //  .fj();
  //  .wh(100%, 44px);
  //  line-height: 44px;
  //  padding: 0 10px;
  //  .boxSizing();
  //  color: #252525;
  //  background: #fff;
  //  border-bottom: 1px solid #dcdcdc;
  //  .order-name {
  //    font-size: 14px;
  //  }
  //}

  //.order-tab {
  //
  //  left: 0;
  //  z-index: 1000;
  //  width: 100%;
  //}



</style>
