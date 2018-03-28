<template>
	<div>
		<div class="phone_wrap">
	        <ul>
	            <li class="phone_wrap_li">
	                <p class="inp_name">
	                    手机号
	                </p>
	                <p class="input">
	                    <input class="inp_num phoneNum" v-model="phoneVal" placeholder="请输入手机号">
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
	        
	        <div class="wnfAgreement">
	            <span class="okSpan" :class="{okSpan_active: okSpanFlag}" @click="okSpanFlag = !okSpanFlag">
	                <img class="okImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBQQQGRG72FA6AAABgUlEQVRYw+3VPyiEcRgH8O/dOe78j1uklJTBLUpKBikZlFIGJcpiUhY2TAbDlYEySJTlBiXKYjCQGCwWA4vFwnALA4u+hvvdc0/n3Pve3e+y/L7r+30+z9v7F3BxcXHJE87wg0nWVYqfZjqJyvDjzOS4Evwws4nb5/sVP2Cfjyt+xD7fpfgJ+3y74mft8zHFL9jnG5kSfsU+H+Wj8Ala58O8Fn6PgcLlXpLkDSO++RBPs+8tg171TPmOUV98gAfCXzLsPbAh9XvWerbBTek/+DolRnirRjw+tlyT7hsb/F7TGl7J2BPrCzQX1ZPf6pMHAFbzQgaf2fhHa07xbUXwZsW5DL+wKU9jUvGdRfIAwDDPBHhlc87RUcX3lMADAKt4IkiKLerIoOL7SuQBgCEeCfSeuY3mVUxnqAzerEgK9skYwG7Fj5XJAwCDPBTwmx2Kn7LAmxX7/J15SzwAMMDdHH7JIm9W7Ch+3TJvVmwZftv6D8WsAJf5xVWPH4qLi8v/5QcwgQN+BsuoHgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNS0wNFQxNjoyNToxNyswODowMLoN+mMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDUtMDRUMTY6MjU6MTcrMDg6MDDLUELfAAAAAElFTkSuQmCC">
	            </span>
	            <span class="agreeSpan">我已仔细阅读</span>
	            <span class="agreementSpan" @click="agreementSpanClick()">《“为你付”用户服务协议》及《“为你付”使用章程》</span>
	            <span class="agreeSpan agreeSpan2">同意并接受协议中的条款和内容。</span>
	        </div>

	        <div class="btn" @click="submit()">
	             完 成   
	        </div>
	    
	    </div>
	
	    <agreement @agreChange="change" :agreFlag="agreementFlag"></agreement>
	</div>
</template>

<script type="text/javascript">
	import {ajax} from "@/assets/common"
	import {alertMasker} from '@/assets/lib/component';
	import agreement from "./agreement.vue"
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
				okSpanFlag: false,
				agreementFlag: false,
			}
		},
		components:{
			agreement
		},
		watch:{
			verificationCode() {
				this.verificationCode = this.verificationCode.substr(0, 6);
				this.verificationCode = this.verificationCode.replace(/\D/g,"");
			},
			phoneVal() {
				this.phoneVal = this.phoneVal.substr(0, 11);
				this.phoneVal = this.phoneVal.replace(/\D/g,"");
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
		created() {

		},
		methods:{
			change(Flag) {
				this.agreementFlag = Flag;//监听子组件触发的agreChange事件,然后调用change方法
				this.okSpanFlag = true;
			},
			agreementSpanClick() {
				this.agreementFlag = true;
			},
			gainMsgCode() {

				if (this.gainMsgCodeFlag == false) {
					return;
				};

				var reg = /^1(3|4|5|7|8)\d{9}$/;

		    	if (!reg.test(this.phoneVal)) {
		    		
		    		alertMasker("请输入正确的手机号");

		    	} else {
		    		//禁用按钮
		    		this.gainMsgCodeFlag = false;

		    		this.msgtimeCount();//倒计时函数

		    		//短信ajax函数
	    			this.sendCaptcha();
		    	};

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
		    			phone: this.phoneVal,
						msgid: "21"
					}
				}).then((res)=>{
					console.log(res.data);
				});
			},
			submit() {
				
				if (this.phoneVal.length < 11) {

					alertMasker("请输入正确的手机号");

					return
				} else if (this.verificationCode.length <= 0) {
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
		                phone: this.phoneVal,
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
		                phone: this.phoneVal,
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
.phone_wrap  ul {
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