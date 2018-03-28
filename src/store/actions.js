import { ajax } from '@/assets/common'

function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};
var actions;

export default actions = {
	//查询余额
    CHECK_BALANCE( {commit} ){

    	ajax({
	        method:'post',
	        url:'channeltrans/index.do',
	        data:{
	          service:'getbalance',
	          type:0,
	        }
	    }).then((res)=>{
	    	
	      if(res)
	      	
	      	commit("SET_BALANCE",res.data);

	    })
    },
    //获取首页热门卡券
    GET_INDEXHOTCARD( {commit} ){

    	ajax({
	        method:'post',
	        url:'forwardtrans/index.do',
	        data:{
	          service:'homepage/index',
	        }
	    }).then((res)=>{
	    	
	      if(res)
	      	commit("SET_INDEXHOTCARD",res.data);

	    })
    },
    issetpwd({commit}) {//是否注册
   		ajax({
   			method:'post',
   			url: "channeltrans/index.do",
   			data: {
   				service: "issetpwd"
   			}
   		}).then((res)=>{

   			if(res)
   				commit("issetpwd",res.data);
   		});
   	},	

};