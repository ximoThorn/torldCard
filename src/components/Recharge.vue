<template>
	<div id="Recharge" class="layer">
		<div class="remain">
	        <div class="remain_head"><span class="longLine"></span> 余额(元) <span class="longLine"></span></div>
	        <div class="banlance_wrap">
	            <div class="remain_number">
		            <p class="banlance_num">{{GET_BALANCE}}</p>
		            
	            	<p class="addNum" :class="{fadeInUp: addNumActive}">+{{addNum}}</p>
 
	            </div>
	        </div>
	    </div>
		<!--充值选项-->
	    <div class="change_sel">
            <div class="change_sel_title">选择充值金额</div>
            <div class="money_box">
                <div class="money">
                    <span :class="{span_selected: selectedActive === index}" v-for="(item, index) in rechargeNum" @click="selectedMoney(item,index)">{{item}}元</span>
                </div>
                <div class="card_money">
	               	<a v-for="item in advertList" :href="item.hreftwo">
	                    <img :src="imgSrc+item.picturetwo">
	                    <span>为你付{{item.money/100}}元</span>
                	</a>

                </div>    
				
				<div class="card_moneyDetail">
	                <div class="moneyDetail" style="width: 100%">
	                    <h4>选择广告主为你付:</h4>
	                    <p v-for="item in advertList">· {{item.detiletwo}}</p>
	                </div>
	                <br />
	                <p>· 活动奖励金额将在一个工作日内向用户注册的为你付账户内充值。</p>
	            </div>

            </div>
        </div>
		<!--充值BTN-->
        <div class="rechange">
            <a href="javascript:void(0)" @click="rechargeMent()" class="btn red_btn">立即充值</a>
        </div>
	</div>
</template>

<script>
	import {ajax, insert_flg} from "@/assets/common"
	import { mapActions,mapGetters } from 'vuex' 

	export default {
		data() {
			return {
				show: true,
				rechargeNum:[100,150,200,300,500,1000],
				selectedActive: 0,
				rechargeMoney: 10000,
				advertList:[],
				addNumActive: false,
				addNum: "",
				imgSrc:"",
				presentObj:{},
			}
		},
		created:function(){
			if (this.GET_BALANCE == "--") {
					
				this.CHECK_BALANCE();//获取余额
				
			};

			this.issetpwd();		

		    this.gainadvert();//获取广告主
		},
		computed:{
		    ...mapGetters(["GET_BALANCE","get_issetPwd"]),
		},
		methods:{
		    ...mapActions(["CHECK_BALANCE","issetpwd"]),

		    selectedMoney(item,index) {
		    	this.selectedActive = index;

		    	this.rechargeMoney = item*100;

		    	this.rechargeActi(this.rechargeMoney);
		    	this.reClass();
		    },
		   	rechargeMent() {//点击充值
		   		if (this.get_issetPwd) {
		   			//充值ajax
					ajax({
						method:'post',
						url: "jtwxpayapi/servletapi.do",
						data:{
							money: this.rechargeMoney
						}
					}).then((res)=>{
						WeixinJSBridge.invoke('getBrandWCPayRequest',{
				    				 		"appId" : data.appid,"timeStamp" :data.timeStamp, "nonceStr" :data.nonceStr2, "package" : data.packages,"signType" : "MD5", "paySign" : data.sign
				    					},function(res){

			    							if(res.err_msg == "get_brand_wcpay_request:ok"){ 
				            							//支付成功
				            							ajax({
				            								method:'get',
				            								url: "channeltrans/index.do",
				            								data: {
				            									service:"recharge",
				            									weorderid:data.orderid,
				            								}
				            							});	

		            			            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
		            			            	alertMasker("用户取消支付");	 
		            			            }else{ 
		            			                alertMasker("支付失败")	
		            			            }  

				    				  }.bind(this));

					})


		   		} else {

		   			alertMasker("您还未注册！", function(){
		   				this.$router.push({path: '/Bindphone'});
		   			}, "", "前去注册");
		   		};
		   		
		   	},
		   	gainadvert() {//获取广告主
		   		ajax({
		   			method:'post',
		   			url: "forwardtrans/index.do?",
		   			data: {
		   				service: "cardpicture/index"
		   			}
		   		}).then((res)=>{

		   			var reList = res.data.rglist;

					if (reList.length > 0) {

						for(var i = 0, les = reList.length; i < les; i++) {

							this.presentObj[reList[i].money] = reList[i].returnmoney;

						};

						this.rechargeActi(this.rechargeMoney);
					};
		   			this.advertList = res.data.cplist;
		   			this.imgSrc = res.data.imgSrc;

		   			this.reClass();//
		   		});

		   	}, 
		    reClass() {//赠送金额显示动画
		    	this.addNumActive = true;
		    	var that = this;
		    	setTimeout(function(){
		    		that.addNumActive = false;
		    	}, 500);
		    },
		    rechargeActi(re) {//充值赠送金额
		    	var dis = this.presentObj[re]==undefined?0:(this.presentObj[re]-0),
		    		discountNum;

				discountNum = (re + dis).toString();

				this.addNum = insert_flg(discountNum, ".", discountNum.length-2)
		    },
	  	}
	}
