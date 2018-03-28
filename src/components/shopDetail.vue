<template>
	<div id="shopdetail">
		<div class="banner">
 	    	<swiper :options="swiperOption" class="swiper-box">
			    <swiper-slide class="swiper-item" v-for="item in detailSlide" :key="item.id"><img :src="imgSrc+getWebp(item.picture)"></swiper-slide>
			    <div class="swiper-pagination" slot="pagination"></div>
		    </swiper>
		</div>

		<div class="card_type">
			<p class="card_type_p">卡券类型</p>
			<ul class="card_type_ul">
				 <li class="howMoneyCard">
					<div class="p_div">
						<p class="exchange_card" v-for="(item, index) in cardList" :class="{exchange_card_active: activeIndex === index}" @click.stop.prevent="clickCard(item, index)"><img class="ok" src="../../static/images/wnf7_03.png">{{item.name}}</p>
					</div>
				</li>
				<li class="discountDiv">
					<p><span class="discount">{{shopDiscount.discount}}</span><span class="smallDis">{{shopDiscount.smallDis}}</span><span class="dis">折</span></p>
				</li>
				
			</ul>
			<div class="shop_num shop_num1">
				<div class="span_wrap">
					<div>
						<span>购买数量</span>
						<span class="stock_span" v-show="itemCardDetail.isnum=='0'">库存：<span class="stock_Number">{{repertoryNum}}</span></span>
					</div>
				</div>
				<p><span class="subtract" @click.stop.prevent="subtractPayNum"></span><span class="pay_num">{{payNum}}</span><span class="add" @click.stop.prevent="addPayNum"></span></p>
			</div>

		</div>
		
		<div class="user_explain">
			<p class="user_explain_p">使用说明:</p>
			<p class="explain_text" v-html="itemCardDetail.instruction"></p>
		</div>
		
		<div class="detailImg">
		

		</div>

		
		<div class="pay_off">
			<ul>
				<li class="total">
					合计：<img class="rmb_logo" src="../../static/images/rmb.png" alt=""><span class="pay_money">{{newPrice | priceRmb}}</span><span class="old_money">{{oldPrice | priceRmb}}</span>
				</li>
				<li class="payment payment1" v-show="paymentFlag" :class="{paymentActive: paymentActiveFlag}" @click.stop.prevent="payFun">{{rushPurchaseText}}</li>
				<li class="payment payment2" v-show="paymentTimecountFlag" :class="{paymentActive: paymentActiveFlag}">
					<p class="payp1">距开抢仅剩</p>
					<p class="payp2">
						<span id="hour">{{timeCountHour}}</span>:<span id="mini">{{timeCountMin}}</span>:<span id="sec">{{timeCountSec}}</span>
					</p>
				</li>
			</ul>
		</div>


	<!-- 余额不足弹框 -->
		<!-- <div class="mask" v-show="moneyNotEnoughFlag">
			<div class="alert">
				<p>您当前余额不足，请充值。</p>
				<p><span class="offtrade">取消交易</span><span class="gorecharge" @click='goRecharge()'>前往充值</span></p>
			</div>
		</div> -->
		
		<router-view v-if="itemCardDetail" :cardItemDetail="itemCardDetail" :paynum="payNum"></router-view>

	</div>
</template>

