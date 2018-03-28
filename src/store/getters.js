
var getters;

export default getters={
	//获取余额
    GET_BALANCE (store) {

        if (store.balance!="--" && store.balance!=undefined) {

            return (store.balance/100).toFixed(2);

        } else {
            return store.balance = "--"
        }

        

    },
    //获取热门卡券
    GETINDEXHOTCARD (store) {
      
     	return store.index.hotGoods;
    },

    //获取图片域名路径
    GETDOMAINIMG (store){

    	return store.imgSrc;
    },
    get_issetPwd (store) {
        return store.issetPwd;
    }
};