<template>
	<div class="phone_wrap">
        <ul>
            <li class="phone_wrap_li">
                <p class="inp_name">
                    姓名
                </p>
                <p class="input">
                    <input class="inp_num name" v-model="userName" placeholder="请输入姓名">
                </p>
            </li>
            <li class="phone_wrap_li">
                <p class="inp_name">
                    手机号
                </p>
                <p class="input ">
                    <input class="inp_num phone" v-model="phoneVal" placeholder="请输入手机号">
                </p>
            </li>
            <li class="phone_wrap_li">
                <p class="inp_name">
                    账户余额
                </p>
                <p class="input fontColor ">
                    <span class="inp_num">{{accountNum | priceRmb}}</span>
                </p>
            </li>
            <li class="phone_wrap_li Border">
                <p class="inp_name">
                    可退余额
                </p>
                <p class="input fontColor">
                    <span class="inp_num">{{refundNum | priceRmb}}</span>
                </p>
            </li>
            <li class="refund_wrap_li explain">
               <p class="redFont">{{refundExplain}}</p>
            </li>
            <li class="refund_wrap_li">
                <p class="inp_name_refundleft">
                   退款原因
                </p>
                <div class="refund_text_box">
                     <textarea name="" id="" cols="20" rows="5" class="refund_text" v-model="refundReasone" placeholder="请输入退款原因"></textarea>
                    <span class="limit">{{reasoneLimit}}</span>
                </div>
            </li>
        </ul>
        <ol class="refund_detail">
            <li class="detail_box" v-html="refundRemark"></li>
        </ol>

        <div class="btn" @click="refundSubmit()">
             提交
        </div>
        <div class="manageBtn">
            <router-link :to="{path: 'Refundmannage'}">退款管理</router-link>
        </div>
    </div>
</template>

<script type="text/javascript">
	import {ajax, insert_flg} from "@/assets/common"
    import {alertMasker} from "@/assets/lib/component"

	export default {
		data () {
			return {
				userName: "",
				phoneVal: "",
				refundReasone: "",
				reasoneLimit: 100,
				accountNum: "",
				refundNum: "",
				refundExplain: "",
				refundRemark: "",
			}
		},
		created() {
			this.refundDetail();
		},
		filters:{
			priceRmb(price) {
				price = price+"";
				return insert_flg(price, ".", price.length - 2);	
			}
		},
		watch: {
			phoneVal() {
				this.phoneVal = this.phoneVal.substr(0, 11);
				this.phoneVal = this.phoneVal.replace(/\D/g,"");
			},
			refundReasone() {
				this.refundReasone = this.refundReasone.substr(0, 100);

				var limitLength = this.refundReasone.length;

				this.reasoneLimit = 100 - limitLength;
			}
		},
		methods:{
			refundDetail() {
				ajax({
					url: "channeltrans/index.do",
					method: "post",
					data: {
						service: "refundmessage"
					}
				}).then((res)=>{

					this.accountNum = res.data.balance;

					this.refundNum = res.data.refundbalance;

					this.refundExplain = res.data.refundexplain;

					var arryMark = res.data.refundremark.split("；");
                		arryMark = arryMark.join(";</br>");

					this.refundRemark = arryMark;
				});
			},
			refundSubmit() {

				if (this.refundNum <= 0) {
                    var that = this;

					alertMasker("您的当前可退余额不足，无法申请退款！", function() {

						that.$router.push({path: "/Percenter"});

					});
                    
					return;
				};

				if (this.userName.length <= 0) {
					alertMasker("姓名不能为空！");
					return
				} else if (this.phoneVal.length < 11) {
					alertMasker("请输入正确的手机号！");
					return
				} else if (this.refundReasone <=0) {
					alertMasker("请输入退款原因！");
					return
				}; 

				this.submitAjax();

			},
			submitAjax() {
				ajax({
					url: "channeltrans/index.do",
					method: "post",
					data: {
						service: "refund",
	                    money:this.refundNum*100,
	                    balance:this.accountNum*100,
	                    phone:this.phoneVal,
	                    name:this.userName,
	                    reason:this.refundReasone,
					}
				}).then((res)=>{

					alertMasker("申请已提交，您可在退款管理内查看审核进度！")
					
				})
			}
		}
	}