<script>
	// import passwordframe from "./passwordframe.vue"
	import {ajax, supportWebp, insert_flg} from "@/assets/common.js"
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import {hardLoad,hideLoad,alertMasker} from '@/assets/lib/component'
	import { mapActions,mapGetters,mapMutations } from 'vuex'

	export default {

		data() {
			return {
				detailSlide:[],
				webpFlag:true,
				cardList:[],
				activeIndex: 0,
				shopDiscount:{},
				imgSrc: "",
				itemCardDetail:{},
				newPrice:"",
				oldPrice:"",
				payNum: 1,
				repertoryNum:"",
				paymentActiveFlag:false,
				paymentTimecountFlag: false,
				paymentFlag: true,
				paymentClickFlag:true,
				timeCountHour:"00",
				timeCountMin:"00",
				timeCountSec:"00",
				moneyNotEnoughFlag: false,
				rushPurchaseText:"付款",
			}
		},
		created() {

			if (this.GET_BALANCE == "--") {
				this.CHECK_BALANCE();
			};

			var shopId = this.$route.params.id;

			this.webpFlag = supportWebp();

			if (shopId == "42") {
				this.showHtml(shopId, "homeproduct/index3");
			} else {
				this.showHtml(shopId, "homeproduct/index");
			};

			this.swiperOption = {//轮播初始化
				pagination: '.swiper-pagination',
		        direction: 'horizontal',
		        initialSlide: 1,
		        paginationClickable: true,
		        autoplay: 3000,
		        loop:true
			};
		},
		computed:{
			...mapGetters(["GET_BALANCE"]),

		},
		filters:{
			priceRmb(price) {
				price = price+"";
				return insert_flg(price, ".", price.length - 2);	
			}
		},
		methods:{
			...mapActions(["CHECK_BALANCE"]),

			showHtml(id, serviceName) {
				ajax({
					method:'post',
			        url:'forwardtrans/index.do',
			        data:{
			          service:serviceName,
			          id:id,
			        }
				}).then((res)=>{
					this.imgSrc = res.data.imgSrc;

					this.cardList = res.data.ps;

					this.detailSlide = res.data.picturelist;

					this.itemCardDetail =  res.data.ps[0];

					this.newPrice = res.data.ps[0].newprice;

					this.oldPrice = res.data.ps[0].price;

					for (let i = 0; i < res.data.ps.length; i++) {
						
						this.detailSlide.push({"picture": res.data.ps[i].longpicture});

					};

					//折扣值显示
					if (res.data.discount != "" || res.data.discount != undefined) {

						if (res.data.discount.length >= 2) {

							this.shopDiscount.discount = res.data.discount.substring(0, 1);

							this.shopDiscount.smallDis = res.data.discount.substring(1, 3);

						} else {

							this.shopDiscount.discount = res.data.discount;

							this.shopDiscount.smallDis = "";

						};
					};

					this.isRepertory(res.data.ps[0]);

					this.rushPurchase(res.data.ps[0]);

				});
			},
			getWebp(item) {//是否支持webp

				return this.webpFlag?item:(item.replace("jpg", "webp"));

			},
			isRepertory(card) {//是否有库存

				if (card.isnum == "0") {

					this.repertoryNum = card.shelfnum==0?(card.beforenum==undefined?card.shelfnum:card.beforenum):card.shelfnum;

					this.rushPurchase(card);
				}

			},
			rushPurchase(card) {//抢购时间段显示

				var startHour, hourSeconds = 3600000;

				if (card.curtime!=undefined){

					var curtime = card.curtime;

					var curtimeYear = new Date(curtime).getFullYear(),

					    curtimeMonth = new Date(curtime).getMonth(),

					    curtimeDay = new Date(curtime).getDate();

				    var actbegintimeH, actbegintimeM;

				    if (card.shelfbegintime != undefined) {

				    	actbegintimeH = card.shelfbegintime.split(":")[0];

						actbegintimeM = card.shelfbegintime.split(":")[1];

						var sss = new Date(curtimeYear, curtimeMonth, curtimeDay, actbegintimeH, actbegintimeM, 0);

						var sssseconds = sss.getTime();

						startHour = sss.getHours();

						this.fnTimeCountDown(curtime, sssseconds);//执行倒计时函数

				    };

				    //抢购的各个时间段的显示情况

				    if (card.shelfbegintime!=undefined) {

						if (sssseconds-curtime<hourSeconds && sssseconds-curtime > 0) {//开抢之前一个小时之内

							this.paymentFlag = false;

							this.paymentActiveFlag = true;

							this.paymentTimecountFlag = true;

							this.paymentClickFlag = false;

						} else if (sssseconds-curtime<=0) {//到达开抢时间

							this.paymentFlag = true;

							this.paymentTimecountFlag = false;							

							if (this.repertoryNum == "0") {

								this.paymentActiveFlag = true;

								this.paymentClickFlag = false;

								this.rushPurchaseText = "本时段已抢光";

							} else {
								this.paymentActiveFlag = false;

								this.paymentClickFlag = true;

								this.rushPurchaseText = "付款";
							}
	
						} else if (sssseconds-curtime>=hourSeconds) {//开抢之前一个小时之前

							this.paymentFlag = true;

							this.paymentActiveFlag = true;

							this.paymentTimecountFlag = false;

							this.paymentClickFlag = false;

							this.rushPurchaseText = actbegintimeH+"点开抢";

						};

					} else {//今日抢光

						this.paymentFlag = true;

						this.paymentActiveFlag = true;

						this.paymentTimecountFlag = false;

						this.paymentClickFlag = false;

						this.rushPurchaseText = "今日开抢";

					};

				};
			},
			priceUpdate() {//价格更新

				this.newPrice = this.itemCardDetail.newprice * this.payNum;

				this.oldPrice = this.itemCardDetail.price * this.payNum;

			},
			clickCard(item,index) {//点击卡券

				this.itemCardDetail = item;

				this.priceUpdate();//价格更新

				this.isRepertory(item);

				this.rushPurchase(item);

				return this.activeIndex = index;

			},
			addPayNum() {//增加购买数量

				var isstack = this.itemCardDetail.isnum,
					num = this.payNum;

					num++;

				if (isstack == "0") {

					var shelfnum = this.itemCardDetail.shelfnum -0;

					if (num>=shelfnum) {

						this.payNum = shelfnum;

						alertMasker("购买数量超过库存！");
					} else {

						this.payNum = num;
					};

				} else if (isstack == "1") {

					this.payNum = num;
				};

				this.priceUpdate();//价格更新
			},
			subtractPayNum() {//减少购买数量
				var num = this.payNum;

				num--;

				this.payNum = num>=1?num:1;

				this.priceUpdate();//价格更新
			},
			payFun() {
				var that = this;
				if (this.paymentClickFlag) {

					if (this.newPrice > (this.GET_BALANCE-0)*100) {

						alertMasker("余额不足，请充值！", function() {

							that.$router.push({path: '/Recharge'});

						}, "", "前往充值");

						return
					};

					this.$router.push({name: "pwdInput"});

				};

			},
			fnTimeCountDown: function (d,s,o) {//计时器函数
      			var dur = Math.round((s - d) / 1000),timeCount,that=this;
				var f = {
					zero: function(n){
						var n = parseInt(n, 10);
						if(n > 0){
							if(n <= 9){
								n = "0" + n;	
							}
							return String(n);
						}else{
							return "00";	
						}
					},
					dv: function(){
						//现在将来秒差值
						var pms = {
							sec: "00",
							mini: "00",
							hour: "00"
						};

						if(dur > 0){
							pms.sec = f.zero(dur % 60);
							pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
							pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
						}
						return pms;
					},
					ui: function(){
						dur--;

						that.timeCountSec = f.dv().sec;
						that.timeCountMin = f.dv().mini;
						that.timeCountHour = f.dv().hour;

						if (dur <= 0) {

							that.paymentFlag = true;

							that.paymentTimecountFlag = false;

							that.paymentActiveFlag = false;

							that.paymentClickFlag = true;

						 	clearTimeout(timeCount);

						 	return
						};

						timeCount = setTimeout(f.ui, 1000);
					}
				};

				f.ui();
      		}

		}


	}

