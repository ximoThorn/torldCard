<template>
	<div class="help">
		<div class="box" v-for="(item,index) in helpDetail">
            <div class="content clearfix" @click="showDetail(index)">
                <span class="content_left f_l">{{item.title}}</span>
                <span class="content_right f_r"><img src="../../static/images/down_arrow.png" v-show="!item.flag" alt="arrow"><img src="../../static/images/top_arrow.png" v-show="item.flag" alt="arrow"></span>
            </div>
            <div class="details" v-show="item.flag" v-html="item.result">

            </div>
        </div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				helpDetail: [
					{	
						flag: false,
						title: "如何开通并使用为你付?",
						result: "第一步：搜索并关注“为你付”公众号（目前唯一服务渠道）；<br />第二步：点击公众号下方菜单“为你付”，注册成为用户，并选择金额完成充值；<br />第三步：浏览品牌商户，即可享受折扣价购买商户商品/卡券。"
					},
					{	
						flag: false,
						title: "如何充值?",
						result: "1.通过微信支付充值资金至为你付账户，充值成功记录可在“我的为你付”查询，或留意您的为你付余额变化及微信支付提醒；<br />2.选择广告主为你充值，完成广告主指定活动任务，即可对应充值相应金额。"
					},
					{	
						flag: false,
						title: "我的资金交易是否安全?",
						result: "充值资金将实时转入您在“为你付”平台的个人注册账户中，您的充值资金只有在消费时且输入您设定的有效交易密码后才从您的账户转出。 “为你付”平台用户充值资金统一由招商银行在专用存管账户中备存，平台内的资金转入流出受由招商银行监督。",

					},
					{	
						flag: false,
						title: "如何折扣购买卡券及退券事宜?",
						result: "在为你付合作商户中选择信息品牌及对应卡券商品，进行账户余额支付享折扣价格。平台所有商品券、电子抵扣券等卡券属于不宜退货、不适用无理由退货的商品，用户一经确认购买该卡券，视为经消费者确认该卡券不可退货。"
					},
					{	
						flag: false,
						title: "如何激活卡券?",
						result: "已购买卡券均标记为“未激活”状态，只需完成广告主任务即可激活卡券，查看卡券完整兑换信息。（什么是广告主任务：观看广告或参与小互动）<br />公众号菜单——“更多”——“更多活动”内活动所赠卡券权益无需激活可直接使用。"
					},
					{	
						flag: false,
						title: "如何在门店消费?",
						result: "完成购买后可在“卡包”内查看卡券，卡券可能存在一维码、二维码、券码等多种形式，在门店扫码/输入券码完成兑换。"
					},
					{	
						flag: false,
						title: "在为你付购买的卡券有什么使用限制?",
						result: "各商户的卡券均有使用有效期（请在有效期内使用卡券，逾期作废）、适用地域及适用门店的不同，具体请在购买卡券前查阅使用说明。"
					},
					{	
						flag: false,
						title: "如何申请开具发票?",
						result: "平台支持就充值金额开具纸质发票，邮寄费用须由用户自行承担。如需开票请联系客服。"
					},
					{	
						flag: false,
						title: "如有其它问题咨询可联系客服。",
						result: "公众号内直接回复咨询问题（在线客服：工作日 10:00-18:00）。"
					}
				]
			}
		},
		methods: {
			showDetail(index) {
				this.helpDetail[index].flag = !this.helpDetail[index].flag;
			}
		}
	}
</script>

<style>
.help {
	background-color: #f7f7f7;
}
.f_l{
	float: left;
}
.f_r{
	float:right;
}
.clearfix::before,.clearfix::after{
    content: '';
    display: block;
    height:0;
    clear: both;
    overflow: hidden;
}
.clearfix{
    zoom:1;
}
.box{
	background-color: #fff;
	padding:0.426667rem 0.586667rem;
	border-bottom: 0.026667rem solid #e7e7e7;
}
.help>.box:last-child {
	margin-top: 0.56rem;
}
.content_left{
	font-weight: 600;
	font-size: 0.4rem;
	color: #445c95;
}
.content_right{
	width: 0.65rem;
	height: 0.4rem;
}
.content_right img{
	width: 100%;
	height: 100%;
}
.details_hide{
	display: none;
}
.details{
	margin-top: 0.32rem;
	font-size: 0.38rem;
	color: #888f9b;
}

</style>