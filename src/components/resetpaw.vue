<template>
	<transition name="trans">
		<div id="resetpaw">
			<ul>
	            <li class="phone_wrap_li">
	                <p class="inp_name">
	                    手机号
	                </p>
	                <p class="input myPhoneNum">
						{{phoneVal}}
	                </p>
	                <p class="verification_code" @click="gainMsgCode()">
	                    {{gainMsgText}}
	                </p>
	            </li>
	            <li class="phone_wrap_li">
	                <p class="inp_name">
	                    验证码
	                </p>
	                <p class="input">
	                    <input class="inp_num verificationCode" v-model="verificationCode" placeholder="请输入验证码">
	                </p>
	            </li>
	            <li class="phone_wrap_li">
	                <p class="inp_name">
	                    支付密码
	                </p>
	                <p class="input">
	                    <input class="inp_num payPaw" v-model="payPaw" placeholder="请输入6位支付密码">
	                </p>
	            </li>
	            <li class="phone_wrap_li">
	                <p class="inp_name">
	                    确认支付密码
	                </p>
	                <p class="input">
	                    <input class="inp_num confirePayPaw" v-model="confirePayPaw" placeholder="请确认6位支付密码">
	                </p>
	            </li>
	        </ul>
	        <div class="btn" @click="submit()">
	             完 成   
	        </div>
		</div>
	</transition>
	
</template>

<script type="text/javascript">
	import {ajax} from "@/assets/common"
	import {alertMasker} from '@/assets/lib/component';
	import md5 from "js-md5"

	export default {
		data() {
			return {
				phoneVal: "",
				verificationCode:"",
				payPaw:"",
				confirePayPaw: "",
				gainMsgCodeFlag: true,
				setIntervalFunname:"",
				gainMsgText: "获取验证码",
				ajaxphone: ""
			}
		},
		created() {
			this.gainUserphone();
		},
		watch: {
			verificationCode() {
				this.verificationCode = this.verificationCode.substr(0, 6);
				this.verificationCode = this.verificationCode.replace(/\D/g,"");
			},
			payPaw() {
				this.payPaw = this.payPaw.substr(0, 6);
				this.payPaw = this.payPaw.replace(/\D/g,"");
			},
			confirePayPaw() {
				this.confirePayPaw = this.confirePayPaw.substr(0, 6);
				this.confirePayPaw = this.confirePayPaw.replace(/\D/g,"");
			}
		},
		methods:{
			gainUserphone() {
				ajax({
					url:"channeltrans/index.do",
					method: "post",
					data: {
						service: "selphone",
					}
				}).then((res)=>{

					var myNum = res.data.phone;

					this.ajaxphone = myNum;

					myNum = myNum.substr(0, 3) + "****" + myNum.substring(7, 12);

					this.phoneVal = myNum;

				});
			},
			gainMsgCode() {

				if (this.gainMsgCodeFlag == false) {
					return;
				};

	    		//禁用按钮
	    		this.gainMsgCodeFlag = false;

	    		this.msgtimeCount();//倒计时函数

	    		//短信ajax函数
    			this.sendCaptcha();

			},
			msgtimeCount() {//短信倒计时
				var timeLeft = 60, that = this;  

			    that.setIntervalFunname = setInterval(function() {

			      	if(timeLeft > 0) {

				        timeLeft -= 1;

				        that.gainMsgText = timeLeft + "s";

			      	} else {

				      	clearInterval(that.setIntervalFunname);

				      	that.gainMsgText = "重新发送";

				      	that.gainMsgCodeFlag = true;

					};

			    }, 1000);
			},
			sendCaptcha() {//短信ajax
				ajax({
					url:"channeltrans/index.do",
					method: "post",
					data: {
						service: "sendmsg",
		    			phone: this.ajaxphone,
						msgid: "21"
					}
				}).then((res)=>{});
			},
			submit() {
				
				if (this.verificationCode.length <= 0) {
					alertMasker("验证码不能为空！");

					return

				} else if (this.payPaw.length != 6) {

					alertMasker("密码必须6位！");

					return

				} else if (this.payPaw != this.confirePayPaw) {
					alertMasker("您两次输入的密码不相同，请重新输入！");

					return
				} else if (!this.okSpanFlag) {

					alertMasker("请同意为你付协议！");
					return
				};

				//短信提交ajax
				this.msgTest();
			},
			msgTest() {//短信验证
				ajax({
					url: "channeltrans/index.do",
					method: "post",
					data:{
						service: "checkmsg",
		                phone: this.ajaxphone,
						dynameic: this.verificationCode
					}
				}).then((res)=>{

					this.register();//密码提交函数执行
				});
			},
			register() {//密码提交
				var that = this;
				ajax({
					url: "channeltrans/index.do",
					method: "post",
					data:{
						service: "setpasswd",
		                phone: this.ajaxphone,
						passwd: md5(this.confirePayPaw)
					}

				}).then((res)=>{

					clearInterval(that.setIntervalFunname);

					that.gainMsgText = "重新发送";

			      	that.gainMsgCodeFlag = true;

					alertMasker("设置成功", function(){

						that.$router.push({path: '/Recharge'});

					}, "", "前往充值");
				});
			},
		}
	}