</script>

<style type="text/css">
div,ul,li,p {
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
#shopdetail {
	width: 100%;
	background-color: #efefef;
}
.banner {
	width: 100%;
	height: 4.08rem;
	margin-bottom: 0.333333rem;
}
.swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
.swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
}
.swiper-item img {
	width: 100%
}
.card_type {
	margin-top: 0.333333rem;
	background-color: #fff;
	padding: 0.4rem 0 0;
	border-bottom: 1px solid #d9d9d9;
	border-top: 1px solid #d9d9d9;
}
.card_type_p {
	color: #333;
	font-size: 0.42rem;
	padding: 0 0.8rem;
	padding-bottom: 0.2rem;
}
.card_type_ul {
	overflow: hidden;
	position: relative;
}
.card_type_ul li {
	margin: 0;
	float: left;
	min-height: 4rem;
}
.howMoneyCard {
width: 60%;
display: flex;
-webkit-display: flex;
flex-direction: column;
-webkit-flex-direction: column;
justify-content: center;
-webkit-justify-content: center;
border-right: 1px solid #d9d9d9;
}
.howMoneyCard p {
	width: 74%;
	/*height: 0.88rem;*/
	line-height: 0.5rem;
	text-align: center;
	margin: 0.266666rem auto;
	border:1px solid #999999;
	border-radius: 0.133333rem;
	-webkit-border-radius: 0.133333rem;
	font-size: 0.4rem;
	position: relative;
	z-index: 9;
	padding: 0.20rem 0.16rem;
	/*text-overflow:ellipsis;
	overflow:hidden;
	white-space:nowrap;*/	
}
.howMoneyCard>p:last-child {
	margin-bottom: 0;
}
.p_div {
	padding: 0.266666rem 0;
}
.discountDiv {
	width: 40%;
	display: flex;
	-webkit-display: flex;
	flex-direction: column;
	-webkit-flex-direction: column;
	justify-content: center;
	-webkit-justify-content: center;
	position: absolute;
	left: 60%;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	text-align: center;
}
.discountDiv p {
	color: #b01f22;
} 
.discount {
	font-size: 3.0rem;
}
.dis {
	font-size: 1rem;
	margin-left: 0.04rem;
	font-weight: bold;
}
.smallDis {
	font-size: 0.8rem;
	font-weight: bold !important;
}
.exchange_card_active {
	border-color:#b01f22 !important;
	color: #b01f22;

}
.ok {
	width: 0.346667rem;
	position: absolute;
	top: -0.013333rem;
	right: -0.026667rem;
	display: none;
	z-index: 20;
}
.exchange_card_active .ok {
	display: block;
}
.shop_num {
	width: 84%;
	margin: 0 auto;
	height: 1.6rem;
	font-size: 0.42rem;
	position: relative;
	color: #333;
	border-top: 1px solid #d9d9d9;
}
.shop_num1 {
	margin-top: 0.5rem;
}
.shop_num p {
	display: inline-block;
	width: 2.866667rem;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0.333333rem;
	color: #333333;
}
.subtract, .add {
	display: inline-block;
	width: 0.746667rem;
	height: 0.746667rem;
	background-color: #eeeeee !important;
	text-align: center;
	line-height: 0.746667rem;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
}
.subtract {
	left: 0;
	background: url(../../static/images/jian.png) no-repeat center;
	background-size: 70% 70%;
}
.shop_num1 .span_wrap {
	height: 100%;
	line-height: 1.6rem;
}
.span_wrap div span {
	line-height: 0.6rem;
}
.stock {
	text-align: center;
}
.stock_span {
	font-size: 0.32rem;
	color: #a9a9a9;
}
.paymentActive {
	background-color: #b2b2b2 !important;
}
.payment2 p {
	width: 100%;
	height: 0.6rem;
	line-height: 0.6rem;
	text-align: center;
	font-size: 0.65em;
}
.add {
	right: 0;
	background: url(../../static/images/jia.png) no-repeat center;
	background-size: 70% 70%;	
}
.pay_num {
	display: inline-block;
	text-align: center;
	height: 1.7rem;
	line-height:1.7rem;
	padding: 0 0.4rem;
	font-size: 0.55rem;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);	
}
.user_explain {
	width: 100%;
	border-top: 1px solid #d9d9d9;
	padding: 0.293333rem 0.8rem;
	background-color: #fff;
	margin-top: 0.333333rem;
	padding-bottom: 2.0rem;
	overflow: hidden;
}
.user_explain_p {
	font-size: 0.42rem;
	color: #333;
}
.explain_text {
	color: #333;
	line-height: 0.55rem;
	font-size: 0.36rem;
	padding-top: 0.2rem;
}
.explain_text>div>div {
	line-height: 0.55rem;
}
.pay_off {
	width: 100%;
	height: 1.2rem;
	position: fixed;
	bottom: 0;
	background-color: #fff;
}
.pay_off ul {
	overflow: hidden;
	height: 100%;
	
}
.pay_off ul li {
	float: left;
}
.total {
	width: 64%;
	color: #333;
	font-size: 0.42rem;
	line-height: 1.2rem;
	padding-left: 0.3rem;
	border-top: 1px solid #d9d9d9;
}
.pay_money {
	color: #b01f22;
}
.payp1 {
	margin-top: 0.06rem;
}
.payp2 {
	margin-top: -0.12rem;
}
.rmb_logo {
	width: 0.346667rem;
	vertical-align: middle;
}
.old_money {
	color: #999999;
	font-size: 0.8em;
	margin-left: 0.266667rem;
	text-decoration: line-through;
}
.payment {
	width: 36%;
	height: 100%;
	background-color: #b01f22;
	text-align: center;
	color: #fff;
	font-size: 1.4em;
	line-height: 1.2rem;
}
.detailImg {
	background-color: #fff;
}
.detailImg img {
	display: block;
	margin-top: 0.32rem;
	width: 100%;
	margin-bottom: 1.2rem;
}
.hide {
	display: none;
}
.inputwrap {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	background-color: #fff;
}
.mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 15;
	background:rgba(0, 0, 0, 0.5);	
}
.alert {
	width: 75%;
	position: absolute;
	top: 50%;
	left: 50%;
	height:3.733333rem;
	transform: translateY(-50%) translateX(-50%);
	-webkit-transform: translateY(-50%) translateX(-50%);
	background-color: #fff;
	border-radius: 0.266667rem;
	padding-bottom: 0.466667rem;
}
.alert>p:first-child {
	width: 100%;
	height: 2.266667rem;
	padding: 0.8rem 0.4rem 0 0.6rem;
	color: #000;
	font-size: 1.3em;
}
.alert>p:last-child {
	text-align: right;
	margin-top: 0.3rem;
}
.gorecharge {
	font-size: 1.2em;
	margin: 0 0.4rem;
	color: #b01f22;
}
.offtrade {
	font-size: 1.2em;
	color: #808080;
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
</style>