</script>
<style scoped>
.f_r{
	float:right;
}
.remain{
	width: 100%;
	height:3.4rem;
	background-color: #b01f22;
	text-align: center;
	color: #fff;
}
.longLine{
	display: inline-block;
	width: 0.56rem;
	height: 0.013333rem;
	background-color: #fff;
	vertical-align: middle;
}
.remain_head{
	font-size: 1em;
	padding-top: 0.8rem;
}
.banlance_wrap {
	overflow: hidden;
}
.remain_number{
	display: inline-block !important;
	width: auto;
	font-size: 2.444445em;
	font-weight: 700;
	margin: 0 auto;
	margin-top: 0.4rem;
	position: relative;
}
.addNum {
	font-size: 0.48em;
	/*font-weight: 700;*/
	position: absolute;
	left: 104%;
	top: 45%;
}
.change_sel{
	padding: 0 0.64rem;
	margin-top: 0.546667rem;
	padding-bottom: 0.706667rem;
	background-color: #fff;
}
.change_sel_title{
	padding: 0.466667rem 0rem;
	color: #425a94;
	font-size: 0.32rem;
}
.money{
	overflow: hidden;
}
.money span{
	display: inline-block;
	float: left;
	width: 30%;
	height: 0.933333rem;
	line-height: 0.933333rem;
	border: 0.026667rem solid #e1e1e1;
	text-align: center;
	border-radius: 0.133333rem;
	margin-bottom: 0.293333rem;
	overflow: hidden;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.money>span:nth-child(2), .money>span:nth-child(5) {
	margin-left: 5%;
	margin-right: 5%;
}
.money .span_selected{
	border-color:#b01f22;
	color: #b01f22;
	position: relative;
}
.money .span_selected:after{
	content: '';
	position: absolute;
	top:-1px;
	right:-1px;
	background: url("/static/images/wnf7_03.png") no-repeat;
	background-size: 100% 100%;
	width: 0.4rem;
	height: 0.3rem;
	z-index: 20;
}
.card_money {
	overflow: hidden;
}
.card_money a {
	display: inline-block;
	float: left;
	width: 30%;
	height: 1.226667rem;
	border: 0.026667rem solid #e1e1e1;
	text-align: center;
	border-radius: 0.133333rem;
	overflow: hidden;
	margin-bottom: 0.293333rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	font-size: 0.32rem;
}
.card_money>a:nth-child(3n+2) {
	margin-left: 5%;
	margin-right: 5%;
}
.card_money a img {
	width: 1.586667rem;
	margin-top: 0.066667rem;
}
.card_money a span {
	width: 100%;
	text-align: center;
	color: #000;
	display: block;
	margin-top: 0.044444rem;
}
.rechange{
	text-align: center;
	padding-top: 0.92rem;
	background-color: #f7f7f7;
}
.red_btn{
	display:inline-block;
	line-height: 1.093333rem;
	width: 8.693333rem;
	height: 1.093333rem;
	background-color: #b01f22;
	border-radius: 0.546667rem;
	-webkit-border-radius: 0.546667rem;
	-o-border-radius: 0.546667rem;
	-ms-border-radius: 0.546667rem;
	-moz-border-radius: 0.546667rem;
	border:none;	
	color: #fff;
	font-size: 1.25em;
	appearance:none;
	-webkit-appearance:none;
	margin-bottom: 1.6rem;
}
.img_hidden{
	display: none;
}
.sucess_box{
	padding-top: 1.453333rem;
	text-align: center;	
	background-color: #f7f7f7;
	position: fixed;
	top:0;
	right:0;
	left:0;
	bottom:0;
	background: #fff;
	z-index: 99;
}
.sucess_icon{
	width: 100%;
	height: 2.72rem;
	text-align: center;
	padding-bottom: 1.173333rem;
}
.sucess_icon img{
	width: 1.933333rem;
	height: 1.866667rem;
}
.sucess_icon .text{
	width: 100%;
	height: 0.4rem;
	padding-top: 0.4rem;	
	font-size: 1.25em;
	text-align: center;
	color: #b01f22;
	font-weight: 600;
}
.card_moneyDetail{
	margin-top: 0.3rem;
	width: 100%;
}
.card_moneyDetail h4 {
	font-size: 1em;
	color: #bbb;
	font-weight: bold;
	margin-bottom: 0.2rem;
}
.card_moneyDetail p {
	font-size: 1em;
	line-height: 0.6rem;
	color: #bbb;
}
.fadeInUp {
	animation-play-state:paused;
	-webkit-animation-play-state:paused;
    animation: fadeInUp .5s;
    -webkit-animation: fadeInUp .5s;
}
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translate3d(0,100%,0)
    }

    to {
        opacity: 1;
        transform: none
    }
}
@-webkit-keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translate3d(0,100%,0)
    }

    to {
        opacity: 1;
        transform: none
    }
}
</style>