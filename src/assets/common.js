import axios from 'axios';
import {hardLoad,hideLoad,alertMasker} from './lib/component';


export const serverUrl="http://mall.dev.app.torld.com/tor_web_to_api/";

/**
 * [isWX 判断是否在微信打开]
 * @return {Boolean} [description]
 */
export function isWX(){

    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
/**
 * [isIphone 判断是否支持webp]
 * @return {Boolean} [description]
 */
export function supportWebp() {
    var WebP=new Image();

    WebP.src='data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

    if(WebP.height!=2){
        
        return true;

    } else {

      return false;

    };
}
 /*
*在字符串某个位置插入字符:str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
*/
export function insert_flg (str,flg,sn){
    var newstr="";
     
    if(str.length>=3) {
        var tmp1=str.substring(0, sn),

        tmp2 = str.substring(sn, str.length)

        newstr+=tmp1+flg+tmp2;            
    } else if(str.length==2) {

        newstr+= "0."+str;

    } else if (str.length==1) {

        newstr+= "0.0"+str;
    };

    return newstr;
}

/**
 * [isIphone 判断是否是苹果手机]
 * @return {Boolean} [description]
 */
export function isIphone(){

    var u = navigator.userAgent;

    if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

        return true;

    }else{

        return false;
    }

}


/**
 * [checkOpenId 检查openId]
 * @return {[type]} [description]
 */
export function checkOpenId(val){

    //测试
    //sessionStorage.setItem("_val","oG-orw7-0jnWXzF52R6w6n1_Oec4");
    //sessionStorage.setItem("_val","oG-orwygV_r-zjENUNkCphgvnTfQ");
    //document.cookie="wnfid=oG-orw_0yjqPciyd-VAkwH9p6BNU";
    //document.cookie="wnfid=oG-orw0DfpSc_GcJv6c26pma1bzc";
    //document.cookie="wnfid=oG-orwygV_r-zjENUNkCphgvnTfQ";
    //document.cookie="wnfid=oWYLsvp8_3bcddr9zjO90tvZNDio";
    //document.cookie ="wnfid=;path=/;expires=Fri, 02-Jan-1970 00:00:00 GMT";

    if(isWX()){

        if(!getCookie("wnfid")){

            let _param=sessionStorage.getItem("_val") || getQueryString("val");

            if(!_param|| typeof _param=='object'||_param==""||_param==null){

                location.href=serverUrl+'api/wxapi.do?backurl='+encodeURIComponent(location.href);
                
                return false;
                
            }else{

                sessionStorage.setItem("_val",_param);


            }

            let reg = new RegExp("([&]*)+val="+_param+"+([&]*)", "g"); 

            history.replaceState(null,"",location.href.replace(reg,''))

        }


        // if(!sessionStorage.getItem("_val")){

        //     let _param=getQueryString("val");

        //     if(!_param|| typeof _param=='object'||_param==""||_param==null){

        //         location.href=serverUrl+'api/wxapi.do?backurl='+encodeURIComponent(location.href);
                
        //         return false;
                
        //     }else{

        //         sessionStorage.setItem("_val",_param)

        //     }

        // }

        // let reg = new RegExp("([&]*)+val="+sessionStorage.getItem("_val")+"+([&]*)", "g"); 

        // history.replaceState(null,"",location.href.replace(reg,''))

        closeShare()

        return true;

    }else{

        $.alertMasker("请在微信端打开");

        return false
    }

    return false;

}

/**
 * [checkOpenId 获取标记]
 * @return {[type]} [description]
 */
export function getVal(){

    return getCookie("wnfid")||sessionStorage.getItem("_val");
}


//自己封装的AJAX
export function ajax(arg){

	hardLoad();

	//添加拦截器 判断返回数据
	axios.interceptors.response.use(function(res){
	  //在这里对返回的数据进行处理
	  if(res.data.retcode!="00"){
        hideLoad();
	  	alertMasker(res.data.result);
        
	  }else{

	  	hideLoad();
	  }
	  return res;

	},function(err){
	  //Do something with response error
	  return Promise.reject(error);
	})

	let param={ ...arg,
				baseURL:serverUrl,/*服务器地址处理*/
				transformRequest:[function (data) { /*参数转换处理*/
				    let ret = ''
				    for (let it in data) {
				      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				    }
				    //后续更改
				    ret += encodeURIComponent("from_user_name") + '=' + encodeURIComponent("oG-orw4zYuSD_90KVlyRsA6Y55tY");

				    return ret
				  }],
				timeout: 30000,
				validateStatus: function (status) { //检查状态

				    if(status <= 200 && status > 300){

				    	alertMasker("网络超时！请稍后再试");

				    	hideLoad();
				    }

				    return status >= 200 && status < 300
				},
			  };



	return axios(param)
			// .then((obj)=>{
			// 	debugger
			// 	if(obj.data.retcode!="00"){

			// 		alertMasker("错误");

			// 	}else{

			// 		hideLoad();
			// 	}
			// })
			// .catch((error)=>{

			// 	alertMasker("网络超时！请稍后再试");

			// 	hideLoad();
			// });

}