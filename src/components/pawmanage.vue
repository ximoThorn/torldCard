<template>
	<div class="detail">
		<ul class="detail_ul">
			<li>
				<router-link :to="{name:'resetpaw'}">找回密码</router-link>
			</li>			
			<li>
				<router-link :to="{name:'passwordframe'}">修改密码</router-link>
			</li>			
						
		</ul>

		<router-view></router-view>
		
	</div>
</template>

<script type="text/javascript">
	
</script>

<style>
.detail {
	width: 100%;
	margin-top: 0.4rem;
}
.detail_ul {
	margin-bottom: 0.666667rem;
	width: 100%;
	padding-left: 0.64rem;
	background-color: #fff;
	border-bottom: 1px solid #e7e7e7;
    border-top:1px solid #e7e7e7;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.detail_ul li {
	font-size: 1.2em;
	color: #3e5891;
	height: 1.066667rem;
	border-bottom: 1px solid #e7e7e7;
}
.detail_ul li a {
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