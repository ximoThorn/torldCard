<template>
  <div id="pageIndex">
    <div class="banner">
      <a href="https://services.torld.com/xinhuodong/wnf_lgo1/index.html"><img src="static/images/index_banner.jpg"></a>
    </div>
    <div class="per_wrap">
      <div class="per_center">
        <ul class="center_ul">
          <li class="center_top">
            <div class="center_logo"><img src="static/images/logo_03.png"></div>
            <a @click="recharOrregister()" class="recharge">充值</a>
          </li>
          <li class="center_mid">
            <div class="balance">
              <router-link :to="{path: 'Percenter'}">
                  <span class="rmb_logo"><img src="static/images/renminbi.png"></span>
                  <span class="balance_num">{{GET_BALANCE}}</span> 
                  <img src="static/images/arrow.png">
              </router-link>
                           
            </div>
          </li>
          <li class="center_bot">
            <p class="explain">广告过后，尽享折上折</p>
          </li>
        </ul>
      </div>
    </div>
    <!--热门卡券 -->
    <div class="card_list">
      <div class="card_list_text">
        <img src="static/images/fire.png">
        <span>热门卡券</span>
      </div>
        <indexHotGoods :hotCardList="GETINDEXHOTCARD" :MAINIMG="GETDOMAINIMG"></indexHotGoods>
      <p class="forward">更多商户敬请期待</p>
    </div>
    <div class="cardBag">
      <a href="https://services.torld.com/CardVol/myCardVol.html#!/?" style="display: block;width: 100%">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAHR0lEQVR4Xu2djXXbNhSF7QmaThBlgjYTVJmgzQRxJ2g6QZ0Jkk5Qe4I4E1SZoMkElSdoOoF7rw7og7CU9AQ8Cj+8OIfHjoOfh3s/gBApkJcXSotW4HLRvVfnLwTAwiEQAAJg4QosvPuaAQTAwhVYePc1AwiAhSuw8O5rBkgE4OHhYYWiTy8vLz8mVlFFMQFwgg0w/Qdk/ykcBCBOd/jHHYC4PaHK4lkFwAELYPj3+O/B9LXRrU/I9xIgbI35i2YTAJH8YVr/EX+i2TyeJLrzBeWetwDBogEIhnOED4aPp/VE/3fFNgDgRU4F5yi7KABgOEd0bDin+DnTC0CwmbOB3Lq7ByBauHGU5xh+j/Jc6NFQjm5O87sUZpKbAFfsyS3yXeWaNGf57gAIC7f4PJ6qHw3fmR0M3x6qKMwuzPNNlO8LAPg2NYBzlGsegGilzhHOI3Xh9u/IcK7mT0qI5R0K/BIXAgBVa1x1cFPqOy/ceBFnN63Dp5MNH8eH2K7xt98EwEnj5nDmaOHGCzAc4auM6j9Hhm8y6pksKgCcFIWQ8Tk8Z+FGw2n07ogXbk6hflWNAEhUNazUObqHI7Gmi5MWbqmN7CsnAIyKzrRw43X4rTGEWbIJgD2yhvP4MK3zXJ66UmcLH6IpPXvh5kmCABipGYx/iz/nmM6V+nAOd1+4CQBPBaK6YD4/Dr1OGO1nXbh5dl8zANQMo/59WNBZ9I0XbjyPP15itRSuKc/iAQjm/wlTDn10G664DRdgii7cPAFaNABHzB9upNx4XHHzNM2zrqUDwJG/nhD0d5jOtUD3abEAoOM0mKv9car+frgnlYsEINyc+Wtitf8zRv6Np8C117VUAGjyq5E5b2D+de2Gece3OADCwu/v0ejnKn/V8se5VDCWCMAVxPpjJNivMJ9fjHhM4dp//E2ZVI1rL0c9eMRpnRj0/TnubWR9IQTGjqf/3egPM0J87T9RAxWDArzfQZ35/UL3i2S5AGwQGL9lO6QtfmGQOffw5fq0AtT1HSB44ylQLgAPnsGoLpMCHHTceeQyGwgAk+bVZeJpgddYsiGYGwCuCXjNn6cGkqtkV2CNrCscvJU+tYDmjbOX9uqmc84JAM9VPGdlU5rbyZbLh4/avNL61beNQ5+yL7bNBUB2YC2bNkfsAOEK9Y4/cm8xwJ7ltDcHANVvh8oRrGTZiY/dDIcLQp5mk9IcADw7xwWMpN42Xijcd+GV1zhlDThvAD7DfF0DmBE0QMBPAN9FTXyE5uvUJr0B+IBguGpVmkkBAMDpnldZh5S1AdUbgEXeBZzJ68lqvW84CYBzuufQlgBwELHlKgRAy+45xC4AHERsuQoB0LJ7DrELAAcRW65CALTsnkPsAsBBxJarEAAtu+cQuwBwELHlKgRAy+45xC4AHERsuQoB0LJ7DrELAAcRW65CALTsnkPsAsBBxJarEAAtu+cQuwBwELHlKgRAy+45xC4AHEQsWUXY4MGXSgzfnt7i9xscfJjW0V1UAqCke5lt79nYMdRq2vApADJNKFV8yriJWI6+ak4AlHIws10Yx+nd8pgcvnBy71PQBUCmESWKwzSe7/koPUs6uLdCAFgkrCwPTFsjJD5J1ZIEgEWllvIAgBXiHW/q3NeFg1vrNQO05HwUK4zb4J/xA7WmenL0GYsCoF0ALOuA/z1jcdxdAdAoAAw7rAW4u3fq04BpY60AaBiAAMET/LzCwYUhf+epge9R2Fq6JgAsKnWcRwB0bK6lawLAolLHeQRAx+ZauiYALCp1nEcAdGyupWsCwKJSx3kEQMfmWromACwqdZxHAHRsrqVrAsCiUsd5BEDH5lq6JgAsKnWcRwB0bK6lawLAolLHeQRAx+ZauiYALCp1nEcAdGyupWsCwKJSx3kEQMfmWroGAPhmdu4ufkz4PmHyiz+SC7J1BLPFj6dRLNzizJccKs2kwMT+gntovkptLheADRqONzt8QjDPU4NRueMKAIB/kIvfJh5S0beGcbS/HYXNlxoTDCVnBfbsMTy6meRQGLkzwNRuF80CzsazOpjPUc8NpuP3Mma9qDMLgBDY+D12/DP/xk2ORx95MoNW3VUZzOd7g8fvZMx6ayiF8gBghXqmdr5u8fdrQHDbnSNn7BDMf0UdcVDnccoa/S4AhFngCj/Hb7aOg92cUbOemlof6MzBbeRWEbJngKGhqQsU1iCU72QFshZ+cWtuAEQzAS9UWJ6Fc3KvVeCCzw94jdPqjZcWrgAECHiuusbBc5eSnwJcS3FNtfWr0mERuC+YsHLlqpXnMUKhdLoCNHuD426uT1TuM8DpfVSJkgoIgJLqV9C2AKjAhJIhCICS6lfQtgCowISSIQiAkupX0LYAqMCEkiEIgJLqV9C2AKjAhJIhCICS6lfQtgCowISSIQiAkupX0LYAqMCEkiEIgJLqV9C2AKjAhJIhCICS6lfQtgCowISSIQiAkupX0LYAqMCEkiEIgJLqV9D2fxYJxK6SMZgTAAAAAElFTkSuQmCC">
        <p style="color: #fff">卡包</p>
      </a>
    </div>
  </div>
