<template>
	<transition name="transform">
		<div id="pwdFrame">
			<div class="progress" :class="{hide: progressActive}">
				<div class="progressBar">
					<div class="step step1 active">
						<span>1</span>
						<h3 class="password1">请输入原密码</h3>
					</div>
					<div class="step step2" :class="{active: stepActive2}">
						<span>2</span>
						<h3 class="password2">请输入新密码</h3>
					</div>
					<div class="step step3" :class="{active: stepActive3}">
						<span>3</span>
						<h3 class="password3">请再次输入新密码</h3>
					</div>
				</div>
			</div>

			<div class="inputwrap">
				<div class="pwdWrap">
					<p class="pwdTips">{{pwdText}}</p>
					<div class="pwdInputCon" :class="{pwdError:pwdErrorFlag}">
						<div class="pwdInput">
							<span>{{pwdspan[0]}}</span>
							<span>{{pwdspan[1]}}</span>
							<span>{{pwdspan[2]}}</span>
							<span>{{pwdspan[3]}}</span>
							<span>{{pwdspan[4]}}</span>
							<span>{{pwdspan[5]}}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="nu-skb-keyboard" id="nu-keyboard">
		        <div class="nu-skb-container">
		            <div>
					 	<div class="nu-skb-row" v-for="(item, itemIndex) in keyboardList">
		                    <span class="nu-skb-col-num" v-for="(key, keyIndex) in item" :class="{touchstart: startActive === (itemIndex+''+keyIndex+'')}" v-text="key" @touchstart="tapTouchstart(key,itemIndex,keyIndex)" @touchend="tapTouchend(key,itemIndex,keyIndex)">{{key}}</span>
		                  
		                </div>
		            </div>
		        </div>
	        </div>

		</div>
		
	</transition>
</template>

<script type="text/javascript">
	import {ajax} from "@/assets/common.js"
	import {alertMasker} from '@/assets/lib/component';
	import md5 from "js-md5"

	export default {
		props:["cardItemDetail", "paynum", "inputText"],
		data() {
			return {
				progressActive: true,
				stepActive2: false,
				stepActive3: false,
				keyboardList:[[1,2,3],[4,5,6],[7,8,9],["·",0,""]],
				startActive:"",
				pwdText:"请输入密码",
				password:[],
				pwdErrorFlag:false,
				pwdspan:[],
				isShopid: "",
				changePwa:[],
			}
		},
		created() {

			this.isShopid = this.$route.params.id;

			if (!this.isShopid) {//从密码管理页进入的密码框
				this.progressActive = false;
			};
			
		},
		methods:{
			payment(pwd) {
				ajax({
					method:'post',
					url:'channeltrans/index.do',
			        data:{
			          	service: "cardpay",
						type_id: this.cardItemDetail.cardtypeid,
						passwd: md5(pwd),
						count: this.paynum
			        }

				}).then((res) =>{

					this.clearPwdinput();//清空密码

					if (res.data.retcode == "00") {
						alertMasker("购买成功")
					}
					
				});
			},
			tapTouchstart(key, itemNum, index) {
				this.startActive = itemNum+""+index+"";
			},
			clearPwdinput() {
				this.pwdspan=[];

				this.password = [];
			},
			stepProgress() {//路由改变的函数

				var propcess = this.changePwa.length;//获取当前进程
				
				switch (propcess) {
					case 0:
						this.stepActive2 = false;
						this.stepActive3 = false;
					 	this.pwdText = "请输入原密码";
					break;
					case 1:
						this.stepActive2 = true;
						this.stepActive3 = false;
					    this.pwdText = "请输入新密码";
					break;
					case 2:
						this.stepActive2 = true;
						this.stepActive3 = true;
						this.pwdText = "请再次输入新密码";
					break;
				};
			},
			tapTouchend(key, itemNum, index) {
				var that = this;
				this.startActive = itemNum+""+index+"*";

				if (this.password.length <= 6) {

					switch (key) {
						case "":
							if (this.password.length>=1) {
								this.password.pop();
								this.pwdspan.pop();
							} else {
								this.pwdErrorFlag = true;
							};
						break;

						default:
							if (this.password.length<=5) {

								this.pwdErrorFlag = false;

								this.pwdspan.push("·");
								this.password.push(key);
							};
						break;
					};


					if (this.password.length == 6) {//当输入第六位密码的时候

						var password = this.password.join("");

						if (this.isShopid) {//从详情页进入的密码框

							this.payment(password);//支付ajax

						} else {//从密码管理页进入的密码框
							console.log(this.changePwa);
							this.changePwa.push(password);

							if (this.changePwa.length>=3) {//第三步的时候

								if (this.changePwa[1]!=this.changePwa[2]) {

									alertMasker("两次输入的密码不相同！", function(){
										that.changePwa.pop();//删除第三个密码，重新输入
										that.stepIng();//重新输入
									});

								} else {

									//执行改变密码的ajax的函数
									this.setSuccess(this.changePwa[1]);	

								};
								

							} else {//第三步之前

								if(this.changePwa.length == 2) {

									if (this.changePwa[0]==this.changePwa[1]) {

										alertMasker("不能与原密码相同！", function(){
											that.changePwa.pop();//删除第二个密码，重新输入
											that.stepIng();//重新输入
										});

										return;
									};

								};

								this.stepIng();//重新输入

								this.stepProgress();//进程更新
								
							};

							
						};
						
					};

				};
			},
			stepIng() {
				
				var that = this;

				setTimeout(function(){
					that.pwdspan = [];//置空密码框
					that.password = [];//实密码也置为空
				}, 100);
					
			},
			setSuccess(_p) {
				ajax({
					url: "",
					method: "post",
					data: {
						service: "setpasswd",
						passwd:md5(_p)
					}
				}).then((res)=>{
					alertMasker("修改成功");
				});
			}
		}
	}
	