</script>

<style>
#resetpaw {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 51;
	background-color: #fff;
}
.trans-enter-active, .trans-leave-active {
	transition: all 0.4s linear;
	transform: translate3d(0, 0, 0);
}
.trans-enter, .trans-leave-to {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
#resetpaw>ul {
	width: 100%;
	margin-top: 0.466667rem;
	background-color: #fff;
	padding: 0 0 0 0.666667rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.phone_wrap_li {
	width: 100%;
	height: 1.133333rem;
	line-height: 1.133333rem;
	font-size: 0.373333rem;
	color: #1a1a1a;
	position: relative;
	border-bottom: 1px solid #e7e7e7;
}
.phone_wrap  ul>li:last-child {
	border-bottom: none;
}
.inp_name {
	position: absolute;
	left: 0;
}
.input {
	width: 6.0rem;
	position: relative;
	left: 2.866667rem;
	color: #cccccc;
}
.input input {
	width: 100%;
	outline: none;
	border: none;
	appearance: none;
	-webkit-appearance: none;
	-webkit-tap-highlight-color:rgba(0,0,0,0);
}
.payPaw,.confirePayPaw {
	-webkit-text-security:disc;
	text-security:disc;
}
.verification_code {
	width: 2.066667rem;
	height: 0.64rem;
	color: #b01f22;
	font-size: 0.32rem;
	text-align: center;
	line-height: 0.64rem;
	border-radius: 0.266667rem;
	-webkit-border-radius: 0.266667rem;
	border: 1px solid #b01f22;
	position: absolute;
	right: 0.466667rem;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
}
.wnfAgreement {
	padding: 0 0 0 0.666667rem;
	margin-top: 0.373333rem;
}
.okSpan {
	display: inline-block;
	width: 0.370000rem;
	height: 0.370000rem;
	border: 1px solid #999999;
	border-radius: 0.066667rem;
	vertical-align: middle;
	margin-right: 0.2rem;
	text-align: center;
	line-height: 0.373333rem;
} 
.okSpan_active {
	border: 1px solid #b01f22;
	background-color: #b01f22;
}
.okImg {
	width: 0.32rem;
}
.agreeSpan {
	color: #1a1a1a;
	font-size: 0.32rem;
}
.agreementSpan {
	color: #b01f22;
	font-size: 0.32rem;
	text-decoration: underline;
}
.btn {
	width: 86.7%;
	height: 1.093333rem;
	background-color: #b01f22;
	color: #fff;
	margin: 0.933333rem auto 0;
	border-radius: 0.533333rem;
	-webkit-border-radius: 0.533333rem;
	text-align: center;
	line-height: 1.093333rem;
	font-size: 0.426667rem;
}
</style>