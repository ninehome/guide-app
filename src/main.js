/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import Vue from "vue";
import md5 from "js-md5";
import App from "./App.vue";
import router from "./router";

import { prefix } from "@/common/js/utils";
import { Lazyload } from 'vant';



import {
  Divider,
  Popup,
  Overlay,
  Loading,
  Dialog,
  ContactCard,
  Form,
  AddressEdit,
  AddressList,
  Field,
  CellGroup,
  Cell,
  SwipeCell,
  Icon,
  Stepper,
  Card,
  Checkbox,
  CheckboxGroup,
  Button,
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  SubmitBar,
  Toast,
  ActionSheet, Image
} from "vant";
import "lib-flexible/flexible";

Vue.use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(SubmitBar)
  .use(Checkbox)
  .use(ActionSheet)
  .use(Image)
  .use(CheckboxGroup);
Vue.config.productionTip = false;

//vant 懒加载
Vue.use(Lazyload, {
  lazyComponent: true,
});

// Vue.use(VueLazyLoad,{
//   error:'./static/error.png',   //图片加载失败显示的图片
//   loading:'./static/loading.gif'// 图片加载中显示的图片
// })
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$md5 = md5;
Vue.prototype.prefix = prefix;



Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
