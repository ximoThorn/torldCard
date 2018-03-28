<template>
	<div>
		<div class="perWrap">
			<ul>
				<li class="portrait">
					<img :src="headurl">
				</li>
				<li>
					<p class="nickname">
						{{nickname}}
					</p>
				</li>
			</ul>
		</div>
		<div class="per_info">
			<ul class="info_ul">
				<li class="my_balance">
					<p>我的余额（元）</p>
					<p class="p2 my_balance_num">{{GET_BALANCE}}</p>
				</li>
				<li>
					<p><a class="myCard" href="javascript:void(0);">我的卡包（张）<img src="./../../static/images/arrow_blue.png" alt=""></a></p>
					<p class="p2 my_card_num">{{cardNum}}</p>				
				</li>
			</ul>
		</div>
		<div class="detail">
			<ul class="detail_ul">
				<li>
					<a href="javascript:void(0);" @click="isnotRe()">我要充值</a>
				</li>
				<li>
					<router-link :to="{path:'Refund'}">
						我要退款
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'Transtion'}">
						交易明细
					</router-link>
				</li>			
				<li>
					<router-link :to="{path:'Pawmanage'}">
						密码管理
					</router-link>
				</li>			
							
			</ul>
			<ul class="detail_ul2">
				<li>
					<router-link :to="{path:'Help'}">
						帮助中心
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'About'}">
						关于为你付
					</router-link>
				</li>			
			</ul>
		</div>
		<!-- <router-view></router-view> -->
	</div>
</template>

<script type="text/javascript">
	import {ajax} from "@/assets/common"
	import { mapActions,mapGetters } from 'vuex'

	export default {
		data() {
			return {
				cardNum: "--",
				headurl: "",
				nickname: ""
			}	
		},
		created() {
			if (this.GET_BALANCE == "--") {
				this.CHECK_BALANCE();
			};

			if (this.get_issetPwd == undefined || this.get_issetPwd == "") {

				this.issetpwd();
			};

			this.gainCardnum();//获取卡包数

			// this.gainHeadImg();//获取头像信息
		},
		computed: {
			...mapGetters(["GET_BALANCE","get_issetPwd"]),
		},
		methods:{
			...mapActions(["CHECK_BALANCE", "issetpwd"]),
			gainCardnum() {
				ajax({
					method: "post",
					url: "channeltrans/index.do",
					data:{
						service:"cardquery",
						state:"0",
						page:"1",
						pagenum:"1"
					}
				}).then((res)=>{

					this.cardNum = res.data.card_sum
				});
			},
			gainHeadImg() {
				ajax({
					method: "post",
					url: "Gethead/informationapi.do",
					responsetype:'json'
				}).then((res)=>{

					this.headurl = res.data.headurl;

					this.nickname = res.data.nickname;
				});
			},
			isnotRe() {
				if (this.get_issetPwd) {
					this.$router.push({path: '/Recharge'});
				} else {
					this.$router.push({path: '/Bindphone'});
				}

			}

		}
	}
</script>

<style>
div,ul,li,p {
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.perWrap {
	width: 100%;
	height: 3.4rem;
	background: url(./../../static/images/bag_02.png) no-repeat top left;
	background-size: 100% 100%;
}
.perWrap ul {
	padding-top: 0.4rem;
}
.portrait {
	width: 2.0rem;
	height: 2.0rem;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	background-color: #fff;
	margin: 0 auto;
	overflow: hidden;
}
.portrait img {
	width: 100%;
	height: 100%;
}
.nickname {
	text-align: center;
	color: #fff;
	font-size: 1em;
	font-family: "PingFang";
	margin-top: 0.26rem;
}
.per_info {
	border-bottom: 1px solid #e7e7e7;
}
.info_ul {
	height: 1.666667rem;
	padding: 0.2rem 0 0.333333rem 0;
	background-color: #fff;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.info_ul li {
	float: left;
	width: 50%;
	padding-top: 0.12rem;
}
.info_ul li p {
	text-align: center;
	color: #a6adbd;
	font-size: 0.38rem;
}
.info_ul li p a {
	color: #a6adbd;
}
.info_ul li p a:visited{
	color: #a6adbd;
}
.info_ul li p img {
	width: 0.373333rem;
	margin-bottom: 0.06rem;
	vertical-align: middle;
}
.info_ul li .p2 {
	color: #3e5891;
	margin-top: 0.12rem;
	font-size: 0.36rem;
}
.my_balance {
	border-right: 1px solid #d4d4d4;
	height: 100%;
}
.detail {
	width: 100%;
	margin-top: 0.4rem;
}
.detail_ul {
	margin-bottom: 0.666667rem;
}
.detail_ul,.detail_ul2 {
	width: 100%;
	padding-left: 0.64rem;
	background-color: #fff;
	border-bottom: 1px solid #e7e7e7;
    border-top:1px solid #e7e7e7;
}
.detail_ul li,.detail_ul2 li {
	font-size: 1.2em;
	color: #3e5891;
	height: 1.066667rem;
	border-bottom: 1px solid #e7e7e7;
}
.detail_ul>li:last-child,.detail_ul2>li:last-child {
	border-bottom: none;
}
.detail_ul li a, .detail_ul2 li a {
	line-height: 1.066667rem;
	display: block;
	font-size: 0.38rem;
	width: 100%;
	height: 100%;
}

.detail a {
	color:#3e5891;
}
.detail a:link {
	color:#3e5891;
}
.detail a:hover {
	color:#3e5891;
	text-decoration: none;
}
.detail a:visited: {
	color:#3e5891;
}	
</style>