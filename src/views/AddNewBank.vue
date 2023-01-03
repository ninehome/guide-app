

<template>
  <div class="address-edit-box" >

    <s-header :name="`${type == 'add' ? '添加收款賬戶' : '編輯收款賬戶'}`"></s-header>

    <van-form @submit="onSubmit">

      <van-field v-model="telphone" name="telphone" label="銀行名" placeholder="請輸入電話號碼"
                 :rules="[{ required: true, message: '請輸入銀行名' }]" />
      <van-field v-model="address" name="address" label="銀行賬戶號" placeholder="請輸入銀行賬戶號"
                 :rules="[{ required: true, message: '請輸入銀行賬戶號' }]" />
      <van-field v-model="username" name="username" label="姓名" placeholder="請輸入姓名"
                 :rules="[{ required: true, message: '請輸入姓名' }]" />


      <div style="margin: 16px; margin-top: 100px;">
        <van-button round block type="info" color="#1baeae" native-type="submit"  >確認提交</van-button>
      </div>

    </van-form>
    <div style="margin: 16px; margin-top: 50px;">
      <van-button round block type="info" color="#1baeae" @click="onDelete" v-show="bnt_delet">刪除</van-button>
    </div>


  </div>
</template>

<script>
import { Toast } from 'vant'
import sHeader from '@/components/SimpleHeader'
import {addAddress, EditAddress, DeleteBank,  getBankDetail} from '../service/bank'
import { tdist } from '@/common/js/utils'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      type: 'add',
      addressId: '',
      addressInfo: {},
      // from: ''
      username: '',
      telphone: '',
      address: '',
      bnt_delet:false

    }
  },
  async mounted() {
    //http://localhost:8080/#/address-edit?type=edit&addressId=5&from=mine
    const { addressId, type, from } = this.$route.query   //获取地址后面的参数
    // this.addressId = addressId
    this.type = type
    this.from = from || ''

    this.addressId  = addressId

    //编辑地址
    if (type == 'edit') {
      const { data: addressDetail } = await getBankDetail(addressId)

      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.bankName,
        province: addressDetail.provinceName,
        addressDetail: addressDetail.bankNumber,
        isDefault: !!addressDetail.defaultFlag

      }

      //數據回顯
      this.username = this.addressInfo.name
      this.telphone = this.addressInfo.tel
      this.address  =this.addressInfo.addressDetail
      this.bnt_delet =true  //显示删除按钮
      // this.addressId = this.addressInfo.id
    }
  },

  methods: {

    //新增 或者 修改 银行账户
    async   onSubmit(content) {

      const params = {
        userName: content.username,
        bankName: content.telphone,
        BankNumber: content.address,
        // defaultFlag: 1,
      }
      if (this.type == 'edit') {
        params['addressId'] = this.addressId
      }


      const { resultCode } =  this.type == 'add' ?await addAddress(params) :await EditAddress(params)
      // Toast('保存成功')

      if (resultCode === 200) {
        Toast('Success')
      } else {
        Toast('Fail')
      }


      setTimeout(() => {
      this.$router.push({ path: 'bank' })
      }, 600)


    },

     async onDelete() {


       const { resultCode} = await DeleteBank(this.addressId)

       if (resultCode === 200) {
         Toast('Success')
       } else {
         Toast('Fail')
       }

       setTimeout(() => {
         this.$router.push({ path: 'bank' })
       }, 300)
     }
  }
}
</script>

<style lang="less">
@import '../common/style/mixin';

.address-edit-box {
  margin-top: 44px;

  .van-address-edit {
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }

    .van-switch--on {
      background: @primary;
    }
  }
}
</style>
