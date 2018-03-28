<template>
    <ul class="card_list_ul">
	  	<li v-for="item in hotCardList" class="card_li" @click="getCardHref(item)">

		  	<!-- <router-link :to='{name:"shopDetail", params:{id:getCardHref(item)}}'> -->
				<img :src="MAINIMG+item.picture">
		  	<!-- </router-link> -->
	  		
	  	</li>
	</ul>
</template>

<script>
export default {
	props:["hotCardList","MAINIMG"],

	methods:{
		getCardHref(item) {
			if (item.type=="0") {

				this.$router.push({name:"shopDetail", params:{id:item.id}});//编程式路由

			} else {

				return;
			}
      	}
	}

}
</script>
<style scoped>
.card_li {
	width: 100%;
	padding: 0 0.586667rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	overflow: hidden;
	margin-bottom: 0.266667rem;
}
.card_li a {
	display: block;
	width: 100%;
	overflow: hidden;
}
.card_li img {
	width: 100%;
	float: left;
}
</style>