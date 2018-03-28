<template>
	<transition name="trans">
		<div id="changePaw">
			<div class="progress">
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

			<div class="passwordframe">
				<passwordframe @stepSuccess="stepProgress" :inputText="inputText" @backSuccess="backFun" :pwaArr="pawArray"></passwordframe>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import passwordframe from './passwordframe.vue'

	export default {
		data() {
			return {
				inputText:"请输入原密码",
				stepActive2: false,
				stepActive3: false,
				pawArray:[],
			}
		},
		components: {
			passwordframe
		},
		created() {
			this.$router.push({name: "step1"});
		},
		methods: {
			
		},
	}

</script>

<style type="text/css">
#changePaw {
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
.passwordframe {
	position: relative;
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
</style>