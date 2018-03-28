import '../../../static/less/weui.less'
import $ from 'jquery'


//定时器

let timeoutFun;

/**
 * [hardLoad 异步加载Load]
 * @param  {[type]} s [提示语]
 * @return {[type]}   [description]
 */
export function hardLoad(s){

	var $body=$("body"),

	    $asynLoad=document.getElementById("dialog"),

	    that=this;

	if(!$asynLoad){

	    var $asynHtml=$('<div id="dialog">'+
					    '    <div class="weui-mask_transparent"></div>'+
					    '    <div class="weui-toast">'+
					    '        <i class="weui-loading weui-icon_toast"></i>'+
					    '        <p class="weui-toast__content">'+(s==undefined?"数据加载中":s)+'</p>'+
					    '    </div>'+
					    '</div>');

	    $body.append($asynHtml)

	    $asynHtml.on("touchmove",function(e){

	        e.preventDefault(); 
	    })

	}else{

	    $($asynLoad).removeClass("hide")

	}

	timeOutAnchor(function(){

	    hideLoad()

	})

}



/**
 * [_alert 弹出基类]
 * @param  {[type]} opt [参数]
 * @return {[type]}     [description]
 */
function _alert(opt){

    // opt={
    //     init:function(e){},
    //     content:'',
    //     title:'',
    //     btns:[{
    //             btnText:'确定',
    //             class:'',
    //             callback:function(e){

    //             }
    //     },{
    //         btnText:'取消',
    //         class:'',
    //         callback:function(e){
                
    //         }
    //     }],
    // }

    if(!opt || typeof opt!=="object")return 

    var $body=$("body");

    $body.children("#dialogalert").remove();

    var $alertMasker=$('<div class="js_dialog" id="dialogalert">'+
				       '    <div class="weui-mask"></div>'+
				       '    <div class="weui-dialog">'+(opt.title!=undefined&&opt.title!=""?'<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+opt.title+'</strong></div>':'')+
				       '        <div class="weui-dialog__bd">'+opt.content+'</div>'+
				       '        <div class="weui-dialog__ft">'+
				       '        </div>'+
				       '    </div>'+
				       '</div>'),

        $alertBtn=$alertMasker.find(".weui-dialog__ft");


    //生成按钮
    opt.btns.forEach(function(e){
        
        var that=e,

            $span=$('<a href="javascript:;" class="weui-dialog__btn ">'+that.btnText+'</a>');

        if(that.class)
            $span.addClass(that.class)

        $span.one("click",function(){
                             
            if(that.callback)
                that.callback($alertMasker,$(this))

        })

        $alertBtn.append($span)
    })

    if(opt.init)opt.init($alertMasker);


    $alertMasker.on("touchmove",function(e){

        e.preventDefault(); 

    }).on("click",function(e){

        // if(e.target===$alertMasker[0]){

        //     setTimeout(function(){

        //         $alertMasker.remove();

        //     },100)

        // }

    })

    $body.append($alertMasker);

}

/**
 * [alertMasker 提示框]
 * @param  {[type]} html [提示内容]
 * @return {[type]}      [description]
 */
export function alertMasker(html,callback,title, btntext){

    var opt={
            content:html,
            title:title,
            btns:[{
                    btnText:(btntext==undefined?"确定":btntext),
                    callback:function(e){

                        //防止穿透
                        setTimeout(function(){

                            e.remove();

                        },100)

                        if(callback)callback()
                    }
                }]
        };

    _alert(opt);

}

/**
 * [confirm 确认框]
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */
export function confirm(opt){

	// opt={
	//     init:function(e){},
	//     content:'',
	//     title:'',
	//     btns:[{
	//             btnText:'确定',
	//             class:'',
	//             callback:function(e){

	//             }
	//     },{
	//         btnText:'取消',
	//         class:'',
	//         callback:function(e){
	            
	//         }
	//     }],
	// }
	_alert(opt);

}

/**
 * [timeOutAnchor 时间超时埋点 默认30s]
 * @return {[type]} [description]
 */
function timeOutAnchor(callback){

    //超时过了30秒自动弹出
    var tempCallback = function(){

            if(callback)

                callback()

            alertMasker("系统繁忙，请稍后重试");

            hideLoad();
        };

    clearTimeout(timeoutFun);
    
    timeoutFun = setTimeout(tempCallback, 30000);
}

/**
 * [hideLoad 隐藏加载样式]
 * @return {[type]} [description]
 */
export function hideLoad(){

    $("body").children("#dialog").addClass("hide")

    //清除超时时间
    clearTimeout(timeoutFun)

}