</script>

<style type="text/css">
#pwdFrame {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 50;
	background-color: #fff;
}
.progress{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 59;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
    background:#f7f7f7;
    padding:0.88rem 1.0rem 0.6rem;
}
.progressBar{
    position: relative;
    display: -webkit-box;
    display: box;
    display: flex;
}
.progressBar:before{
    content: '';
    position: absolute;
    left:0;
    top:0.22rem;
    height: 0.16rem;
    border-radius: 0.125rem;
    width: 100%;
    background:#999;
    z-index: -2px;
}

.step{
    text-align: center;
    -webkit-box-flex: 1;
    box-flex:1;
    flex:1;
    position: relative;
    font-size: 0.3rem;
    color: #999;
}
.step>span{
    display: inline-block;
    width: 0.6rem;
    height:0.6rem;
    color: #fff;
    border-radius: 50%;
    background: #999;
    line-height: 0.6rem;
    font-size: 0.4rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 2;
}
.step.active{
    color: #b01f22;
}
.step.active:before{
    content: '';
    position: absolute;
    left:0;
    top:0.22rem;
    z-index: 1;
    width: 100%;
    height: 0.16rem;
    background:#b01f22;
}
.step:first-child.active:before{

    border-top-left-radius: 0.125rem;
    border-bottom-left-radius: 0.125rem;
}
.step:last-child.active:before{

    border-top-right-radius: 0.125rem;
    border-bottom-right-radius: 0.125rem;
}
.step.active>span{
    background: #b01f22;
}
.pwdWrap{
    margin-top: 3.6rem;
    text-align: center;
}
.pwdTips{
    margin-top: 3.6rem;
    margin-bottom: 0.8rem;
    color:#2c4888;
    font-size: 0.4rem;
    padding:0 2.4rem;
}

.pwdInputCon{
    display: inline-block;
    height: 1.2rem;
    border:2px solid #e7e7e7;
    overflow: hidden;
    position: relative;
    border-radius: 0.133333rem;
    -webkit-transition: border .1s ease-in-out;
    transition: border .1s ease-in-out;
}
.pwdInput{
    height: 100%;
    font-size: 0;
}
.pwdInput>span{
    border-left:1px solid #e7e7e7;
    display: inline-block;
    height: 100%;
    width: 1.2rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    vertical-align: top;
}

/* BASIC UI COMPONENT by Zhangyh begin */
.nu-padded {
    padding: 0 0.2rem;
}
.pwdError{
    border-color: #e43a3a;
}
.nu-btn,
.nu-skb-col-num {
    font-size: 0.666667rem;
    font-weight: bold;
    position: relative;
    display: inline-block;
    cursor: pointer;
 /*   -webkit-transition: all;
    transition: all;*/
    /*-webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: 2s;
    transition-duration: 2s;*/
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    color: #333;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
}

/* BASIC UI COMPONENT by Zhangyh end */

.none {
    display: none;
}

.bg-gray{
    background: #d1d5dc;
}
/** for nu-keyboard begin **/
.nu-skb-keyboard {
    position: fixed;
    text-align: right;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1024;
    background: rgba(254, 254, 254, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    clear: both;
}
/*.keyboardUp{
     transform: translateY(0%);
    -webkit-transform: translateY(0%);
}*/

.nu-skb-row {
    width: 100%;
    clear: both;
    margin: 0;
    font-size: 0;
}

.nu-skb-col {
    display: inline-block;
    width: 8.75%;
    margin-top: 5px;
    margin-left: 0.625%;
    margin-right: 0.625%;
}

.nu-skb-col-num {
    width: 33.3%;
    height:1.6rem;
    line-height: 1.6rem;
}


.nu-skb-btn {
    width: 100%;
    color: #464847;
    padding: 0;
    border: 1px solid #CACACA;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.nu-skb-row:nth-child(2) .nu-skb-col:nth-child(1) {
    margin-left: 5.50184%
}

.nu-skb-row {
    white-space: nowrap
}

.nu-skb-row:nth-child(3) .nu-skb-col:first-child {
    width: 13.6%
}

.nu-skb-row:nth-child(3) .nu-skb-col:last-child {
    width: 13.6%
}

.nu-skb-row:nth-child(4) .nu-skb-col:first-child {
    width: 18.7501%
}

.nu-skb-row:nth-child(4) .nu-skb-col:last-child {
    width: 18.7501%
}

.nu-skb-row:nth-child(4) .nu-skb-col {
    width: 58.6865%
}

.nu-skb-keyboard .nu-skb-btn {
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 5px;
    vertical-align: text-top;
}

.nu-skb-mod img {
    height: 0.28rem;
}
.nu-skb-col-num .nu-skb-btn {
    border-radius: 0!important;
    vertical-align: top;
    border-left: none;
    border-top: none;
    border-bottom: #CACACA 1px solid;
    border-right: #CACACA 1px solid;
}
.nu-skb-row:nth-child(4) .nu-skb-col-num:first-child {
    background:#d1d5dc;
}
.nu-skb-row:nth-child(4) .nu-skb-col-num:last-child {
    background:#d1d5dc url("./../../static/images/del.png") center no-repeat;
    background-size: 20% auto;
}
.touchstart{
    background:#d1d5dc;
}
.touchend{
    background:transparent;
}
.transform-enter-active, .transform-leave-active {
	transition: all 0.4s linear;
	transform: translate3d(0, 0, 0);
}
.transform-enter, .transform-leave-to {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}	
</style>