</template>

<script>

import {ajax} from "@/assets/common"
import indexHotGoods from "./indexHotGoods"
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
    indexHotGoods
  },
  created:function(){

    //获取余额
    this.CHECK_BALANCE();

    this.issetpwd();

    //获取热门卡券
    this.GET_INDEXHOTCARD();

  },
  computed:{

    ...mapGetters(["GET_BALANCE","GETINDEXHOTCARD","GETDOMAINIMG","get_issetPwd"]),

  },
  methods:{

    ...mapActions(["CHECK_BALANCE","GET_INDEXHOTCARD","issetpwd"]),
    recharOrregister() {
        if (this.get_issetPwd) {

            this.$router.push({path: 'Recharge',name: 'RechargeTpl'});
        } else {
            this.$router.push({path: 'Bindphone',name: 'bindphone'})
        }

    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#pageIndex {
  background-color: #efefef;
}
.banner {
  width: 100%;
}
.banner img {
  width: 100%;
}
.per_wrap {
  width: 100%;
  height: 5rem;
}
.per_center{
  width: 84%;
  margin: 0 auto;
  height: 4.533333rem;
  border-radius: 0.373333rem;
  -webkit-border-radius:0.373333rem;
  background: url(/static/images/percenter_03.png)  no-repeat top left;
  background-size: 100% 100%;
  margin-top: -0.56rem;
  box-shadow: 0 0.04rem 0.04rem 0.04rem #a6a6a6;
  position: relative;
  z-index: 10;
}
.card_list {
  width: 96%;
  background-color: #fff;
  margin: 0 auto;
  padding-bottom: 2.2rem;
}
.card_list_text {
  height: 1.6rem;
  text-align: center;
  margin: 0 auto;
  color: #435b95;
  font-size: 1.2em;
  font-family: "PingFang";
  font-weight: bold;
  line-height: 1.6rem;
}
.card_list_text img {
  width: 0.42rem;
  vertical-align: middle;
  margin-top:-0.026667rem;
}
.center_ul {
  height: 4.533333rem;
}
.center_top {
  position: relative;
}
.center_logo img {
  width: 1.4rem;
    margin: 0.44rem 0 0 0.6rem;
}
.recharge {
  position: absolute;
  top: 0.4rem;
  right: 0.533333rem;
  border: 1px solid #fff;
  color: #fff;
  width: 1.333333rem;
  height: 0.586667rem;
  border-radius: 0.106667rem;
  -webkit-border-radius: 0.106667rem;
  text-align: center;
  line-height: 0.586667rem;
  font-size: 1.1em;
  font-weight: 500; 
  font-family: "PingFang";
}
a {
  color: #fff;
}
a:visited: {
  color:#fff;
}
.balance {
  text-align: center;
  color: #fff;
  width: 80%;
  margin: 0 auto;
  padding: 0.666667rem 0;
}
.rmb_logo img {
  width: 0.4rem;
  margin-right: -0.066667rem;
}
.balance_num {
  font-size: 2.8em;
  padding-right: 0.2rem;
  line-height: 1.33;
}
.balance img {
  width: 0.453333rem;
}
.explain {
  text-align: center;
  color: #fff;
  font-size: 0.8em;
}
.section_wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 20;
}
.cardBag {
  width: 1.706667rem;
  height: 1.706667rem;
  position: fixed;
  bottom: 0.48rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  text-align: center;
  background-color: #b0292c;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  color: #fff;
  font-size: 0.38rem;
  box-shadow:0 0 0.133333rem #b0292c;
}
.cardBag img {
  width: 0.68rem;
  margin-top: 0.24rem;
}
.forward {
  width: 100%;
  height: 1.066667rem;
  text-align: center;
  line-height: 1.066667rem;
  color: #bbbbbb;
  font-size: 1.2em;
}
</style>
