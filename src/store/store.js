import Vue from 'vue'
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	imgSrc:"",
    balance:"--",//余额
    issetPwd:"",
    index:{
    	hotGoods:[],//热门卡券
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});