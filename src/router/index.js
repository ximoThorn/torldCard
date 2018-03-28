import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import RechargeTpl from '@/components/Recharge'
import shopDetail from '@/components/shopDetail'
import passwordframe from '@/components/passwordframe'
import percenter from '@/components/percenter'
import refund from '@/components/refund'
import transtion from '@/components/transtion'
import pawmanage from '@/components/pawmanage'
import help from '@/components/help'
import about from '@/components/about'
import bindphone from '@/components/bindphone'
import refundmannage from '@/components/refundmannage'
import resetpaw from "@/components/resetpaw"
// import changepaw from "@/components/changepaw"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/Recharge',
      component: RechargeTpl
    }, 
    {
      path: '/Shopdetail/:id',
      name: "shopDetail",
      component: shopDetail,
      children:[
          {path: "pwdinput",name:"pwdInput", component: passwordframe}//命名路由
      ]
    },
    {
      path: '/Percenter',
      component: percenter
    },
    {
      path: '/Refund',
      component: refund
    },
    {
      path: '/Transtion',
      component: transtion
    },
    {
      path: '/Pawmanage',
      component: pawmanage,
      children: [
          {path:"/Pawmanage/Resetpaw", name: "resetpaw", component: resetpaw},
          {
            path:"/Pawmanage/passwordframe/Step",
            name: "passwordframe",
            component: passwordframe
          }
      ] 
    },
    {
      path: '/Help',
      component: help
    },
    {
      path: '/About',
      component: about
    },
    {
      path: '/Bindphone',
      component: bindphone
    },
    {
      path: '/Refundmannage',
      component: refundmannage
    },
  ]
})
