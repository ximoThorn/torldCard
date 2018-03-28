import $ from 'jquery'
;(function($){
'use strict';

    var keyboard=function(opt){

        var $keyboard=$('<div class="nu-skb-keyboard" id="nu-keyboard">'+
                            '<div class="nu-skb-container">'+
                            '    <div>'+
                            '        <div class="nu-skb-row">'+
                            '            <span class="nu-skb-col-num" data-val="1">1</span>'+
                            '            <span class="nu-skb-col-num" data-val="2">2</span>'+
                            '            <span class="nu-skb-col-num" data-val="3">3</span>'+
                            '        </div>'+
                            '        <div class="nu-skb-row">'+
                            '            <span class="nu-skb-col-num" data-val="4">4</span>'+
                            '            <span class="nu-skb-col-num" data-val="5">5</span>'+
                            '            <span class="nu-skb-col-num" data-val="6">6</span>'+
                            '        </div>'+
                            '        <div class="nu-skb-row">'+
                            '            <span class="nu-skb-col-num" data-val="7">7</span>'+
                            '            <span class="nu-skb-col-num" data-val="8">8</span>'+
                            '            <span class="nu-skb-col-num" data-val="9">9</span>'+
                            '        </div>'+
                            '        <div class="nu-skb-row">'+
                            '            <span class="nu-skb-col-num bg-gray" data-val=""></span>'+
                            '            <span class="nu-skb-col-num" data-val="0">0</span>'+
                            '            <span class="nu-skb-col-num bg-gray nu-skb-del" data-val="del">'+
                            '            </span></div>'+
                            '    </div>'+
                            '</div>'+
                           '</div>'),

            inputVal="",

            $pwdInputCon=$(".pwdInputCon"),

            $pwdInputs=$(".pwdInput").children("span"); 

        var $keyboardId = $("#pwdInputVue").children('#nu-keyboard');

            if ($keyboardId.length <= 0 ) {

                $("#pwdInputVue").append($keyboard);

            } else {

                $keyboardId.removeClass('hide');

            }

        setTimeout(function(){

            $keyboard.addClass("keyboardUp");

        });



        $keyboard.on("touchstart",".nu-skb-col-num",function(){

            if ($(this).data("val")!="del") {

                $(this).addClass("touchstart");

            };

        });

        $keyboard.on("touchend",".nu-skb-col-num",function(){

            var $that=$(this);

            $that.removeClass("touchstart");
            
            if($that.data("val")==undefined)return;

            if($that.data("val")==="del"){

                $pwdInputs.eq(inputVal.length-1).text("");

                inputVal=inputVal.substr(0,inputVal.length-1);

                if(inputVal==""){

                    $pwdInputCon.addClass("pwdError");

                }

            }else{

                $pwdInputCon.removeClass("pwdError");

                if (opt.keyFlag == true) {

                    inputSuccess($that.data("val"));
                }

                
            }


        });


        

        function inputSuccess(val){

            if(inputVal.length<6){

                inputVal+=val;

                $pwdInputs.eq(inputVal.length-1).text("·");

            }

            if(inputVal.length==6){
                
                opt.keyFlag = false;

                $pwdInputs.eq(inputVal.length-1).text("·");

                setTimeout(function(){

                    opt.callback&&opt.callback(inputVal);

                    $pwdInputs.each(function(){

                        $(this).text("");
                        
                    });

                    inputVal="";



                },100)


            };
        }

       return {
            reset:function(){

                inputVal="";
                
            }
       }
    }

    window.keyboard=keyboard;

})(window.Zepto || window.jQuery || $);