</script>

<style>
.phone_wrap  ul {
    width: 100%;
    background-color: #fff;
    padding: 0 0 0 0.666667rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.phone_wrap  ul>li:last-child {
    border-bottom: none;
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
.explain {
	height: 1.133333rem;
}
.refund_wrap_li{
    width: 100%;
    font-size: 0.373333rem;
    color: #000000;
    position: relative;
    padding: 0.133333rem 0;
    min-height: 0.866667rem;
    border-bottom: 1px solid #e7e7e7;
}
.redFont{
    width: 6.0rem;
    color: #b01f22;
    font-size:  0.303333rem;
    position: absolute;
    left: 2.866667rem;
    height: 1.133333rem;
    line-height: 0.45rem;
    word-break: break-all;
}
.inp_name_refundleft{
    /*height: 1.133333rem;*/
    line-height: 1.133333rem;
}
.refund_text_box{
    width: 90%;
    position: relative;
}
.refund_text{
    width: 100%;
    color: #1a1a1a;
    border-radius: 0.106667rem;
    padding:0.2rem;
    font-size: 0.373333rem;
    line-height: 0.473333rem;
}
.refund_text::-webkit-input-placeholder{color:#cfcfcf;}
.limit{
    position: absolute;
    right:0.1rem;
    bottom:0.3rem;
    color: #ccc;
}
.refund_detail{
    background-color: #efefef;
    margin: 0.333333rem 0.666667rem;
    color: #b5b4b4;
    font-size: 0.33rem;
    line-height: 0.473333rem;
}
.detail_box{
    padding-left: 0.30rem;
    position: relative;
}
.icon{
    margin-left: -0.28rem;
}
.ref_reason{
    width:6rem;
    display: inline-block;
    /*overflow: hidden;*/
    /*text-overflow:ellipsis;*/
    /*white-space: nowrap;*/
    word-break: break-all;
    padding:0.333333rem 0;
}
.refund_static{
    width: 100%;
    line-height: 1.133333rem;
    font-size: 0.333333rem;
    background-color: #ffffff;
    color: #000000;
    margin-top: 0.333333rem;
}
.refund_static_left{
    vertical-align: top;
    float: left;
    margin-left:0.666670rem;
    margin-right: 0!important;
    font-size: 0.373333rem;
}
.refund_static_right{
    float: left;
    width:6rem;
    margin-left: 0.866667rem;
}
.clearfix:before,.clearfix:after {
    content: "";
    display: block;
    clear: both;
}
.clearfix {
    zoom: 1;
}
.flow{
    margin:0.466667rem 0 50px!important;
    color: #bfbfbf;
}
.lineBox{
    position: relative;
    padding: 0 0px 0.133333rem 0.333333rem;
    border-left: 1px solid #ccc;
    line-height:0.506667rem !important;
}

.node-icon{
    display: inline-block;
    width: 0.173333rem;
    height: 0.173333rem;
    border-radius: 50%;
    background-color: #bfbfbf;
    position: absolute;
    left: -0.08rem;
    top:0;
}
.lineBox span{
    position: relative;
    top:-0.186667rem;

}
.flow>li:first-child .txt {
    color: #b01f22;
}
.flow>li:last-child {
    border-left-color: #fff;
}
/*li.first .txt{
    
}*/
/*li.last{
    border-left-color: #fff;
}*/
.txt{
    display: inline;
    font-size:0.393333rem ;
    padding-right: 0.053333rem;
}
.pos{
    position: absolute;
    left: 0;
}
.fontColor{
    color: #000000;
}
.Border{
    /*color: #000000;*/
    border-bottom: none;
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
    margin-bottom: 0.533333rem;
}

.manageBtn{
    text-align: center;
    font-size: 0.326667rem;
}
.manageBtn>a{
    display: inline-block;
    padding:0.013333rem 0;
    color: #000;
    border-bottom: 1px solid #000;
    margin-bottom: 0.933333rem;
    /*line-height: 1.093333rem;*/
    font-size:  0.376667rem;
}	
</style>