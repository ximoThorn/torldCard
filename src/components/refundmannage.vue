<template>
	<div class="phone_wrap">
		<ul>
            <li class="phone_wrap_li Border">
                <p class="inp_name">
                    申请时间
                </p>
                <p class="input ">
                    <span class="applytime">{{applytime}}</span>
                </p>
            </li>
            <li class="phone_wrap_li Border">
                <p class="inp_name">
                    姓名
                </p>
                <p class="input">
                    <span class="name">{{name}}</span>
                </p>
            </li>
            <li class="phone_wrap_li Border">
                <p class="inp_name">
                    手机号
                </p>
                <p class="input">
                    <span class="phone">{{phone}}</span>
                </p>
            </li>
            <li class="phone_wrap_li Border">
                <p class="inp_name">
                    账户余额
                </p>
                <p class="input">
                    <span class="inp_num phoneNum balance">{{balance | priceRmb}}</span>
                </p>
            </li>
            <li class="phone_wrap_li Border">
                <p class="inp_name">
                    可退余额
                </p>
                <p class="input">
                    <span class="inp_num phoneNum refundbalance">{{money | priceRmb}}</span>
                </p>
            </li>
            <li class="phone_wrap_li Border">
                <p class="redFont">{{refundexplain}}</p>
            </li>
            <li class="refund_wrap_li Border">
                <p class=" inp_name_refundleft pos">
                   退款原因
                </p>
                <p class="input">
                    <span class="inp_num phoneNum ref_reason">{{refundReason}}</span>
                </p>
            </li>
        </ul>
        <div class="refund_static clearfix">
            <span class="refund_static_left">退款状态</span>
            <span class="refund_static_right">
                <ul class="flow" v-html="flowState">

                </ul>
            </span>
        </div>
	</div>
</template>

<script type="text/javascript">
	import {ajax, insert_flg} from "@/assets/common"
    import {alertMasker} from "@/assets/lib/component"

    export default {
    	data() {
    		return {
    			applytime: "",
    			name: "",
    			phone: "",
    			balance: "",
    			money: "",
    			refundexplain: "",
    			refundReason: "",
    			flowState: ""
    		}
    	},
    	created() {
    		this.getDatas();
    	},
    	filters:{
			priceRmb(price) {
				price = price+"";
				return insert_flg(price, ".", price.length - 2);	
			}
		},
    	methods: {
    		getDatas() {
    			ajax({
    				url: "channeltrans/index.do",
					method: "post",
					data: {
						service: "refundrate"
					}
    			}).then((res)=>{
    				this.applytime = res.data.applytime;

    				this.name = res.data.name;

    				this.phone = res.data.phone;

    				this.balance = res.data.balance;

    				this.money = res.data.money;

    				this.refundexplain = res.data.refundexplain;

    				this.refundReason = res.data.reason;

    				this.showStatelist(res.data.statelist);
    			})
    		},
    		showStatelist(list) {
    			var str = '';
    			for (var i = 0; i < list.length; i++) {
    			
                    if(list[i].state == "3" || list[i].state == "2"){

                        var obj = '<li class="lineBox"><i class="node-icon"></i><span class="txt">'+this.returnState(list[i])+'</span><span class="time">'+list[i].createtime+'</span></br><span>原因:</span><span class="fail">'+list[i].remark+'</span>';
                    }else{
                        var obj = '<li class="lineBox"><i class="node-icon"></i><span class="txt">'+this.returnState(list[i]) +'</span><span class="time">'+list[i].createtime+'</span></li>';
                    }
                    str+=obj;
    			};

    			this.flowState = str;

    		},
    		returnState(item) {//退款状态
    			switch(item.state){
                    case "1":
                        return "审核中";
                        break;
                    case "2":
                        return "退款中";
                        break;
                    case "3":
                        return "审核失败";
                        break;
                    case "4":
                        return "退款成功";
                        break;
                    case "5":
                        return "退款失败";
                        break;
                };
    		}

    	},
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
    color: #b01f22;
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