<template>
	<div class="aboutwnf">
		<div class="head">
	   		<div class="icon"><img src="../../static/images/wnf.png"></div>
	    </div>
	    <div class="details">
		 	<div class="details_titles">
		   		<span class="line"></span><span class="second_title">关于为你付</span>
		    </div>   
		    <div class="details_content">
		   		“为你付”，中国领先的替代支付服务商，推出全新个人消费优惠服务，汇聚各类折扣优惠，为您打通吃、喝、玩、乐、美各种生活场景。充值为你付账户，即可享受返现优惠，各大品牌商户商品再享折上折。无需下载APP，搜索并关注“为你付”公众号即可。我们将持续拓展各类品牌商户的折扣商品与卡券......
		    </div>	
    		<div class="details_titles service">
	        	<span class="line"></span><span class="second_title">服务协议</span>
      		</div>   
        	<div class="details_content">
        		<span class="agreement" @click="agreementSpanClick()">《“为你付”用户服务协议》<br />《“为你付”使用章程》</span>
        	</div>      
	    </div>

		<agreement @agreChange="change" :agreFlag="agreementFlag"></agreement>
	</div>
</template>

<script type="text/javascript">
	import agreement from "./agreement.vue"

	export default {
		data() {
			return {
				agreementFlag: false
			}
		},
		components:{
			agreement
		},
		methods:{
			agreementSpanClick() {
				this.agreementFlag = true;
			},
			change(flag) {//监听子组件触发的agreChange事件,然后调用change方法
				this.agreementFlag = flag;
			}
		}
	}

</script>

<style>
body,html {
	background-color: #f7f7f7;
}
.head{
	width: 100%;
	height: 5.866667rem;
	text-align: center;
	background-color: #f7f7f7;
}
.icon img{
	margin-top: 1.44rem;
	width: 1.96rem;
	height: 2.92rem;
	margin-bottom: 1.626667rem;
}
.line{
	display: inline-block;
	width: 0.106667rem;
	height: 0.453333rem;
	border-radius: 0.053333rem;
	-webkit-border-radius: 0.053333rem;
	background-color: #b01f22;
	margin-right: 0.16rem;
	vertical-align: middle;

}
.service{
	border-top: 1px solid #f7f7f7;
	margin-top: 1.133333rem;
}
.agreement{
	color: #b93c3e;;
	border-bottom: 1px solid #b93c3e;
}
.second_title{
	display: inline-block;
	line-height: 0.453333rem;
	font-weight: 700;
	vertical-align: middle;
	font-size: 0.45rem;
}
.details_titles{
	padding: 0.306667rem 0;
	padding-left: 0.64rem;
	border-bottom: 0.026667rem solid #e7e7e7;
	background-color: #f7f7f7;
	height: 1.093333rem;
	line-height: 1.093333rem;
}
.details_content{
	padding-top: 0.28rem;
	padding-left: 0.64rem;
	padding-right: 0.64rem;
	line-height: 0.633333rem;
	font-size: 0.4rem;
	text-align: justify;
}

</style>
