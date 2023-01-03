
<template>
  <div class="about">
    <s-header :name="'關於Shopee'"></s-header>
    <div class="about-body">
      <van-divider class="van" :style="{  fontSize: '20px', fontWeight: 500 }">Shopee
      </van-divider>
      <div  >
        Shopee是領航跨境電商平台，覆蓋新加坡、馬來西亞、菲律賓、泰國、越南、巴西、墨西哥、哥倫比亞、智利、波蘭等十餘個市場，同時在中國深圳、上海和香港設立跨境業務辦公室。 2021 年 Shopee總訂單量達61億，同比增長116.5%。
        根據權威移動數據分析平台 data.ai，2022年第二季度，Shopee榮登谷歌應用商店用戶使用總時長第一及平均月活數第二，囊括東南亞、台灣及巴西市場購物類App平均月活數、用戶使用總時長第一。
        同時，Shopee品牌影響力廣泛，入榜YouGov 2022全球最佳品牌榜第五，為前十強中僅有的電商品牌。
        Shopee用一定的算法從海量SKU當中挑出更符合消費者期待商品。 80%的賣家的存在只是為了襯托出另外那20%的成功，而這80%還在不斷更替。
        在競爭日益激烈的電商貿易中，中小店鋪需要生存的唯一選擇就是提高店舖的購買，搜索，流量等等數據，提升自然排名和自然流量獲取。
        我們致力於服務中小電商，幫助中小電商提升線上搜索排名，提高銷售記錄，從而提高店舖的自然搜索量。讓一個店鋪可以通過自身的曝光率不斷帶來新的流量。
        在幫助店鋪提升交易量和曝光率的同時，我們也獲得相應的報酬，這是一種多贏的合作模式。</div>

      <div>

      </div>
    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
export default {
  components: {
    sHeader
  },
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.about {
  box-sizing: border-box;
  padding: 20px;

  .about-body {
    margin-top: 44px;
    font-size: 16px;

    a {
      color: @primary;
    }
    .van{
      color: @primary;
    }
  }
}
</style>
