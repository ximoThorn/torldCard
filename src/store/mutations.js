
var mutations;

export default mutations={
	  //设置最新余额
      SET_BALANCE (store,bala) {

            store.balance=bala.balance;

            sessionStorage.setItem("balance", bala.balance);
      },
      sessStore(store, val) {

            store.balance=sessionStorage.getItem("balance");

            store.issetPwd=sessionStorage.getItem("issetPwd");
      },
      //设置首页热门卡券
      SET_INDEXHOTCARD (store,bala) {
            //设置全局图片域名
             store.imgSrc=bala.imgSrc;
             store.index.hotGoods=bala.ps;
             
      },
      issetpwd(store,bala) {
            
            if (bala.retcode=="00"||bala.retcode==0) {

                  return store.issetPwd = true;
            } else {
                  return store.issetPwd = false;
            }
      }

};
