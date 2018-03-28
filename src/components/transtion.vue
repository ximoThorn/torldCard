<template>
	<div class="transBox">
        <div class="transBox_details">
        	<loadmore :bottom-method="loadBottom" ref="loadmore">
        		<div v-for="(item, index) in tradeList">
    				<div class="year_month" v-if="timerangeActive(item.createdate)">{{returnTimerange(item.createdate)}}</div>
		            <div class="deal">
		                <div class="deal_box">         
		                    <div class="deal_title clearfix">             
		                        <span class="deal_activity f_l">{{returnType(item.type)}}<span class="activity_detail"></span></span>
		                        <span class="deal_money f_r red">{{returnMoney(item.type, item.balance)}}</span>
		                    </div>
		                    <div class="deal_time">{{returnTime(item.createdate)}}</div>
		                    <div class="deal_order">订单号: <span class="deal_order_num">{{item.orderid}}</span><span class="pay_expaline">{{item.remark}}</span></div>     
		                </div> 
		            </div>
        		</div>
	        </loadmore>
        </div>
        
    </div>
</template>

<script type="text/javascript">
	import {ajax, insert_flg} from "@/assets/common"
	import {alertMasker} from '@/assets/lib/component'
	import loadmore from 'mint-ui/lib/loadmore'
	import 'mint-ui/lib/loadmore/style.css'

	export default {
		data() {
			return {
				tradeList: [],
				loadPage: 1,
				onepageNum: 20,
				rangeActive:false,
				Pagelist:[],
				pageFlag: true,
				// timeRangeActive: true,
			}
		},
		components: {
			loadmore
		},
		created() {
			this.loadonePage(this.loadPage);
		},
		computed: {
			
		},
		methods:{
			loadonePage(page) {
				ajax({
					url:"channeltrans/index.do",
					method: "post",
					data: {
						service:"translist",
						page:page,
						pagenum:this.onepageNum
					}
				}).then((res)=>{

					if (res.data.balancelist.length<this.onepageNum) {

						this.pageFlag = false;

					};

					this.tradeList = this.tradeList.concat(res.data.balancelist);
				
				});
			},
			loadBottom() {//上拉加载
				debugger
				if (!this.pageFlag) {

					alertMasker("已经没有数据了");

					this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位

					return;
				};

				this.loadPage++;
				this.loadonePage(this.loadPage);

				this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
			},
			returnType(type) {
				switch (type) {
					case "2":
						return "充值";
					break;
					case "5":
						return "充值";
					break;
					case "6":
						return "消费";
					break;
					case "7":
						return "退券";
					break;
					case "8":
						return "充值";
					break;
					case "9":
						return "退款";
					break;
					case "10":
						return "消费";
					break;
				};
			},
			returnTime(_time) {
				return _time.substr(0,4)+"-"+_time.substr(4,2)+"-"+_time.substr(6,2)+" "+_time.substr(8,2)+":"+_time.substr(10,2)+":"+_time.substr(12,2);
			},
			returnMoney(type, money) {
				var _money = insert_flg(money, ".", money.length - 2);
				return type=="6"?("-"+_money):_money;
			},
			returnTimerange(ti) {
				return ti.substr(0,4)+"年"+ti.substr(4,2)+'月';
			},
			timerangeActive(ti) {

				var _time=ti.substr(0,6);

				if (!this.timeRange || this.timeRange != _time) {

					this.timeRange = _time

					return true;
				} else {
					return false;
				}
			},
		}
	}

</script>

<style>
body,html{
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
.year_month{
	background-color: #f7f7f7;
	font-weight: 700;
	padding-top: 0.386667rem;
	padding-bottom: 0.266667rem;
	padding-left: 0.64rem;
	font-size: 1.2em;
	margin-top: -5px;
}
.deal{
	padding-left: 0.64rem;
	background-color: #fff;

}
.deal_box{
	border-bottom: 0.026667rem solid #e7e7e7;
}
.deal_title{
	font-weight: 700;
	padding-right: 0.64rem;
	padding-top: 0.32rem;
	padding-bottom: 0.26rem;
	font-size: 0.45rem;
	
}
.deal_time{
	padding-bottom: 0.133333rem;
	color: #bbbbbb;
}
.deal_order{
	padding-bottom: 0.266667rem;
	color: #bbbbbb;
	position: relative;
}
.pullRefresh-noData{
	width: 100%;
	background-color: #f7f7f7;
	color: #707070;
	text-align: center;
	padding:0.666667rem 0;
}
.red{
	color:#ff3333;
}
.transBox_details>.deal:last-child .deal_box{
	border-bottom: 0;
}
.transBox_details>.deal:empty:after{

	content: '暂无数据';
	display: block;
	padding:0.8rem 0;
	color: #999;
	margin-left:-0.64rem;
	text-align: center;

}
.pullRefresh-down {
    height: 50px;
}
.deal_money {
	font-size: 0.45rem;
}
.pay_expaline {
	font-size: 1.2em;
	position: absolute;
	top: -0.10rem;
	right: 0.64rem;
	color: #ff3333;
}
</style>