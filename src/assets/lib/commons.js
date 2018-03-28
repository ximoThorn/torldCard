// window.serverUrl={
// 	url:"http://mall.dev.app.torld.com/tor_web_to_api/forwardtrans/index.do?",
//     chanUrl: "http://mall.dev.app.torld.com/tor_web_to_api/channeltrans/index.do",
//     getHead: "http://mall.dev.app.torld.com/tor_web_to_api/Gethead/informationapi.do",
//     wxPay: "http://mall.dev.app.torld.com/tor_web_to_api/jtwxpayapi/servletapi.do",
//     wxPaysuccess: "http://mall.dev.app.torld.com/tor_web_to_api/jtwxpayapi/wxservletapi.do"
// }
window.wnf={
	/*获取cookie 设置cookie等*/
    cookie:function (key, value, options) {

        var days, time, result, decode

        if (arguments.length > 1 && String(value) !== "[object Object]") {
            
            options = $.extend({}, options)

            if (value === null || value === undefined) options.expires = -1

            if (typeof options.expires === 'number') {
                days = (options.expires * 24 * 60 * 60 * 1000)
                time = options.expires = new Date()

                time.setTime(time.getTime() + days)
            }

            value = String(value)

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''))
        }

        options = value || {}

        decode = options.raw ? function (s) { return s } : decodeURIComponent

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
    },
    /**
     * [getQueryString 获取URL键值对]
     * @param  {[type]} name [名称]
     * @return {[type]}      [description]
     */
    getQueryString:function(name) { 

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 

        var r = window.location.search.substr(1).match(reg); 

        if (r != null) return unescape(r[2]); return null; 

    },
    /**
     * [getNowFormatDate 获取当前时间格式yyyymmdd]
     * @return {[type]} [description]
     */
    getNowFormatDate:function () {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        };
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        };  
        var currentdate = year+"-"+ month +"-"+ strDate;
        return currentdate;
    },
    /**
     * [getNowFormatDate 获取当前小时]
     * @return {[type]} [description]
     */
    getNowFormatHour:function () {
        var date = new Date();
        var currentdate = date.getHours()
        return currentdate;
    },
    /*
    *在字符串某个位置插入字符:str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
    */
    insert_flg: function (str,flg,sn){
        var newstr="";
         
        if(str.length>=3) {
            var tmp1=str.substring(0, sn),

            tmp2 = str.substring(sn, str.length)

            newstr+=tmp1+flg+tmp2;            
        } else if(str.length==2) {

            newstr+= "0."+str;

        } else if (str.length==1) {

            newstr+= "0.0"+str;
        }
        
       
        return newstr;
    },
	/**
     * [checkOpenId 检测是否是微信环境]
     */
    checkOpenId: function (fun) {

     	var that = this;

     	function isWX(){
		    var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        return true;
		    }else{
		        return false;
		    };
			};
			
			function _replace(){
				
				if (that.getQueryString("val")) {
					
					history.replaceState(null,"",location.origin+location.pathname+location.hash);
					
				};

     };
			
		  //通过key查询cookie中对应的value的函数
			function getCookie (cKey) {
				var arr = document.cookie.split(";");
				for (var i = 0; i < arr.length; i++) {
					
					var arr1 = arr[i].split("=");
					//trim().去除字符串前后的空格
					if (arr1[0].trim() == cKey) {
						
						return arr1[1].trim();
						
					};
					
				};
				
				return null;
				
			};
				
      //判断cookie是否存在
			function hasCookie (cKey) {
				var arr = document.cookie.split(";");
				for (var i = 0; i < arr.length; i++) {
					
					var arr1 = arr[i].split("=");
					//trim().去除字符串前后的空格
					if (arr1[0].trim() == cKey) {
						
						return true;
						
					};
					
				};
				return false;
			};

     	if(isWX()){
     			
     			_replace();
     		
     			if (hasCookie("wnfid")) {
     					
     					sessionStorage.setItem("openid", getCookie("wnfid"));
     					
     					if (fun) {
								fun();
							};
							
							return;
     			} else {
     				
     					if (sessionStorage.getItem("openid")) {
     							
     							if (fun) {
										fun();
									}
				        	          
									return;
     					};
     				
     			};

	        location.href='https://services.torld.com/tor_web_to_api/api/wxapi.do?backurl='+encodeURIComponent(location.href);//测试
       
	        return;
	        
	    } else {

	    	 alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
	        // 以下代码是用javascript强行关闭当前页面
	        var opened = window.open('about:blank', '_self');
	        opened.opener = null;
	        opened.close();
	    };


     },
     /*
     *为你付加载样式
     */
     wnfLoading:function(){

                var $body=$("body"),

                $loading=$body.children(".loading_wrap");

                if($loading.length <= 0){

                        var $loadinghtml = $('<div class="loading_wrap">'+
                                                '<div class="loading">'+
                                                    '<p><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwcHgnIGhlaWdodD0nMTIwcHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLWRlZmF1bHQiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMDgzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDYwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4xNjY2NjY2NjY2NjY2NjY2NnMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZicgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjI1cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjMzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDE1MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNDE2NjY2NjY2NjY2NjY2N3MnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMTgwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC41cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjU4MzMzMzMzMzMzMzMzMzRzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNmZmYnIHRyYW5zZm9ybT0ncm90YXRlKDI0MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNjY2NjY2NjY2NjY2NjY2NnMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMjcwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC43NXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2ZmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzAwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC44MzMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjkxNjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48L3N2Zz4=">加载中</p>'+
                                                '</div>'+
                                            '</div>');

                        $body.append($loadinghtml);

                        $loadinghtml.on("touchmove",function(e){

                            e.preventDefault(); 
                        })

                } else {

                    $loading.removeClass('hide');

                };

     },
    /*
     *隐藏为你付加载样式
     */     
    hideLoad:function(){

        $("body").children(".loading_wrap").addClass("hide");

    },
    /*
     *为你付弹出框
     */    
     _alert:function(val,opt){

                var $body=$("body"),

                    $alert=$body.children(".alert_con"),

                    opt=opt||{};

                if($alert.length <= 0){
                        var $alerthtml = $('<div class="alert_con">'+
 
                                                '<div class="alert_wrap">'+
                                                    '<p class="web_explain">'+(val==undefined?"网络错误，请重试！":val)+'</p>'+
                                                    '<p class="cancel">'+(opt.bname==undefined?"取消":opt.bname)+'</p>'+
                                                '</div>'+
                                            '</div>');
                        
                        $body.append($alerthtml)                        


                        $alerthtml.on("touchmove",function(e){

                            e.preventDefault(); 
                        });

                } else {


                    $("body").children(".alert_con").removeClass('hide');

                    var alertText = (val==undefined?"网络错误，请重试！":val);

                    $("body").find(".web_explain").text(alertText);

                    $("body").find(".cancel").text(opt.bname==undefined?"取消":opt.bname);
                }; 

                $body.on("touchend", ".cancel", function () {
                   if(opt.callback) {
                     opt.callback&&opt.callback();
                   }

                    setTimeout(function(){

                        $("body").children(".alert_con").addClass("hide");

                    }, 100);

                });

    },
    /*
    *GHTpay
    */
    GHTpay:function (val, money) {

        var that = this;

        var _param={
                    "merchantcode":"949390048160445",
                    "subject":"为你付充值"+val,
                    "money":val.toString(),
                    "paytype":"2",
                    "backurl":"http://139.198.3.232:15156",
                    "qrcode":"",
                    "fronturl":"https://services.torld.com/xinhuodong/success_pay.html",
                    "openid": sessionStorage.getItem("openid"),
                    "service":"rk.cxprecreate"
                    };

        that.wnfLoading();
        $.ajax({
            type:"GET",
            url:'https://services.torld.com/forward_jt_change/service?param='+encodeURIComponent(JSON.stringify(_param)),
            dataType : "jsonp",
            success:function(re){
                
                // that.hideLoad();
                if(re.retcode!=="R9"){

                    that._alert(re.result, {bname: "确定"});

                    return 
                };

                var wxData = re.appParams;
                //上送订单号
                that.ajax({
                    url: serverUrl.chanUrl,
                    data: {
                        service: "jiaoforder",
                        userid: sessionStorage.getItem("openid"),
                        orderid: re.merchorder_no,
                        money:money
                    },
                    success: function (data) {
                         //微信支付
                        WeixinJSBridge.invoke('getBrandWCPayRequest',{
                                                    "appId" : wxData.appId,"timeStamp" :wxData.timeStamp, "nonceStr" :wxData.nonceStr, "package" : wxData.package,"signType" : "MD5", "paySign" : wxData.paySign
                                                },function(res){

                                                    if(res.err_msg == "get_brand_wcpay_request:ok"){ 
                                                                //支付成功
                                                                // $.ajax({
                                                                //     type:"get",
                                                                //     url:serverUrl.chanUrl,
                                                                //     data: {
                                                                //         service:"recharge",
                                                                //         weorderid:data.orderid,
                                                                //         from_user_name: sessionStorage.getItem("openid"),
                                                                //     }
                                                                // });     
                                                                
                                                                $(".sucess_box").removeClass("hide");

                                                    }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
                                                        wnf._alert("用户取消支付");
                                                    }else{  
                                                        wnf._alert("支付失败");
                                                    }  

                                              }.bind(this))


                    }
                });

 
            }

        });




    },
    /*
    *是否支持webp
    */
    supportWebp:function(){

        var WebP=new Image();

        WebP.src='data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

        if(WebP.height!=2){
            
            return true;

        } else {

          return false;

        };
    },
    /*
    *获取余额接口
    */
    getBanlance: function(fun){
      var that = this;

      that.ajax({
          url: serverUrl.chanUrl,
          data: {
            service: "getbalance",
            type: "0",
            from_user_name: sessionStorage.getItem("openid")
          },
          success: function (data) {

            sessionStorage.setItem("balance", that.insert_flg(data.balance, ".", data.balance.length-2));

            if (fun) {
              fun();
            }
           
          }
      });
    }
    /*
    *推广检测接口
    */
    // popDetection:function(){

    //   var that = this;

    //   var _aaa = that.getQueryString("aaa");

    //   if (_aaa) {

    //     that.ajax({



    //     })


    //   };





    // }


}