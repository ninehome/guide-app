

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
  <div>

    <nav-bar></nav-bar>
    <div class="good">
<!--      顶部边距-->
      <header class="good-header">推薦</header>

      <div class="good-box">
        <div class="good-item" v-for="item in newGoodses" :key="item.goodsId" @click="goToDetail(item)">
<!--          <lazy-component>-->
<!--            <img :src="prefix(item.goodsCoverImg)" alt="" v-lazy="img">-->
<!--          </lazy-component>-->

          <van-image
            lazy-load
            :src="prefix(item.goodsCoverImg)"
          />

          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">{{formatNum(item.sellingPrice) }} {{symbol}} </div>
          </div>
        </div>
      </div>

<!-- 底部边距-->
      <header class="good-header">...</header>
    </div>



  </div>
</template>

<script>
import navBar from '@/components/NavBar'
import {getHome, getList} from '../service/home'
import { getUserInfo } from '../service/user'
import { getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import {formatNum} from '../service/number'
export default {
  name: 'home',
  data() {
    return {
      formatNum:formatNum,
      headerScroll: true,
      hots: [],
      newGoodses: [],
      recommends: [],
      symbol:''
    }
  },
  components: {
    navBar,  //底部导航
  },
  async mounted() {
    this.symbol = this.$store.state.Symbols
    Toast.loading({
      message: 'Данные запроса...',
      forbidClick: true
    });

    const params = {
      pageNumber: 1,
      pageSize: 88
    }
    const { data } = await getList(params)
    this.newGoodses = data.list


    Toast.clear()
  },
  methods: {
    pageScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
    },
    goToDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` })
    },
    serach() {
      this.$router.push({ path: `./product-list?from=home` })


    }

  }
}
</script>

<style lang="less" scoped >
@import '../common/style/mixin';

.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 10px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;

  .nbmenu2 {
    color: @primary;
  }

  &.active {
    background: @primary;

    .nbmenu2 {
      color: #fff;
    }

    .login {
      color: #fff;
    }
  }

  .header-search {
    display: flex;
    .wh(75%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, .7);
    border-radius: 20px;

    .app-name {
      padding: 0 10px;
      color: @primary;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px solid #666;
    }

    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }

    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }

  .icon-iconyonghu {
    color: #fff;
    font-size: 22px;
  }

  .login {
    color: @primary;
    line-height: 52px;

    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}

.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;

  div {
    display: flex;
    flex-direction: column;
    width: 25%;
    text-align: center;

    img {
      .wh(40px, 40px);
      margin: 13px auto 8px auto;
    }
  }
}

.good {

  .good-header {
    background: rgba(249, 249, 249, 0.89);
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }

  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 50px;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1PX solid #e9e9e9;
      padding: 10px 10px;

      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }

      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;

        .title {
          color: #222333;
        }

        .price {
          color: @primary;
        }
      }

      &:nth-child(2n + 1) {
        border-right: 1PX solid #e9e9e9;
      }
    }
  }
}

.floor-list {
  width: 100%;
  padding-bottom: 50px;

  .floor-head {
    width: 100%;
    height: 40px;
    background: #F6F6F6;
  }

  .floor-content {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    .boxSizing();

    .floor-category {
      width: 50%;
      padding: 10px;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      .boxSizing();

      &:nth-child(2n) {
        border-right: none;
      }

      p {
        font-size: 17px;
        color: #333;

        &:nth-child(2) {
          padding: 5px 0;
          font-size: 13px;
          color: @primary;
        }
      }

      .floor-products {
        .fj();
        width: 100%;

        img {
          .wh(65px, 65px);
        }
      }
    }
  }
}
</style>































<!--&lt;!&ndash;-->
<!-- 分类-->
<!--&ndash;&gt;-->

<!--<template>-->
<!--  <div class="categray">-->
<!--    <div>-->
<!--      <header class="category-header wrap">-->
<!--        <i></i>-->
<!--        <div class="header-search">-->
<!--          <i class="nbicon nbSearch"></i>-->
<!--          <router-link tag="span" class="search-title" to="./product-list?from=category">Нажмите для поиска товаров</router-link>-->
<!--        </div>-->
<!--        <i class="iconfont icon-More"></i>-->
<!--      </header>-->
<!--      <nav-bar></nav-bar>-->
<!--      <div class="search-wrap" ref="searchWrap">-->
<!--        <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">-->
<!--          <ul class="nav-side">-->
<!--            <li v-for="item in categoryData" :key="item.categoryId" v-text="item.categoryName"-->
<!--              :class="{ 'active': currentIndex == item.categoryId }" @click="selectMenu(item.categoryId)"></li>-->
<!--          </ul>-->
<!--        </list-scroll>-->
<!--        <div class="search-content">-->
<!--          <list-scroll :scroll-data="categoryData">-->
<!--            <div class="swiper-container">-->
<!--              <div class="swiper-wrapper">-->
<!--                <template v-for="(category, index) in categoryData">-->
<!--                  <div class="swiper-slide" v-if="currentIndex == category.categoryId" :key="index">-->
<!--                    &lt;!&ndash; <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> &ndash;&gt;-->
<!--                    <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS"-->
<!--                      :key="index">-->
<!--                      <p class="catogory-title">{{ products.categoryName }}</p>-->
<!--                      <div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index"-->
<!--                        @click="selectProduct(product)">-->
<!--                        <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img" />-->
<!--                        <p v-text="product.categoryName" class="product-title"></p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </template>-->
<!--              </div>-->
<!--            </div>-->
<!--          </list-scroll>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import navBar from '@/components/NavBar'-->
<!--import listScroll from '@/components/ListScroll'-->
<!--import { getCategory } from "../service/good";-->
<!--export default {-->
<!--  components: {-->
<!--    navBar,-->
<!--    listScroll-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      categoryData: [],-->
<!--      currentIndex: 15-->
<!--    }-->
<!--  },-->
<!--  async mounted() {-->
<!--    this.setWrapHeight()-->
<!--    const { data } = await getCategory()-->
<!--    this.categoryData = data-->
<!--  },-->
<!--  methods: {-->
<!--    // goHome() {-->
<!--    //   this.$router.push({ path: 'home' })-->
<!--    // },-->
<!--    setWrapHeight() {-->
<!--      // 设置视口高度-->
<!--      let $screenHeight = document.documentElement.clientHeight-->
<!--      this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'-->
<!--    },-->
<!--    selectMenu(index) {-->
<!--      this.currentIndex = index-->
<!--    },-->
<!--    selectProduct(item) {-->
<!--      this.$router.push({ path: `product-list?categoryId=${item.categoryId}` })-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style lang="less" scoped>-->
<!--@import '../common/style/mixin';-->

<!--.categray {-->
<!--  .category-header {-->
<!--    background: #fff;-->
<!--    position: fixed;-->
<!--    left: 0;-->
<!--    top: 0;-->
<!--    .fj();-->
<!--    .wh(100%, 50px);-->
<!--    line-height: 50px;-->
<!--    padding: 0 15px;-->
<!--    box-sizing: border-box;-->
<!--    font-size: 15px;-->
<!--    color: #656771;-->
<!--    z-index: 10000;-->

<!--    &.active {-->
<!--      background: @primary;-->
<!--    }-->

<!--    .icon-left {-->
<!--      font-size: 25px;-->
<!--      font-weight: bold;-->
<!--    }-->

<!--    .header-search {-->
<!--      display: flex;-->
<!--      width: 80%;-->
<!--      height: 20px;-->
<!--      line-height: 20px;-->
<!--      margin: 10px 0;-->
<!--      padding: 5px 0;-->
<!--      color: #232326;-->
<!--      background: #F7F7F7;-->
<!--      border-radius: 20px;-->

<!--      .nbSearch {-->
<!--        padding: 0 10px 0 20px;-->
<!--        font-size: 17px;-->
<!--      }-->

<!--      .search-title {-->
<!--        font-size: 12px;-->
<!--        color: #666;-->
<!--      }-->
<!--    }-->

<!--    .icon-More {-->
<!--      font-size: 20px;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.search-wrap {-->
<!--  .fj();-->
<!--  width: 100%;-->
<!--  margin-top: 50px;-->
<!--  background: #F8F8F8;-->
<!--  border-top: 1px solid #999;-->

<!--  .nav-side-wrapper {-->
<!--    width: 28%;-->
<!--    height: 100%;-->
<!--    overflow: hidden;-->

<!--    .nav-side {-->
<!--      width: 100%;-->
<!--      .boxSizing();-->
<!--      background: #F8F8F8;-->

<!--      li {-->
<!--        width: 100%;-->
<!--        height: 56px;-->
<!--        text-align: center;-->
<!--        line-height: 56px;-->
<!--        font-size: 14px;-->

<!--        &.active {-->
<!--          color: @primary;-->
<!--          background: #fff;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .search-content {-->
<!--    width: 72%;-->
<!--    height: 100%;-->
<!--    padding: 0 10px;-->
<!--    background: #fff;-->
<!--    .boxSizing();-->

<!--    .swiper-container {-->
<!--      width: 100%;-->

<!--      .swiper-slide {-->
<!--        width: 100%;-->

<!--        .category-main-img {-->
<!--          width: 100%;-->
<!--        }-->

<!--        .category-list {-->
<!--          display: flex;-->
<!--          flex-wrap: wrap;-->
<!--          flex-shrink: 0;-->
<!--          width: 100%;-->

<!--          .catogory-title {-->
<!--            width: 100%;-->
<!--            font-size: 17px;-->
<!--            font-weight: 500;-->
<!--            padding: 20px 0;-->
<!--          }-->

<!--          .product-item {-->
<!--            width: 33.3333%;-->
<!--            margin-bottom: 10px;-->
<!--            text-align: center;-->
<!--            font-size: 15px;-->

<!--            .product-img {-->
<!--              .wh(30px, 30px);-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.fade-out-enter-active,-->
<!--.fade-out-leave-active {-->
<!--  // transition: opacity 0.5s;-->
<!--}-->

<!--.fade-out-enter,-->
<!--.fade-out-leave-to {-->
<!--  // opacity: 0;-->
<!--}-->
<!--</style>-->
